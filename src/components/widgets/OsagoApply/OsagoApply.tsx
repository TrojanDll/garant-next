"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";

import { useOsagoFormConfig } from "@/hooks/useOsagoFormConfig";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";
import DynamicFormSection from "@/components/entities/DynamicFormSection/DynamicFormSection";

import styles from "./OsagoApply.module.scss";
import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";

const OsagoApply = () => {
  const { config, isLoading } = useOsagoFormConfig();
  const { handleSubmit, control } = useForm<IOsagoApplyForm>();


  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
    console.log(data);
  };

  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис ОСАГО в Абхазии!
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
      </ContentContainer>
    </section>
  );
};

export default OsagoApply;
