import React from "react";
import { loginFields } from "./fields.data";
import { Control, Controller } from "react-hook-form";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import { ILoginForm } from "@/types/auth.types";

import styles from "./LoginFields.module.scss";

interface IProps {
  control?: Control<ILoginForm, any, ILoginForm> | undefined;
}

const LoginFields = ({ control }: IProps) => {
  return (
    <>
      {loginFields.map((config) => (
        <Controller<ILoginForm, keyof ILoginForm>
          key={config.name}
          name={config.name}
          control={control}
          rules={{
            required: config.required ? "Обязательное поле" : false,
          }}
          render={({ field, fieldState }) => (
            <CustomInput
              className={styles.input}
              name={field.name}
              setValue={field.onChange}
              value={field.value as string}
              errorMessage={fieldState.error?.message}
              placeholder={config.placeholder}
              inputType={field.name === "password" ? "password" : "text"}
            />
          )}
        />
      ))}
    </>
  );
};

export default LoginFields;
