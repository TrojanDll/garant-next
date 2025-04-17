"use client";

import Substrate from "@/components/ui/Substrate/Substrate";
import React from "react";

import styles from "./Registration.module.scss";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegistrationForm } from "@/types/auth.types";

const Registration = () => {
  const { handleSubmit, control } = useForm<IRegistrationForm>();

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    console.log(data);
  };

  return (
    <Substrate className={styles.substrate}>
      <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
        <CustomTitle tag="h1" isCentered className={styles.title}>
          Регистрация нового пользователя
        </CustomTitle>
      </form>
    </Substrate>
  );
};

export default Registration;
