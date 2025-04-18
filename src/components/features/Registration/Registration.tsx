"use client";

import Substrate from "@/components/ui/Substrate/Substrate";
import React, { useEffect, useState } from "react";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IRegistrationForm } from "@/types/auth.types";
import CustomInput from "@/components/ui/CustomInput/CustomInput";

import Button from "@/components/ui/Button/Button";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";

import toast from "react-hot-toast";
import { useRegistration } from "@/hooks/auth/useRegistration";

import styles from "./Registration.module.scss";
import { formatPhoneNumber } from "@/helpers/user/formatPhoneNumber.helper";
import RegistrationFields from "@/components/entities/RegistrationFields/RegistrationFields";

const Registration = () => {
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
      phone: formatPhoneNumber(data.phone),
    };

    registration(formatedData);
  };

  useEffect(() => {
    if (isRegistrationPending) {
      toast.loading("Загрузка");
    }

    if (isRegistrationError) {
      toast.dismiss();
      if (registrationErrors.email === "taken") {
        toast.error("Этот email уже занят");
      } else {
        toast.error("Ошибка регистрации");
      }
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

        <RegistrationFields control={control} password={password} />

        <Button className={styles.submit} type="submit">
          Регистрация
        </Button>
      </form>
    </Substrate>
  );
};

export default Registration;
