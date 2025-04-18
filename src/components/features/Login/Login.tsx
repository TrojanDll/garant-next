"use client";

import React, { useEffect } from "react";

import styles from "./Login.module.scss";

import Cookies from "js-cookie";

import Substrate from "@/components/ui/Substrate/Substrate";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm } from "@/types/auth.types";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";
import toast from "react-hot-toast";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import { useLogin } from "@/hooks/auth/useLogin";
import LoginFields from "@/components/entities/LoginFields/LoginFields";
import { EnumTokens } from "@/services/auth-token.service";

const Login = () => {
  const { handleSubmit, control } = useForm<ILoginForm>();
  const { login, isLoginSuccess, isLoginError, isLoginPending, loginError } = useLogin();
  const { goBack } = useNavigation();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    console.log(data);
    login(data);
  };

  useEffect(() => {
    if (isLoginPending) {
      toast.loading("Загрузка");
    }

    if (loginError.length > 0) {
      toast.dismiss();
    } else if (isLoginSuccess) {
      toast.dismiss();
      toast.success("Успешный вход");

      setTimeout(() => {
        toast.dismiss();
        goBack();
      }, 1000);
    }
  }, [isLoginPending]);

  console.log(Cookies.get(EnumTokens.TOKEN));

  return (
    <Substrate className={styles.substrate}>
      <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
        <CustomTitle tag="h1" isCentered className={styles.title}>
          Вход в личный кабинет
        </CustomTitle>

        {isLoginError && (
          <div className={styles.errorMessage}>
            {loginError === "unsubmited_email"
              ? "Email не подтвержден"
              : "Неверный Email или пароль"}
          </div>
        )}

        <LoginFields control={control} />

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
