"use client";

import React, { useEffect } from "react";

import styles from "./Login.module.scss";

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
import { saveTokenToStorage } from "@/services/auth-token.service";

const Login = () => {
  const { handleSubmit, control } = useForm<ILoginForm>();
  const {
    login,
    isLoginSuccess,
    isLoginError,
    isLoginPending,
    loginError,
    loginResponse,
  } = useLogin();
  const { navigateToDashboard } = useNavigation();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    console.log(data);
    login(data);
  };

  useEffect(() => {
    let isMounted = true;

    if (!isLoginPending) {
      toast.dismiss();
    }

    if (isLoginPending) {
      toast.loading("Загрузка");
    } else {
      toast.dismiss();
    }

    let timeoutId: NodeJS.Timeout;
    if (isLoginSuccess && isMounted) {
      toast.dismiss();
      toast.success("Успешный вход");
      // saveTokenToStorage(loginResponse?.data.token || "");

      timeoutId = setTimeout(() => {
        toast.dismiss();
        navigateToDashboard();
      }, 1000);
    }

    return () => {
      isMounted = false;

      clearTimeout(timeoutId);
    };
  }, [isLoginPending, isLoginError, isLoginSuccess]);

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
