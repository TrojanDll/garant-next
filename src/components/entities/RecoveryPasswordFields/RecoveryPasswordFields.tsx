import React from "react";

import styles from "./RecoveryPasswordFields.module.scss";

import { Control, Controller } from "react-hook-form";
import { IRecoveryPasswordForm } from "@/types/recovery.types";
import CustomInput from "@/components/ui/CustomInput/CustomInput";

interface IProps {
  control: Control<IRecoveryPasswordForm, any, IRecoveryPasswordForm>;
  password: string;
  className?: string;
}

const RecoveryPasswordFields = ({ control, className, password }: IProps) => {
  return (
    <>
      <Controller<IRecoveryPasswordForm, keyof IRecoveryPasswordForm>
        key={`${styles.input}password`}
        name="password"
        control={control}
        rules={{
          required: "Обязательное поле",
          minLength: {
            value: 8,
            message: "Пароль должен содержать не менее 8 символов",
          },
          maxLength: {
            value: 40,
            message: "Пароль должен содержать не более 40 символов",
          },
        }}
        render={({ field, fieldState }) => (
          <CustomInput
            className={`${styles.input} ${className}`}
            name={field.name}
            setValue={field.onChange}
            value={field.value as string}
            errorMessage={fieldState.error?.message}
            displayErrorMessage={true}
            label="Пароль*"
            placeholder="Придумайте пароль"
            inputType="text"
          />
        )}
      />

      <Controller<IRecoveryPasswordForm, keyof IRecoveryPasswordForm>
        key={`${styles.input}password_confirmation`}
        name="password_confirmation"
        control={control}
        rules={{
          required: "Обязательное поле",
          validate: (value) => value === password || "Пароли не совпадают",
        }}
        render={({ field, fieldState }) => (
          <CustomInput
            className={`${styles.input} ${className}`}
            name={field.name}
            setValue={field.onChange}
            value={field.value as string}
            errorMessage={fieldState.error?.message}
            displayErrorMessage={true}
            label="Повторите пароль*"
            placeholder="Повторите пароль"
            inputType="text"
          />
        )}
      />
    </>
  );
};

export default RecoveryPasswordFields;
