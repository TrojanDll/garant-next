"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRegistration } from "@/hooks/auth/useRegistration";

import { IRegistrationForm } from "@/types/auth.types";

import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Button from "@/components/ui/Button/Button";
import RegistrationFields from "@/components/entities/RegistrationFields/RegistrationFields";

import styles from "./Registration.module.scss";
import EmailConfirmation from "@/components/entities/EmailConfirmation/EmailConfirmation";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

interface IProps {
  variant?: "default" | "modal";
  onCloseEvent?: () => void;
}

const Registration = ({ onCloseEvent, variant = "default" }: IProps) => {
  const { handleSubmit, control, watch } = useForm<IRegistrationForm>();
  const {
    registration,
    isRegistrationPending,
    isRegistrationError,
    isRegistrationSuccess,
    registrationErrors,
  } = useRegistration();

  const [formatedRegistrationData, setFormatedRegistrationData] =
    useState<IRegistrationForm>({
      checkbox: true,
      email: "ivankapetrov93@mail.ru",
      name: "ivan",
      password: "12345678",
      password_confirmation: "12345678",
      surname: "ivanov",
    });

  const password = watch("password");

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    setFormatedRegistrationData(data);
  };

  useEffect(() => {
    if (formatedRegistrationData) {
      console.log(formatedRegistrationData);

      registration(formatedRegistrationData);
    }
  }, [formatedRegistrationData]);

  function onFormError() {
    toast.error("Заполните все обязательные поля");
  }

  useEffect(() => {
    let isMounted = true;

    if (isRegistrationPending) {
      toast.loading("Загрузка");
    }

    if (isRegistrationError && isMounted) {
      toast.dismiss();
      if (registrationErrors.email === "taken") {
        toast.error("Этот email уже занят");
      } else {
        toast.error("Ошибка регистрации");
      }
    } else if (isRegistrationSuccess && isMounted) {
      toast.dismiss();
      toast.success("Регистрация прошла успешно");
      // saveTokenToStorage(registrationResponse?.data.token || "");
    }

    return () => {
      isMounted = false;
    };
  }, [isRegistrationPending, isRegistrationError, isRegistrationSuccess]);

  const Wrapper: React.ElementType = variant === "default" ? Substrate : "div";

  return (
    <Wrapper
      className={`${styles.substrate} ${
        variant === "modal" ? styles.modalSubstrate : ""
      } ${isRegistrationSuccess ? styles.registrationSuccessSubstrate : ""}`}
    >
      {true ? (
        <EmailConfirmation email={formatedRegistrationData?.email || ""} />
      ) : (
        <form
          action=""
          noValidate
          onSubmit={handleSubmit(onSubmit, onFormError)}
        >
          <CustomTitle tag="h1" isCentered className={styles.title}>
            Регистрация личного кабинета
          </CustomTitle>

          <RegistrationFields
            control={control}
            password={password}
            variant={variant}
          />

          <Button className={styles.submit} type="submit">
            Регистрация
          </Button>
        </form>
      )}
    </Wrapper>
  );
};

export default Registration;
