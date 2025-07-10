"use client";

import React, { useEffect, useState } from "react";

import styles from "./RecoveryPassword.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Text from "@/components/ui/Text/Text";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IRecoveryPasswordApiData,
  IRecoveryPasswordForm,
} from "@/types/recovery.types";
import RecoveryPasswordFields from "@/components/entities/RecoveryPasswordFields/RecoveryPasswordFields";
import Button from "@/components/ui/Button/Button";
import { useParams, useSearchParams } from "next/navigation";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import { useRecoveryPassword } from "@/hooks/recovery/useRecoveryPassword";
import toast from "react-hot-toast";
import { useNavigation } from "@/hooks/navigation/useNavigation";

const RecoveryPassword = () => {
  const { handleSubmit, control, watch } = useForm<IRecoveryPasswordForm>();
  const { isError, isPending, isSuccess, mutate } = useRecoveryPassword();
  const { navigateToAuth } = useNavigation();
  const params = useSearchParams();

  const [emailParams, setEmailParams] = useState<string | null>(null);
  const [tokenParams, setTokenParams] = useState<string | null>(null);

  useEffect(() => {
    setEmailParams(params.get("email"));
    setTokenParams(params.get("token"));
  }, []);

  const onSubmit: SubmitHandler<IRecoveryPasswordForm> = (data) => {
    const formatedData: IRecoveryPasswordApiData = {
      ...data,
      email: emailParams ? emailParams : "",
      token: tokenParams ? tokenParams : "",
    };
    console.log(formatedData);
    mutate(formatedData);
  };

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    if (isPending) {
      toast.loading("Загрузка");
    } else {
      toast.dismiss();
    }

    if (isError && isMounted) {
      toast.dismiss();
      toast.error("Ошибка восстановления пароля");
    } else if (isSuccess && isMounted) {
      toast.dismiss();
      toast.success("Пароль изменён");

      timeoutId = setTimeout(() => {
        navigateToAuth();
      }, 700);
    }

    return () => {
      isMounted = false;

      clearTimeout(timeoutId);
    };
  }, [isPending, isSuccess, isError]);

  const password = watch("password");

  return (
    <ContentContainer>
      <Substrate
        withShadow="light"
        widthType="window"
        className={styles.substrate}
      >
        <CustomTitle tag="h1" isCentered type="small" className={styles.title}>
          Создайте новый пароль
        </CustomTitle>

        <Text isCentered className={styles.text}>
          Придумайте новый пароль для восстановления доступа
        </Text>

        <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
          <RecoveryPasswordFields password={password} control={control} />

          <Button className={styles.submit} type="submit">
            Сменить пароль
          </Button>
        </form>
      </Substrate>
    </ContentContainer>
  );
};

export default RecoveryPassword;
