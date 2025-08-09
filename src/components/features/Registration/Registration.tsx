"use client";

import React, { useEffect } from "react";
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

  const password = watch("password");

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    const formatedData: IRegistrationForm = {
      ...data,
      // phone: formatPhoneNumber(data.phone),
    };

    console.log(formatedData);

    registration(formatedData);
  };

  function onFormError() {
    toast.error("Заполните все обязательные поля");
  }

  useEffect(() => {
    let isMounted = true;

    if (isRegistrationPending) {
      toast.loading("Загрузка");
    } else {
      toast.dismiss();
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

  return (
    <Substrate
      className={`${styles.substrate} ${
        variant === "modal" ? styles.modalSubstrate : ""
      }`}
    >
      {variant === "modal" && <SvgSelector id={ESvgName.CLOSE} />}

      {isRegistrationSuccess ? (
        <EmailConfirmation />
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
    </Substrate>
  );
};

export default Registration;
