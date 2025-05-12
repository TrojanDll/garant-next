"use client";

import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRegistration } from "@/hooks/auth/useRegistration";

import { IRegistrationForm } from "@/types/auth.types";

import { formatPhoneNumber } from "@/helpers/user/formatPhoneNumber.helper";

import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Button from "@/components/ui/Button/Button";
import RegistrationFields from "@/components/entities/RegistrationFields/RegistrationFields";

import styles from "./Registration.module.scss";
import EmailConfirmation from "@/components/entities/EmailConfirmation/EmailConfirmation";

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

    console.log(formatedData);

    registration(formatedData);
  };

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
    }

    return () => {
      isMounted = false;
    };
  }, [isRegistrationPending, isRegistrationError, isRegistrationSuccess]);

  return (
    <Substrate className={styles.substrate}>
      {isRegistrationSuccess ? (
        <EmailConfirmation />
      ) : (
        <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
          <CustomTitle tag="h1" isCentered className={styles.title}>
            Регистрация нового пользователя
          </CustomTitle>

          <RegistrationFields control={control} password={password} />

          <Button className={styles.submit} type="submit">
            Регистрация
          </Button>
        </form>
      )}
    </Substrate>
  );
};

export default Registration;
