"use client";

import React, { useEffect } from "react";

import styles from "./RecoveryEmail.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import CustomLink from "@/components/ui/CustomLink/CustomLink";
import { PAGES } from "@/config/pages-url.config";
import { IRecoveryEmailForm } from "@/types/recovery.types";
import { useRecoveryEmail } from "@/hooks/recovery/useRecoveryEmail";
import toast from "react-hot-toast";

const RecoveryEmail = () => {
  const { handleSubmit, control } = useForm<IRecoveryEmailForm>();
  const { isError, isPending, isSuccess, mutate } = useRecoveryEmail();

  const onSubmit: SubmitHandler<IRecoveryEmailForm> = (data) => {
    console.log(data);
    mutate(data);
  };

  useEffect(() => {
    let isMounted = true;

    if (isPending) {
      toast.loading("Загрузка");
    } else {
      toast.dismiss();
    }

    if (isError && isMounted) {
      toast.dismiss();
      toast.error("Пользователь с такой эл. почтой не зарегистрирован");
    } else if (isSuccess && isMounted) {
      toast.dismiss();
      toast.success("Письмо для восстановления отправлено");
    }

    return () => {
      isMounted = false;
    };
  }, [isPending, isSuccess, isError]);

  return (
    <ContentContainer>
      <Substrate className={styles.substrate}>
        {isSuccess ? (
          <>
            <CustomTitle tag="h1" isCentered className={styles.title}>
              Восстановление пароля
            </CustomTitle>

            <p className={styles.text}>
              На указанный вами Email было отправлено письмо для восстановления пароля{" "}
            </p>

            <CustomLink
              href={PAGES.AUTH}
              className={styles.authLink}
              variant="underline"
              isCentered
            >
              Вернуться ко входу
            </CustomLink>
          </>
        ) : (
          <>
            <CustomTitle tag="h1" isCentered className={styles.title}>
              Восстановление пароля
            </CustomTitle>

            <CustomTitle tag="h2" isCentered className={styles.subtitle}>
              Укажите ваш Email
            </CustomTitle>

            <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Controller<IRecoveryEmailForm, keyof IRecoveryEmailForm>
                name="email"
                control={control}
                rules={{
                  required: "Обязательное поле",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Некорректный email",
                  },
                }}
                render={({ field, fieldState }) => (
                  <CustomInput
                    className={styles.input}
                    name={field.name}
                    setValue={field.onChange}
                    value={field.value as string}
                    displayErrorMessage
                    errorMessage={fieldState.error?.message}
                    placeholder="Email *"
                  />
                )}
              />

              <Button className={styles.submit} type="submit">
                Далее
              </Button>
            </form>

            <CustomLink
              href={PAGES.AUTH}
              className={styles.authLink}
              variant="underline"
              isCentered
            >
              Войти с пароем
            </CustomLink>
          </>
        )}
      </Substrate>
    </ContentContainer>
  );
};

export default RecoveryEmail;
