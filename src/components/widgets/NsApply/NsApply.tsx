"use client";

import React, { useEffect, useState } from "react";

import styles from "./NsApply.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
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
import toast from "react-hot-toast";
import usePromocodeEvent from "@/stores/Promocode/promocodeEvent.store";
import { useCreateNsPolicy } from "@/hooks/policy/useCreateNsPolicy";
import { formatDataToCreateNsPolicy } from "@/helpers/NsApply/formatDataToCreateNsPolicy.helper";

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

  const {
    data: createPolicyResponseData,
    isError: isCreatePolicyError,
    isPending: isCreatePolicyPending,
    isPromocodeError: isPromocodeErrorPolicy,
    isSuccess: isCreatePolicySuccess,
    mutate: createPolicyMutate,
  } = useCreateNsPolicy();

  const setTrigger = usePromocodeEvent((state) => state.setTrigger);
  const setPromocodeError = usePromocodeError((state) => state.setError);

  const { control, handleSubmit, watch, formState } = useForm<ICreateNsPolicyRequest>({
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
    setTrigger(() => {
      setIsCalculatedBlockVisible(false);
    });
  }, []);

  const watchedFields = watch(["duration_of_stay", "promocode", "insured"]);
  const durationOfStayFieldWatch = watch(["duration_of_stay"]);

  function handleCalculateClick() {
    setPromocodeError(false);

    const calculateNDataToCalculate = {
      duration_of_stay: watchedFields[0],
      promocode: watchedFields[1],
      quantity: watchedFields[2].length,
    };

    setIsCalculatedBlockVisible(true);
    calculateNsMutate(calculateNDataToCalculate);
  }

  useEffect(() => {
    if (isCalculateNsPending) {
      toast.loading("Загрузка");
    } else {
      toast.dismiss();
    }

    if (isCalculateNsError && !isPromocodeError) {
      toast.error("Ошибка. Проверьте заполненные данные");
    } else if (isCalculateNsError && isPromocodeError) {
      toast.error("Укажите верный промокод или оставьте поле пустым");
    }
  }, [isCalculateNsPending]);

  useEffect(() => {
    if (isCreatePolicyPending) {
      toast.loading("Загрузка");
    } else {
      toast.dismiss();
    }

    if (isCreatePolicyError && !isPromocodeErrorPolicy) {
      toast.error("Ошибка. Проверьте заполненные данные");
    } else if (isCreatePolicyError && isPromocodeErrorPolicy) {
      toast.error("Укажите верный промокод или оставьте поле пустым");
    } else if (isCreatePolicySuccess) {
      toast.success("Полис успешно создан");
    }
  }, [isCreatePolicyPending]);

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

    createPolicyMutate(formatDataToCreateNsPolicy(data));
  }

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
