"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ru } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

import { IOsagoApplyForm } from "@/types/IOsagoApplyForm";

import { useOsagoFormConfig } from "@/hooks/useOsagoFormConfig";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";
import DynamicFormSection from "@/components/entities/DynamicFormSection/DynamicFormSection";

import styles from "./OsagoApply.module.scss";
import Calendar from "@/components/ui/Calendar/Calendar";

const OsagoApply = () => {
  const { config, isLoading } = useOsagoFormConfig();
  const { handleSubmit, control } = useForm<IOsagoApplyForm>();

  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
    console.log(data);
  };

  const [selected, setSelected] = useState<Date>();

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

            <Button type="submit">submit</Button>
          </form>
          <Calendar value={selected} setValue={setSelected} />
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default OsagoApply;
