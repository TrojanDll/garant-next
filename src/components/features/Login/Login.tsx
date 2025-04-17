"use client";

import React, { useEffect } from "react";

import styles from "./Login.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm } from "@/types/auth.types";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import { loginFields } from "./fields.data";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";
import toast from "react-hot-toast";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import { useLogin } from "@/hooks/Auth/useLogin";

const Login = () => {
  const { handleSubmit, control } = useForm<ILoginForm>();
  const { login, isLoginSuccess, isLoginError, isLoginPending } = useLogin();
  const { goBack } = useNavigation();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    console.log(data);
    login(data);
  };

  useEffect(() => {
    if (isLoginPending) {
      toast.loading("Загрузка");
    }

    if (isLoginError) {
      toast.dismiss();
    } else if (isLoginSuccess) {
      toast.dismiss();
      toast.success("Успешный вход");

      setTimeout(() => {
        toast.dismiss();
        goBack();
      }, 500);
    }
  }, [isLoginPending]);

  return (
    <Substrate className={styles.substrate}>
      <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
        <CustomTitle tag="h1" isCentered className={styles.title}>
          Вход в личный кабинет
        </CustomTitle>

        {isLoginError && <div className={styles.errorMessage}>Неверный Email или пароль</div>}

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
              />
            )}
          />
        ))}

        <Link href={PAGES.RECOVERY} className={styles.recovery}>
          Забыли пароль?
        </Link>

        <Button className={styles.submit} type="submit">
          Войти
        </Button>
      </form>
    </Substrate>
  );
};

export default Login;
