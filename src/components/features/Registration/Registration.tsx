"use client";

import Substrate from "@/components/ui/Substrate/Substrate";
import React, { useEffect } from "react";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IRegistrationForm } from "@/types/auth.types";
import CustomInput from "@/components/ui/CustomInput/CustomInput";

import Button from "@/components/ui/Button/Button";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";

import styles from "./Registration.module.scss";
import { registrationFields } from "./fields.data";
import { useRegistration } from "@/hooks/auth/useRegistration";
import toast from "react-hot-toast";

const Registration = () => {
  const { handleSubmit, control, watch } = useForm<IRegistrationForm>();
  const {
    registration,
    isRegistrationPending,
    registrationResponse,
    isRegistrationError,
    isRegistrationSuccess,
  } = useRegistration();

  const password = watch("password");

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    console.log(data);
    registration(data);
  };

  useEffect(() => {
    if (isRegistrationPending) {
      toast.loading("Загрузка");
    }

    if (isRegistrationError) {
      toast.dismiss();
      toast.error("Ошибка регистрации");
    } else if (isRegistrationSuccess) {
      toast.dismiss();
      toast.success("Регистрация прошла успешно");
    }
  }, [isRegistrationPending]);

  return (
    <Substrate className={styles.substrate}>
      <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
        <CustomTitle tag="h1" isCentered className={styles.title}>
          Регистрация нового пользователя
        </CustomTitle>

        {registrationFields.map((config) => {
          const isPasswordConfirm = config.name === "password_confirmation";

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
              }}
              render={({ field, fieldState }) => (
                <CustomInput
                  className={styles.input}
                  name={field.name}
                  setValue={field.onChange}
                  value={field.value as string}
                  errorMessage={fieldState.error?.message}
                  displayErrorMessage={isPasswordConfirm}
                  label={config.label}
                  placeholder={config.placeholder}
                />
              )}
            />
          );
        })}

        <div className={styles.checkboxWrapper}>
          <Controller<IRegistrationForm, keyof IRegistrationForm>
            key={styles.checkbox}
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
            Я согласен на обработку{" "}
            <Link className={styles.checkboxLink} href={PAGES.POLICY}>
              персональных данных (ПД)
            </Link>{" "}
            и ознакомился с{" "}
            <Link className={styles.checkboxLink} href={PAGES.POLICY}>
              политикой обработки ПД
            </Link>
          </div>
        </div>

        <Button className={styles.submit} type="submit">
          Регистрация
        </Button>
      </form>
    </Substrate>
  );
};

export default Registration;
