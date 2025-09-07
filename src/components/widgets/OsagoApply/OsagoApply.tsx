"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./OsagoApply.module.scss";

import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";

import { useOsagoFormConfig } from "@/hooks/useOsagoFormConfig";
import { useGetCarBrands } from "@/hooks/cars/useGetCarBrands";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import { useGetPaymentCalculation } from "@/hooks/policy/useGetPaymentCalculation";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";
import Loader from "@/components/ui/Loader/Loader";
import CountedPrice from "@/components/features/CountedPrice/CountedPrice";

import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";
import useCurrientCar from "@/stores/Cars/currientCar";
import useCurrientOsagoPolicy from "@/stores/Policy/currientOsagoPolicy";
import usePromocodeEvent from "@/stores/Promocode/promocodeEvent.store";

import { formatDataToCreateOsagoRequest } from "@/helpers/OsagoApply/formatDataToCreateOsagoRequest";
import {
  pickOsagoApplyFormData,
  pickOsagoApplyFormDataFromPolicy,
} from "@/helpers/OsagoApply/pickOsagoApplyFormData";
import OsagoApplyFields from "@/components/features/OsagoApplyFields/OsagoApplyFields";
import useCurrientOsagoPolicyCalculation from "@/stores/Policy/currientOsagoPolicyCalculation";
import useCurrientCarCategoryAndDuration from "@/stores/Policy/currientCarCategoryAndDuration.store";
import { useGetCarBrandsV2 } from "@/hooks/cars/useGetCarBrandsV2";
import { isAuthorized } from "@/helpers/auth/isAuthorized.helper";
import useShadow from "@/stores/Shadow/shadow.store";
import { ModalAuth } from "../ModalAuth/ModalAuth";

const OsagoApply = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { reloadPage } = useNavigation();

  const { config, isLoading } = useOsagoFormConfig();
  const { navigateToOsagoConfirm } = useNavigation();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    trigger: formValidationTrigger,
    clearErrors,
    unregister,
  } = useForm<IOsagoApplyForm>();

  const [isCarsBrandsLoaded, setIsCarsBrandsLoaded] = useState(false);
  const [isCountButtonClicked, setIsCountButtonClicked] =
    useState<boolean>(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [isAuthVisible, setIsAuthVisible] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(true);

  const currientCar = useCurrientCar((state) => state.car);
  const setIsAnotherCarMark = useOsagoApplyCarMark(
    (state) => state.setCarMarkValue
  );
  const currientPolicy = useCurrientOsagoPolicy((state) => state.policy);
  const setPolicy = useCurrientOsagoPolicy((state) => state.setPolicy);
  const setPolicyCalculationData = useCurrientOsagoPolicyCalculation(
    (state) => state.setCalculationData
  );
  const setTrigger = usePromocodeEvent((state) => state.setTrigger);
  const carCategoryOsago = useCurrientCarCategoryAndDuration(
    (state) => state.carCategory
  );
  const durationOsago = useCurrientCarCategoryAndDuration(
    (state) => state.duration
  );

  const { carsBrands, isLoading: isCarsBrandsLoading } = useGetCarBrandsV2();
  const {
    data: paymentCalculationData,
    isError: isPaymentCalculationError,
    isPending: isPaymentCalculationPending,
    isSuccess: isPaymentCalculationSuccess,
    mutate: mutatePaymentCalculation,
  } = useGetPaymentCalculation();

  useEffect(() => {
    if (
      carCategoryOsago ===
      "Автотранспортные средства, используемые в качестве такси и по найму"
    ) {
      setValue("duration_of_stay", "До 30 суток");
    }
  }, [carCategoryOsago]);

  useEffect(() => {
    if (durationOsago === "До 15 суток") {
      setValue(
        "transport_category",
        "Легковые автомобили, микроавтобусы с числом посадочных мест до 8 включительно"
      );
    }
  }, [durationOsago]);

  useEffect(() => {
    if (carsBrands && !isCarsBrandsLoaded) {
      setIsCarsBrandsLoaded(true);
    }
  }, [isCarsBrandsLoading]);

  useEffect(() => {
    console.log("Текущий автомобиль");
    console.log(currientCar);
    async function resetValues() {
      if ((currientCar || currientPolicy) && carsBrands) {
        let pickedData;

        if (currientCar && !currientPolicy) {
          pickedData = await pickOsagoApplyFormData(currientCar, carsBrands);
        } else if (currientPolicy) {
          pickedData = await pickOsagoApplyFormDataFromPolicy(
            currientPolicy,
            carsBrands
          );
        }

        let found;

        if (currientCar) {
          found = await carsBrands.find(
            (item) => item.name === currientCar.brand
          );
          await setValue(
            "brand",
            Boolean(found) ? currientCar.brand : "Другое ТС"
          );
        } else if (currientPolicy) {
          found = await carsBrands.find(
            (item) => item.name === currientPolicy.brand
          );

          if (
            currientPolicy.insurant_fio &&
            (currientPolicy.insurant_fio !== currientPolicy.fio ||
              currientPolicy.insurant_passport_number !==
                currientPolicy.passport_number)
          ) {
            setIsOwner(false);
          } else {
            setIsOwner(true);
          }

          await setValue(
            "brand",
            Boolean(found) ? currientPolicy.brand : "Другое ТС"
          );
        }
        await setIsAnotherCarMark(!Boolean(found));

        await resetForm(pickedData);
        // setValue("model", pickedData?.model ? pickedData?.model : "");
      }
    }

    resetValues();
  }, [currientCar, isCarsBrandsLoaded]);

  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
    if (!isAuthorized()) {
      toast.success("Войдите, чтобы продолжить", {
        duration: 4000,
      });

      setIsAuthVisible(true);
    } else {
      console.log("data");
      console.log(data);
      const formatedData = formatDataToCreateOsagoRequest(data, isOwner);
      console.log(formatedData);

      setPolicy(formatedData);
      setPolicyCalculationData(paymentCalculationData);

      navigateToOsagoConfirm();
    }
  };

  function onFormError() {
    toast.error("Заполните все обязательные поля");
  }

  const watchedFieldsWithPromocode = watch([
    "transport_category",
    "duration_of_stay",
    "promocode",
  ]);
  const brandWatch = watch(["brand"]);

  async function resetForm(data?: Partial<IOsagoApplyForm>) {
    console.log("Данные для подстановки");
    console.log(data);
    await reset(data);

    setValue(
      "duration_of_stay",
      data?.duration_of_stay ? data?.duration_of_stay : ""
    );

    const timeoutId = setTimeout(() => {
      setIsInitialLoaded(true);
      // console.log("setIsInitialLoaded");
      clearTimeout(timeoutId);
    }, 900);
  }

  const handleCountClick = () => {
    setIsCountButtonClicked(true);

    const isValid = formValidationTrigger();

    if (!isValid) return;

    console.log("watchedFieldsWithPromocode");
    console.log(watchedFieldsWithPromocode);

    if (watchedFieldsWithPromocode[1] === "") {
      toast.error("Заполните данные");
    } else {
      mutatePaymentCalculation({
        transport_category: watchedFieldsWithPromocode[0],
        duration_of_stay: watchedFieldsWithPromocode[1],
        promo_code: watchedFieldsWithPromocode[2],
      });
    }
  };

  useEffect(() => {
    setIsCountButtonClicked(false);
  }, [JSON.stringify(watchedFieldsWithPromocode)]);

  useEffect(() => {
    if (isInitialLoaded || (!currientCar && !currientPolicy)) {
      console.log("сброс значений");
      setValue("model", "");
      setValue("vehicle_refined_make", "");
    }
  }, [JSON.stringify(brandWatch)]);

  useEffect(() => {
    setTrigger(() => {
      setIsCountButtonClicked(false);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!isPaymentCalculationPending) {
      toast.dismiss();
    } else {
      toast.loading("Загрузка");
    }

    if (isPaymentCalculationError && isMounted) {
      toast.dismiss();
      toast.error("Ошибка. Проверьте данные");
    }

    return () => {
      isMounted = false;
    };
  }, [isPaymentCalculationPending, isPaymentCalculationError]);

  useEffect(() => {
    if (isOwner) {
      setValue("insurant_fio", "");
      setValue("insurant_passport_number", "");
      unregister(["insurant_fio", "insurant_passport_number", "insurant_type"]);
    }
  }, [isOwner]);

  function triggerSubmitForm() {
    formRef.current?.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
  }

  function handleSuccessAuth() {
    console.log("handleSuccessAuth");
    triggerSubmitForm();
    reloadPage();
    setIsAuthVisible(false);
  }

  return (
    <section className={styles.root}>
      <ModalAuth
        handleSuccessAuth={handleSuccessAuth}
        handleCloseAuth={() => setIsAuthVisible(false)}
        isOpen={isAuthVisible}
        setIsOpen={setIsAuthVisible}
      />

      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис ОСАГО в Абхазии
        </CustomTitle>

        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <Substrate withShadow="light" className={styles.substrate}>
            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit(onSubmit, onFormError)}
              action=""
            >
              <OsagoApplyFields
                config={config}
                control={control}
                clearErrors={clearErrors}
                isOwner={isOwner}
                setIsOwner={setIsOwner}
              />

              {isCountButtonClicked &&
              !isPaymentCalculationPending &&
              paymentCalculationData ? (
                <CountedPrice
                  discount={
                    Number(paymentCalculationData.base_tarif) -
                    Number(paymentCalculationData.tarif)
                  }
                  finalCost={Number(paymentCalculationData.tarif)}
                  preliminaryCost={Number(paymentCalculationData.base_tarif)}
                  className={styles.priceWrapper}
                />
              ) : (
                <Button
                  type="button"
                  className={styles.countButton}
                  variant="wide"
                  onClickEvent={handleCountClick}
                  isLoading={isPaymentCalculationPending}
                >
                  Рассчитать
                </Button>
              )}
            </form>
          </Substrate>
        )}
      </ContentContainer>
    </section>
  );
};

export default OsagoApply;
