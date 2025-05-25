import React from "react";

import styles from "./OsagoApplyFields.module.scss";

import { ISplitFieldConfig } from "@/helpers/OsagoApply/getOsagoApplyFields.helper";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { Control, UseFormClearErrors, UseFormTrigger } from "react-hook-form";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import DynamicFormSection from "@/components/entities/DynamicFormSection/DynamicFormSection";

interface IProps {
  config: ISplitFieldConfig;
  control: Control<IOsagoApplyForm, any, IOsagoApplyForm>;
  clearErrors?: UseFormClearErrors<IOsagoApplyForm>;
}

const OsagoApplyFields = ({ config, control, clearErrors }: IProps) => {
  return (
    <>
      <div className={styles.section}>
        <CustomTitle tag="h2">Транспортное средство</CustomTitle>

        <div className={styles.inputsWrapper}>
          {config.vehicle && (
            <DynamicFormSection
              clearErrors={clearErrors}
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
              clearErrors={clearErrors}
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
            <DynamicFormSection
              clearErrors={clearErrors}
              fields={config.duration}
              control={control}
            />
          )}
        </div>
      </div>

      <div className={styles.section}>
        {config.promocode && (
          <DynamicFormSection
            clearErrors={clearErrors}
            fields={config.promocode}
            control={control}
          />
        )}
      </div>
    </>
  );
};

export default OsagoApplyFields;
