"use client";

import React, { useState } from "react";

import CustomSelect, { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import Button from "@/components/ui/Button/Button";

import styles from "./CalculatorInputForm.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ICalculatorNsForm, ICalculatorOsagoForm } from "@/types/ICalculatorForms";
import { IFieldConfig } from "@/types/IFieldConfig";
import CalculatorPolicyPrice from "../CalculatorPolicyPrice/CalculatorPolicyPrice";
import { IOsagoApplyForm } from "@/types/IOsagoApplyForm";

interface FormData {
  [key: string]: any;
}

interface IProps {
  config: { fields: IFieldConfig<ICalculatorOsagoForm & ICalculatorNsForm>[] };
  variant: "osago" | "ns";
}

const CalculatorInputForm = ({ config, variant }: IProps) => {
  const [isCorrect, setIsCorrect] = useState(false);

  const defaultValues = config.fields.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : field.type === "select" ? null : "";
    return acc;
  }, {} as FormData);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Данные формы:", data);
    setIsCorrect(true);
    reset();
  };

  const renderField = (config: IFieldConfig<ICalculatorOsagoForm & ICalculatorNsForm>) => {
    switch (config.type) {
      case "select":
        return (
          <Controller
            key={config.name}
            name={config.name}
            control={control}
            rules={{
              required: { value: config.required ? config.required : false, message: "error" },
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
                setValue={(value: string) => field.onChange(value)}
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
      <Button className={`${styles.submit} ${isCorrect ? styles.submitHidden : ""}`} type="submit">
        Рассчитать
      </Button>
      {isCorrect && (
        <CalculatorPolicyPrice className={styles.price} policyType={variant} price={1000} />
      )}
    </form>
  );
};

export default CalculatorInputForm;
