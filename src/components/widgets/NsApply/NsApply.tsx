"use client";

import React, { useEffect, useState } from "react";

import styles from "./NsApply.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import { useFieldArray, useForm } from "react-hook-form";
import {
  EGenders,
  ICreateNsPolicyRequest,
  IInsuredCreationFilelds,
} from "@/types/policy.types";
import NsApplyInsuredList from "@/components/features/NsApplyInsuredList/NsApplyInsuredList";
import Button from "@/components/ui/Button/Button";
import NsApplyStaticFields from "@/components/entities/NsApplyStaticFields/NsApplyStaticFields";
import { useCalculateNs } from "@/hooks/policy/useCalculateNs";
import CountedPrice from "@/components/features/CountedPrice/CountedPrice";
import usePromocodeError from "@/stores/Promocode/promocodeError.store";
import usePromocodeEvent from "@/stores/Promocode/promocodeEvent.store";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import useCurrientNsPolicy from "@/stores/Policy/currientNsPolicy";
import toast from "react-hot-toast";

export const defaultInsuredValues: IInsuredCreationFilelds = {
  date_of_birth: "",
  fio: "",
  gender: EGenders.MAN,
  passport_number: "",
};

const NsApply = () => {
  const [isCalculatedBlockVisible, setIsCalculatedBlockVisible] =
    useState<boolean>(false);

  const {
    data: calculateNsData,
    isError: isCalculateNsError,
    isPending: isCalculateNsPending,
    isSuccess: isCalculateNsSuccess,
    isPromocodeError,
    mutate: calculateNsMutate,
  } = useCalculateNs();

  const setTrigger = usePromocodeEvent((state) => state.setTrigger);
  const setPromocodeError = usePromocodeError((state) => state.setError);
  const currientNsPolicy = useCurrientNsPolicy((state) => state.policy);
  const setCurrientNsPolicy = useCurrientNsPolicy((state) => state.setPolicy);
  const setCurrientNsPolicyCalculation = useCurrientNsPolicy(
    (state) => state.setCalculationData
  );

  const { navigateToNsConfirm } = useNavigation();

  const {
    control,
    handleSubmit,
    watch,
    formState,
    reset,
    trigger: formValidationTrigger,
    clearErrors,
  } = useForm<ICreateNsPolicyRequest>({
    defaultValues: {
      insured: [defaultInsuredValues],
      duration_of_stay: "",
      promocode: "",
      start_date: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "insured",
    control,
  });

  useEffect(() => {
    if (currientNsPolicy) {
      reset(currientNsPolicy);
    }
  }, [currientNsPolicy]);

  useEffect(() => {
    setTrigger(() => {
      setIsCalculatedBlockVisible(false);
    });
  }, []);

  const fieldsToRecolculateWatch = watch(["duration_of_stay", "insured"]);

  const watchedFields = watch(["duration_of_stay", "promocode", "insured"]);

  function handleCalculateClick() {
    const isValid = formValidationTrigger();

    if (!isValid) return;

    setPromocodeError(false);
    setIsCalculatedBlockVisible(true);
    calculateNsMutate({
      duration_of_stay: watchedFields[0],
      promocode: watchedFields[1],
      quantity: watchedFields[2].length,
    });
  }

  useEffect(() => {
    setIsCalculatedBlockVisible(false);
  }, [JSON.stringify(fieldsToRecolculateWatch)]);

  function onSubmit(data: ICreateNsPolicyRequest): void {
    console.log("form data:", data);

    setCurrientNsPolicy(data);
    setCurrientNsPolicyCalculation(calculateNsData);

    navigateToNsConfirm();
  }

  function onFormError() {
    toast.error("Заполните все обязательные поля");
  }

  useEffect(() => {
    let isMounted = true;

    if (!isCalculateNsPending) {
      toast.dismiss();
    } else {
      toast.loading("Загрузка");
    }

    if (isCalculateNsError && isMounted) {
      toast.dismiss();

      if (isPromocodeError) {
        toast.error("Введите действующий промокод или оставьте поле пустым");
      } else {
        toast.error("Ошибка. Проверьте данные");
      }
    }

    return () => {
      isMounted = false;
    };
  }, [isCalculateNsPending, isCalculateNsError, isPromocodeError]);

  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис от несчастного случая в Абхазии
        </CustomTitle>

        <form action="" noValidate onSubmit={handleSubmit(onSubmit, onFormError)}>
          <Substrate withShadow="light" className={styles.substrate}>
            <NsApplyInsuredList
              control={control}
              fields={fields}
              append={append}
              remove={remove}
              clearErrors={clearErrors}
            />

            <div className={styles.staticFieldsWrapper}>
              <NsApplyStaticFields clearErrors={clearErrors} control={control} />
            </div>

            {calculateNsData && isCalculateNsSuccess && isCalculatedBlockVisible ? (
              <CountedPrice
                className={styles.countedPrice}
                finalCost={calculateNsData.to_be_paid}
                preliminaryCost={calculateNsData.base_tariff}
                discount={calculateNsData.discount}
                type="ns"
              />
            ) : (
              <Button
                type="button"
                variant="wide"
                className={styles.submitButton}
                onClickEvent={handleCalculateClick}
                isLoading={isCalculateNsPending}
              >
                Рассчитать
              </Button>
            )}
          </Substrate>
        </form>
      </ContentContainer>
    </section>
  );
};

export default NsApply;
