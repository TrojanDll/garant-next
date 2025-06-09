import React from "react";
import { registrationFields } from "./fields.data";
import { Control, Controller } from "react-hook-form";
import { IRegistrationForm } from "@/types/auth.types";
import CustomInput from "@/components/ui/CustomInput/CustomInput";

import styles from "./RegistrationFields.module.scss";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";

interface IProps {
  control?: Control<IRegistrationForm, any, IRegistrationForm> | undefined;
  password?: string;
}

const RegistrationFields = ({ control, password }: IProps) => {
  return (
    <>
      {registrationFields.map((config) => {
        const isPasswordConfirm = config.name === "password_confirmation";
        const isPassword = config.name === "password";
        const isEmail = config.name === "email";
        const isPhone = config.name === "phone";

        return (
          <Controller<IRegistrationForm, keyof IRegistrationForm>
            key={config.name}
            name={config.name}
            control={control}
            rules={{
              required: config.required ? "Обязательное поле" : false,
              ...(isPasswordConfirm && {
                validate: (value) => value === password || "Пароли не совпадают",
              }),
              ...(isEmail && {
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Некорректный email",
                },
              }),
              ...(isPassword && {
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 символов",
                },
                maxLength: {
                  value: 40,
                  message: "Пароль должен содержать не более 40 символов",
                },
              }),
              // ...(isPhone && {
              //   pattern: {
              //     value: /^(\+7|7|8)?\d{10}$/,
              //     message: "Неверный формат номера",
              //   },
              // }),
            }}
            render={({ field, fieldState }) => (
              <CustomInput
                className={styles.input}
                name={field.name}
                setValue={field.onChange}
                value={field.value as string}
                errorMessage={fieldState.error?.message}
                displayErrorMessage={true}
                label={config.label}
                placeholder={config.placeholder}
                inputType={config.inputType}
              />
            )}
          />
        );
      })}

      <div className={styles.checkboxWrapper}>
        <Controller<IRegistrationForm, keyof IRegistrationForm>
          key={styles.checkboxWrapper}
          name="checkbox"
          control={control}
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field, fieldState }) => (
            <Checkbox
              className={styles.input}
              setValue={field.onChange}
              value={field.value as boolean}
              isError={!!fieldState.error?.message}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <div className={styles.checkboxText}>
          Я даю согласие на обработку персональных данных в соответствии с{" "}
          <Link className={styles.checkboxLink} href={PAGES.POLICY}>
            политикой конфиденциальности
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegistrationFields;
