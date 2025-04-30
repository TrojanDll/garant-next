"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";

import { useOsagoFormConfig } from "@/hooks/useOsagoFormConfig";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";
import DynamicFormSection from "@/components/entities/DynamicFormSection/DynamicFormSection";

import styles from "./OsagoApply.module.scss";
import { ICar, ICarBrand } from "@/types/cars.types";
import { useGetCarBrands } from "@/hooks/cars/useGetCarBrands";
import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";
import useCurrientCar from "@/stores/Cars/currientCar";
import { useCreateOsagoPolicy } from "@/hooks/policy/useCreateOsagoPolicy";
import { ICreateOsagoPolicyRequest } from "@/types/policy.types";
import toast from "react-hot-toast";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import { convertPersonType } from "@/helpers/convertPersonType";

function pickFormData(
  carInfoData: ICar,
  carBrands: ICarBrand[]
): Partial<IOsagoApplyForm> {
  let found = carBrands.find((item) => item.Make_Name === carInfoData.brand);

  // console.log(carInfoData.brand === found?.Make_Name ? carInfoData.brand : "");
  return {
    brand: carInfoData.brand,
    fio: carInfoData.fio,
    model: carInfoData.model,
    owner: carInfoData.owner === "individual" ? "individual" : "legal_entity",
    passport_number: carInfoData.passport_number,
    registration_number: carInfoData.registration_number,
    registration_plate: carInfoData.registration_plate,
    transport_category: carInfoData.transport_category,
    vehicle_refined_make: carInfoData.brand === found?.Make_Name ? "" : carInfoData.brand,
    vin: carInfoData.vin,
    year: carInfoData.year,
  };
}

function formatDataToCreateOsagoRequest(
  data: IOsagoApplyForm
): ICreateOsagoPolicyRequest {
  return {
    brand: data.brand,
    car_model: data.model,
    car_year: data.year,
    duration_of_stay: data.duration_of_stay,
    fio: data.fio,
    owner: convertPersonType(data.owner),
    passport_number: data.passport_number,
    promo_code: data.promocode,
    registration_number: data.registration_number,
    registration_plate: data.registration_plate,
    start_date: data.date_of_start,
    transport_category: data.transport_category,
    vin: data.vin,
  };
}

const OsagoApply = () => {
  const { config, isLoading } = useOsagoFormConfig();
  const { handleSubmit, control, reset, setValue } = useForm<IOsagoApplyForm>();
  const currientCar = useCurrientCar((state) => state.car);

  const {
    carsBrands,
    isError: isCarBrandsError,
    isLoading: isCarsBrandsLoading,
    isSuccess: isCarsBrandsSuccess,
  } = useGetCarBrands();

  const { data, isError, isPending, isSuccess, mutate } = useCreateOsagoPolicy();

  const setIsAnotherCarMark = useOsagoApplyCarMark((state) => state.setCarMarkValue);

  const { navigateToPolicies } = useNavigation();

  useEffect(() => {
    async function resetValues() {
      if (currientCar && carsBrands) {
        const pickedData = await pickFormData(currientCar, carsBrands);
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

        <Substrate withShadow="light" className={styles.substrate}>
          <form noValidate onSubmit={handleSubmit(onSubmit)} action="">
            <div className={styles.section}>
              <CustomTitle tag="h2">Транспортное средство</CustomTitle>

              <div className={styles.inputsWrapper}>
                {!isLoading && config.vehicle ? (
                  <DynamicFormSection
                    fields={config.vehicle}
                    control={control}
                    className={styles.input}
                    isTopItemSingle
                  />
                ) : (
                  <div>loading...</div>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <CustomTitle tag="h2" className={styles.sectionTitle}>
                Собственник
              </CustomTitle>
              <div className={styles.inputsWrapper}>
                {!isLoading && config.owner ? (
                  <DynamicFormSection
                    fields={config.owner}
                    control={control}
                    isTopItemSingle
                  />
                ) : (
                  <div>loading...</div>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <CustomTitle tag="h2" className={styles.sectionTitle}>
                Срок пребывания
              </CustomTitle>
              <div className={styles.inputsWrapper}>
                {!isLoading && config.duration ? (
                  <DynamicFormSection fields={config.duration} control={control} />
                ) : (
                  <div>loading...</div>
                )}
              </div>
            </div>

            <div className={styles.section}>
              {!isLoading && config.duration ? (
                <DynamicFormSection fields={config.promocode} control={control} />
              ) : (
                <div>loading...</div>
              )}
            </div>

            <Button type="submit" className={styles.submitButton} variant="wide">
              Рассчитать
            </Button>
          </form>
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default OsagoApply;
