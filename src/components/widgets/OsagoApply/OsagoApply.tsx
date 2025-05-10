"use client";

import React, { useEffect, useState } from "react";

import styles from "./OsagoApply.module.scss";

import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";

import { useOsagoFormConfig } from "@/hooks/useOsagoFormConfig";
import { useGetCarBrands } from "@/hooks/cars/useGetCarBrands";
import { useCreateOsagoPolicy } from "@/hooks/policy/useCreateOsagoPolicy";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import { useGetPaymentCalculation } from "@/hooks/policy/useGetPaymentCalculation";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";
import DynamicFormSection from "@/components/entities/DynamicFormSection/DynamicFormSection";
import Loader from "@/components/ui/Loader/Loader";
import CountedPrice from "@/components/features/CountedPrice/CountedPrice";

import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";
import useCurrientCar from "@/stores/Cars/currientCar";
import useCurrientOsagoPolicy from "@/stores/Policy/currientOsagoPolicy";
import usePromocodeError from "@/stores/Promocode/promocodeError.store";
import usePromocodeEvent from "@/stores/Promocode/promocodeEvent.store";

import { formatDataToCreateOsagoRequest } from "@/helpers/OsagoApply/formatDataToCreateOsagoRequest";
import {
  pickOsagoApplyFormData,
  pickOsagoApplyFormDataFromPolicy,
} from "@/helpers/OsagoApply/pickOsagoApplyFormData";
import OsagoApplyFields from "@/components/features/OsagoApplyFields/OsagoApplyFields";

const OsagoApply = () => {
  const { config, isLoading } = useOsagoFormConfig();
  const { navigateToOsagoConfirm } = useNavigation();

  const { handleSubmit, control, reset, setValue, watch, formState } =
    useForm<IOsagoApplyForm>();

  const [isCountButtonClicked, setIsCountButtonClicked] = useState<boolean>(false);

  const currientCar = useCurrientCar((state) => state.car);
  const setIsAnotherCarMark = useOsagoApplyCarMark((state) => state.setCarMarkValue);
  const currientPolicy = useCurrientOsagoPolicy((state) => state.policy);
  const setPolicy = useCurrientOsagoPolicy((state) => state.setPolicy);
  const setPolicyCalculationData = useCurrientOsagoPolicy(
    (state) => state.setCalculationData
  );
  const setIsPromocodeError = usePromocodeError((state) => state.setError);
  const setTrigger = usePromocodeEvent((state) => state.setTrigger);

  const { carsBrands, isLoading: isCarsBrandsLoading } = useGetCarBrands();
  const {
    data: paymentCalculationData,
    isError: isPaymentCalculationError,
    isPending: isPaymentCalculationPending,
    isSuccess: isPaymentCalculationSuccess,
    mutate: mutatePaymentCalculation,
  } = useGetPaymentCalculation();

  useEffect(() => {
    async function resetValues() {
      if ((currientCar || currientPolicy) && carsBrands) {
        let pickedData;

        if (currientCar && !currientPolicy) {
          pickedData = await pickOsagoApplyFormData(currientCar, carsBrands);
        } else if (currientPolicy) {
          pickedData = await pickOsagoApplyFormDataFromPolicy(currientPolicy, carsBrands);
        }

        reset(pickedData);

        let found;

        if (currientCar) {
          found = await carsBrands.find((item) => item.Make_Name === currientCar.brand);
          setValue("brand", Boolean(found) ? currientCar.brand : "Другое ТС");
        } else if (currientPolicy) {
          found = await carsBrands.find(
            (item) => item.Make_Name === currientPolicy.brand
          );
          setValue("brand", Boolean(found) ? currientPolicy.brand : "Другое ТС");
        }
        setIsAnotherCarMark(!Boolean(found));
      }
    }

    resetValues();
  }, [currientCar, isCarsBrandsLoading, currientPolicy]);

  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
    const formatedData = formatDataToCreateOsagoRequest(data);
    console.log(formatedData);

    setPolicy(formatedData);
    setPolicyCalculationData(paymentCalculationData);

    navigateToOsagoConfirm();
  };

  const watchedFieldsWithPromocode = watch([
    "transport_category",
    "duration_of_stay",
    "promocode",
  ]);
  const watchedFields = watch(["transport_category", "duration_of_stay"]);

  const handleCountClick = () => {
    setIsCountButtonClicked(true);

    handleMutatePaymentCalculation();
  };

  const handleMutatePaymentCalculation = () => {
    mutatePaymentCalculation({
      transport_category: watchedFieldsWithPromocode[0],
      duration_of_stay: watchedFieldsWithPromocode[1],
      promo_code: watchedFieldsWithPromocode[2],
    });
  };

  useEffect(() => {
    setTrigger(() => {
      setIsCountButtonClicked(false);
    });
  }, []);

  useEffect(() => {
    if (isCountButtonClicked && formState.isDirty) {
      handleMutatePaymentCalculation();
    }
  }, [JSON.stringify(watchedFields), isCountButtonClicked, formState.isDirty]);

  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис ОСАГО в Абхазии
        </CustomTitle>

        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <Substrate withShadow="light" className={styles.substrate}>
            <form noValidate onSubmit={handleSubmit(onSubmit)} action="">
              <OsagoApplyFields config={config} control={control} />

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
