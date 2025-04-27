"use client";

import React, { useEffect } from "react";

import styles from "./CarsNew.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import { SubmitHandler, useForm } from "react-hook-form";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { useOsagoFormConfig } from "@/hooks/useOsagoFormConfig";
import DynamicFormSection from "@/components/entities/DynamicFormSection/DynamicFormSection";
import Button from "@/components/ui/Button/Button";
import { INewCarForm } from "@/types/cars.types";
import { formatNewCarDataToRequest } from "@/helpers/formatNewCarDataToRequest";
import { useAddNewCar } from "@/hooks/cars/useAddNewCar";
import toast from "react-hot-toast";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import GoBackLink from "@/components/ui/GoBackLink/GoBackLink";
import Loader from "@/components/ui/Loader/Loader";

const CarsNew = () => {
  const { config, isLoading } = useOsagoFormConfig();
  const { handleSubmit, control } = useForm<IOsagoApplyForm>();
  const { isError, isPending, isSuccess, mutate } = useAddNewCar();
  const { navigateToCars } = useNavigation();

  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
    let formatedData: INewCarForm = formatNewCarDataToRequest(data);

    mutate(formatedData);
    console.log(formatedData);
  };

  useEffect(() => {
    if (isPending) {
      toast.loading("Загрузка");
    }

    if (isError) {
      toast.dismiss();
      toast.error("Ошибка добавления");
    } else if (isSuccess) {
      toast.dismiss();
      toast.success("Транспортное средство добавлено");

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
          Добавить сохраненное авто
        </CustomTitle>
      </div>

      {isPending || isLoading ? (
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

            <Button type="submit" className={styles.submitButton} variant="wide">
              Сохранить
            </Button>
          </form>
        </Substrate>
      )}
    </div>
  );
};

export default CarsNew;
