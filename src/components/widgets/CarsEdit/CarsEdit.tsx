"use client";

import React, { useEffect, useState } from "react";

import styles from "./CarsEdit.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import { SubmitHandler, useForm } from "react-hook-form";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { useOsagoFormConfig } from "@/hooks/useOsagoFormConfig";
import DynamicFormSection from "@/components/entities/DynamicFormSection/DynamicFormSection";
import Button from "@/components/ui/Button/Button";
import { ICar, ICarBrand, IEditCarInfoForm, INewCarForm } from "@/types/cars.types";
import { formatNewCarDataToRequest } from "@/helpers/formatNewCarDataToRequest";
import { useAddNewCar } from "@/hooks/cars/useAddNewCar";
import toast from "react-hot-toast";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import GoBackLink from "@/components/ui/GoBackLink/GoBackLink";
import { useGetCarInfoById } from "@/hooks/cars/useGetCarInfoById";
import { useParams } from "next/navigation";
import { useEditCarInfo } from "@/hooks/cars/useEditCarInfo";
import { formatEditCarDataToRequest } from "@/helpers/formatEditCarDataToRequest";
import Loader from "@/components/ui/Loader/Loader";
import { selectCarModel } from "@/helpers/selectCarModel";
import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import { useGetCarBrands } from "@/hooks/cars/useGetCarBrands";
import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";

function pickFormData(carInfoData: ICar, carBrands: ICarBrand[]): Partial<IOsagoApplyForm> {
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

const CarsEdit = () => {
  const { config, isLoading } = useOsagoFormConfig();
  const { handleSubmit, control, reset, setValue } = useForm<IOsagoApplyForm>();
  const { navigateToCars } = useNavigation();
  const { data, isError, isPending, isSuccess, mutate } = useEditCarInfo();
  const [slug, setSlug] = useState("");
  const {
    carsBrands,
    isError: isCarBrandsError,
    isLoading: isCarsBrandsLoading,
    isSuccess: isCarsBrandsSuccess,
  } = useGetCarBrands();

  const {
    data: carInfoData,
    isError: isCarInfoError,
    isPending: isCarInfoPending,
    isSuccess: isCarInfoSuccess,
    mutate: getCarInfoById,
  } = useGetCarInfoById();

  const setIsAnotherCarMark = useOsagoApplyCarMark((state) => state.setCarMarkValue);

  const params = useParams();

  useEffect(() => {
    let newSlug = "";
    if (typeof params.slug === "string") {
      newSlug = params.slug;
    } else if (Array.isArray(params.slug)) {
      newSlug = params.slug[0];
    }

    setSlug(decodeURIComponent(newSlug));
  }, []);

  useEffect(() => {
    if (slug) {
      getCarInfoById(slug);
    }
  }, [slug]);

  useEffect(() => {
    async function resetValues() {
      if (isCarInfoSuccess && carInfoData && carsBrands) {
        console.log("event");
        const pickedData = await pickFormData(carInfoData, carsBrands);
        reset(pickedData);
        let found = await carsBrands.find((item) => item.Make_Name === carInfoData.brand);
        setValue("brand", Boolean(found) ? carInfoData.brand : "Другое ТС");
        setIsAnotherCarMark(!Boolean(found));
      }
    }

    resetValues()

  }, [isCarInfoPending, isCarsBrandsLoading]);

  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
    let formatedData: IEditCarInfoForm = formatEditCarDataToRequest(data, +slug);

    console.log(formatedData);

    mutate(formatedData);
  };

  useEffect(() => {
    if (isPending) {
      toast.loading("Загрузка");
    }

    if (isError) {
      toast.dismiss();
      toast.error("Ошибка редактирования");
    } else if (isSuccess) {
      toast.dismiss();
      toast.success("Транспортное средство отредактировано");

      setTimeout(() => {
        navigateToCars();
      }, 700);
    }
  }, [isPending]);

  return (
    <div className={styles.root}>
      <div className={styles.titleWrapper}>
        <GoBackLink className={styles.goBack} />
        <CustomTitle tag="h1" isCentered>
          Изменить сохраненное авто
        </CustomTitle>
      </div>

      {isCarInfoPending || isLoading || isCarsBrandsLoading ? (
        <Loader className={styles.loader} />
      ) : (
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
                  <DynamicFormSection fields={config.owner} control={control} isTopItemSingle />
                ) : (
                  <div>loading...</div>
                )}
              </div>
            </div>

            <Button type="submit" className={styles.submitButton} variant="wide">
              Сохранить
            </Button>
          </form>
        </Substrate>
      )}
    </div>
  );
};

export default CarsEdit;
