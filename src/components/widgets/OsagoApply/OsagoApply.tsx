"use client";

import React, { useEffect, useState } from "react";

import styles from "./OsagoApply.module.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";

import { useOsagoFormConfig } from "@/hooks/useOsagoFormConfig";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";
import DynamicFormSection from "@/components/entities/DynamicFormSection/DynamicFormSection";

import { useGetCarBrands } from "@/hooks/cars/useGetCarBrands";
import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";
import useCurrientCar from "@/stores/Cars/currientCar";
import { useCreateOsagoPolicy } from "@/hooks/policy/useCreateOsagoPolicy";
import toast from "react-hot-toast";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import { formatDataToCreateOsagoRequest } from "@/helpers/OsagoApply/formatDataToCreateOsagoRequest";
import Loader from "@/components/ui/Loader/Loader";
import { pickOsagoApplyFormData } from "@/helpers/OsagoApply/pickOsagoApplyFormData";
import CountedPrice from "@/components/features/CountedPrice/CountedPrice";

const OsagoApply = () => {
  const { config, isLoading } = useOsagoFormConfig();
  const { navigateToPolicies } = useNavigation();

  const { handleSubmit, control, reset, setValue } = useForm<IOsagoApplyForm>();

  const [isCountButtonClicked, setIsCountButtonClicked] = useState<boolean>(false);

  const currientCar = useCurrientCar((state) => state.car);
  const setIsAnotherCarMark = useOsagoApplyCarMark((state) => state.setCarMarkValue);

  const { carsBrands, isLoading: isCarsBrandsLoading } = useGetCarBrands();
  const { isError, isPending, isSuccess, mutate } = useCreateOsagoPolicy();

  useEffect(() => {
    async function resetValues() {
      if (currientCar && carsBrands) {
        const pickedData = await pickOsagoApplyFormData(currientCar, carsBrands);
        reset(pickedData);
        let found = await carsBrands.find((item) => item.Make_Name === currientCar.brand);
        setValue("brand", Boolean(found) ? currientCar.brand : "Другое ТС");
        setIsAnotherCarMark(!Boolean(found));
      }
    }

    resetValues();
  }, [currientCar, isCarsBrandsLoading]);

  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
    const formatedData = formatDataToCreateOsagoRequest(data);
    console.log(formatedData);
    mutate(formatedData);
  };

  const handleCountClick = () => {};

  useEffect(() => {
    if (isPending) {
      toast.loading("Загрузка");
    }

    if (isError) {
      toast.dismiss();
      toast.error("Ошибка при рассчете");
    } else if (isSuccess) {
      toast.dismiss();
      toast.success("Готово");

      setTimeout(() => {
        navigateToPolicies();
      }, 1000);
    }
  }, [isPending]);

  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис ОСАГО в Абхазии
        </CustomTitle>

        {isPending || isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <Substrate withShadow="light" className={styles.substrate}>
            <form noValidate onSubmit={handleSubmit(onSubmit)} action="">
              <div className={styles.section}>
                <CustomTitle tag="h2">Транспортное средство</CustomTitle>

                <div className={styles.inputsWrapper}>
                  {config.vehicle && (
                    <DynamicFormSection
                      fields={config.vehicle}
                      control={control}
                      className={styles.input}
                      isTopItemSingle
                    />
                  )}
                </div>
              </div>

              <div className={styles.section}>
                <CustomTitle tag="h2" className={styles.sectionTitle}>
                  Собственник
                </CustomTitle>
                <div className={styles.inputsWrapper}>
                  {config.owner && (
                    <DynamicFormSection
                      fields={config.owner}
                      control={control}
                      isTopItemSingle
                    />
                  )}
                </div>
              </div>

              <div className={styles.section}>
                <CustomTitle tag="h2" className={styles.sectionTitle}>
                  Срок пребывания
                </CustomTitle>
                <div className={styles.inputsWrapper}>
                  {config.duration && (
                    <DynamicFormSection fields={config.duration} control={control} />
                  )}
                </div>
              </div>

              <div className={styles.section}>
                {config.duration && (
                  <DynamicFormSection fields={config.promocode} control={control} />
                )}
              </div>

              {isCountButtonClicked ? (
                <CountedPrice
                  discount={100}
                  finalCost={900}
                  preliminaryCost={1000}
                  className={styles.priceWrapper}
                />
              ) : (
                <Button
                  type="button"
                  className={styles.countButton}
                  variant="wide"
                  onClickEvent={() => setIsCountButtonClicked(true)}
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
