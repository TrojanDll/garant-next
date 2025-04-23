"use client";

import React from "react";

import styles from "./CarsNew.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import { SubmitHandler, useForm } from "react-hook-form";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { useOsagoFormConfig } from "@/hooks/useOsagoFormConfig";
import DynamicFormSection from "@/components/entities/DynamicFormSection/DynamicFormSection";
import Button from "@/components/ui/Button/Button";

const CarsNew = () => {
  const { config, isLoading } = useOsagoFormConfig();
  const { handleSubmit, control } = useForm<IOsagoApplyForm>();

  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <CustomTitle tag="h1" isCentered>
        Добавить сохраненное авто
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
                <DynamicFormSection fields={config.owner} control={control} isTopItemSingle />
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
    </div>
  );
};

export default CarsNew;
