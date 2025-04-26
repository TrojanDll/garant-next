"use client";

import React, { useEffect, useState } from "react";

import CustomSelect, { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import Button from "@/components/ui/Button/Button";

import styles from "./CalculatorInputForm.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ICalculatorNsForm,
  ICalculatorNsFormFields,
  ICalculatorOsagoForm,
  ICalculatorOsagoFormFields,
} from "@/types/ICalculatorForms";
import { IFieldConfig } from "@/types/IFieldConfig";
import CalculatorPolicyPrice from "../CalculatorPolicyPrice/CalculatorPolicyPrice";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { calculatorPromoCategories, osagoTable } from "./tables.data";

interface FormData {
  [key: string]: any;
}

interface IProps {
  config: { fields: IFieldConfig<ICalculatorOsagoForm & ICalculatorNsForm>[] };
  variant: "osago" | "ns";
}

function findValue(
  variant: "osago" | "ns",
  data: ICalculatorOsagoFormFields & ICalculatorNsFormFields
): string {
  if (variant === "osago") {
    const row = osagoTable.find((r) => r.rowHeader === data.car_category.value);
    if (row) {
      return row.columns[data.duration_of_stay_osago.value];
    }
  }

  if (variant === "ns") {
    const foundPrice = calculatorPromoCategories.find(
      (item) => item.value === data.duration_of_stay_ns.value
    )?.price;

    if (foundPrice) {
      const ammount = foundPrice * Number(data.number_of_people.value);

      return ammount.toString();
    }
  }

  return "";
}

const CalculatorInputForm = ({ config, variant }: IProps) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [foundPrice, setFoundPrice] = useState(0);
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false);

  const defaultValues = config.fields.reduce((acc, field) => {
    acc[field.name] =
      field.type === "checkbox" ? false : field.type === "select" ? null : "";
    return acc;
  }, {} as FormData);

  const { control, handleSubmit, reset, watch, formState } = useForm<
    ICalculatorOsagoFormFields & ICalculatorNsFormFields
  >({
    defaultValues,
    mode: "onSubmit",
  });

  const watchedFields = watch();

  useEffect(() => {
    if (isSubmittedOnce && formState.isDirty) {
      let value = findValue(variant, watchedFields);
      setFoundPrice(value ? +value : 0);
    }
  }, [watchedFields, isSubmittedOnce, formState.isDirty]);

  const onSubmit: SubmitHandler<ICalculatorOsagoFormFields & ICalculatorNsFormFields> = (
    data
  ) => {
    let value = findValue(variant, data);

    setFoundPrice(value ? +value : 0);

    setIsCorrect(true);
    setIsSubmittedOnce(true);
  };

  const renderField = (
    config: IFieldConfig<ICalculatorOsagoForm & ICalculatorNsForm>
  ) => {
    switch (config.type) {
      case "select":
        return (
          <Controller
            key={config.name}
            name={config.name}
            control={control}
            rules={{
              required: {
                value: config.required ? config.required : false,
                message: "error",
              },
            }}
            render={({ field, fieldState }) => (
              <CustomSelect
                isSearchable={false}
                key={config.name}
                className={styles.select}
                name={config.name}
                placeholder={config.placeholder}
                label={config.label}
                required={config.required}
                options={config.options as IOptions[]}
                selectedValue={field.value}
                setFullValue={(value: IOptions) => field.onChange(value)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} action="">
      {config.fields.map((field) => renderField(field))}
      <Button
        className={`${styles.submit} ${isCorrect ? styles.submitHidden : ""}`}
        type="submit"
      >
        Рассчитать
      </Button>
      {isCorrect && (
        <CalculatorPolicyPrice
          className={styles.price}
          policyType={variant}
          price={foundPrice}
        />
      )}
    </form>
  );
};

export default CalculatorInputForm;
