"use client";

import React, { useEffect, useState } from "react";

import styles from "./Login.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm } from "@/types/auth.types";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";
import toast from "react-hot-toast";
import { useLogin } from "@/hooks/auth/useLogin";
import LoginFields from "@/components/entities/LoginFields/LoginFields";
import EmailConfirmation from "@/components/entities/EmailConfirmation/EmailConfirmation";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import { useGetNewVerificationCode } from "@/hooks/auth/useGetNewVerificationCode";

interface IProps {
  variant?: "default" | "modal";
  handleReturnButton?: () => void;
  handleSuccessLogin?: () => void;
  handleInputChange?: (data: ILoginForm) => void;
  defaultData?: Partial<ILoginForm>;
}

const Login = ({
  variant = "default",
  handleReturnButton,
  handleSuccessLogin,
  defaultData,
  handleInputChange,
}: IProps) => {
  const { handleSubmit, control, watch } = useForm<ILoginForm>({
    defaultValues: defaultData,
  });
  const {
    login,
    isLoginSuccess,
    isLoginError,
    isLoginPending,
    loginError,
    loginResponse,
  } = useLogin();

  const {
    mutate: getNewVerificationCode,
    isPending: isGetNewVerificationCodePending,
    isSuccess: isGetNewVerificationCodeSuccess,
    isError: isGetNewVerificationCodeError,
  } = useGetNewVerificationCode();

  const [loginData, setLoginData] = useState<ILoginForm>();

  const { navigateToHome, reloadPage } = useNavigation();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    console.log(data);
    setLoginData(data);
    login(data);
  };

  const allFieldsWatch = watch(["email", "password"]);

  useEffect(() => {
    if (handleInputChange) {
      handleInputChange({
        email: allFieldsWatch[0],
        password: allFieldsWatch[1],
      });
    }
  }, [allFieldsWatch]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    if (!isLoginPending) {
      toast.dismiss();
    }

    if (isLoginPending) {
      toast.loading("Загрузка");
    } else {
      toast.dismiss();
    }

    if (isLoginSuccess && isMounted) {
      toast.dismiss();
      toast.success("Успешный вход");

      if (handleSuccessLogin) {
        timeoutId = setTimeout(() => {
          handleSuccessLogin();
        }, 1500);
      }

      if (variant === "default") {
        timeoutId = setTimeout(() => {
          console.log("navigateToHome");
          navigateToHome();
          reloadPage();
        }, 1500);
      }
      // saveTokenToStorage(loginResponse?.data.token || "");

      // timeoutId = setTimeout(() => {
      //   toast.dismiss();
      //   navigateToPolicies();
      // }, 50);
    } else if (loginError === "unsubmited_email") {
      getNewVerificationCode({
        email: loginData?.email ? loginData.email : "",
      });
    }

    return () => {
      isMounted = false;

      clearTimeout(timeoutId);
    };
  }, [isLoginPending, isLoginError, isLoginSuccess]);

  function successLogin() {
    if (handleSuccessLogin) {
      handleSuccessLogin();
    } else {
      setTimeout(() => {
        navigateToHome();
        reloadPage();
      }, 1000);
    }
  }

  const Wrapper: React.ElementType = variant === "default" ? Substrate : "div";

  return (
    <Wrapper
      className={`${styles.substrate} ${
        variant === "modal" ? styles.modalSubstrate : ""
      }`}
    >
      {loginError === "unsubmited_email" ? (
        <EmailConfirmation
          handleSuccessAuth={successLogin}
          email={loginData?.email ? loginData.email : ""}
        />
      ) : (
        <>
          <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
            <CustomTitle tag="h1" isCentered className={styles.title}>
              Вход в личный кабинет
            </CustomTitle>

            {isLoginError && (
              <div className={styles.errorMessage}>
                "Неверный Email или пароль"
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

          {variant === "modal" && (
            <div className={styles.changeAuthTypeWrapper}>
              Ещё нет аккаунта?{" "}
              <button
                onClick={handleReturnButton}
                className={styles.changeAuthTypeButton}
              >
                Зарегистрируйтесь
              </button>
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Login;
