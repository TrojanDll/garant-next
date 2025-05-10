"use client";

import React, { useEffect, useState } from "react";

import styles from "./NsApply.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import { useFieldArray, useForm } from "react-hook-form";
import {
  EGenders,
  ICalculateNsPolicyRequest,
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
import { useNsApplyFormHandlers } from "@/hooks/policy/useNsApplyFormHandlers";
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

  const { control, handleSubmit, watch, formState, reset } =
    useForm<ICreateNsPolicyRequest>({
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

  const durationOfStayFieldWatch = watch(["duration_of_stay"]);

  const { handleCalculateClick } = useNsApplyFormHandlers(
    watch,
    (value: ICalculateNsPolicyRequest) => calculateNsMutate(value),
    (mark: boolean) => setPromocodeError(mark),
    (value: boolean) => setIsCalculatedBlockVisible(value)
  );

  useEffect(() => {
    if (isCalculatedBlockVisible && formState.isDirty) {
      handleCalculateClick();
    }
  }, [
    JSON.stringify(durationOfStayFieldWatch),
    isCalculatedBlockVisible,
    formState.isDirty,
  ]);

  function onSubmit(data: ICreateNsPolicyRequest): void {
    console.log("form data:", data);

    setCurrientNsPolicy(data);
    setCurrientNsPolicyCalculation(calculateNsData);

    navigateToNsConfirm();
  }

  useEffect(() => {
    if (!isCalculateNsPending) {
      toast.dismiss();
    } else {
      toast.loading("Загрузка");
    }

    if (isCalculateNsError) {
      toast.dismiss();
      toast.error("Ошибка. Проверьте данные");
    }
  }, [isCalculateNsPending]);

  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис от несчастного случая в Абхазии
        </CustomTitle>

        <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Substrate withShadow="light" className={styles.substrate}>
            <NsApplyInsuredList
              control={control}
              fields={fields}
              append={append}
              remove={remove}
            />

            <div className={styles.staticFieldsWrapper}>
              <NsApplyStaticFields control={control} />
            </div>

            {calculateNsData && isCalculateNsSuccess && isCalculatedBlockVisible ? (
              <CountedPrice
                className={styles.countedPrice}
                finalCost={calculateNsData.to_be_paid}
                preliminaryCost={calculateNsData.base_tariff}
                discount={calculateNsData.discount}
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
