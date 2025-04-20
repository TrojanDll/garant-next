"use client";

import React, { useEffect } from "react";

import styles from "./EditPersonalData.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import { SubmitHandler, useForm } from "react-hook-form";
import { IEditUserForm } from "@/types/user.types";
import EditUserFields from "@/components/entities/EditUserFields/EditUserFields";
import Button from "@/components/ui/Button/Button";
import { useGetCurrientUser } from "@/hooks/user/useGetCurrientUser";
import {
  formatPhoneNumber,
  formatPhoneNumberToClient,
} from "@/helpers/user/formatPhoneNumber.helper";
import { useEditCurrientUser } from "@/hooks/user/useEditCurrientUser";
import toast from "react-hot-toast";
import { useNavigation } from "@/hooks/navigation/useNavigation";

function pickFormData(userData: any): IEditUserForm {
  return {
    name: userData.name,
    surname: userData.surname,
    patronymic: userData.patronymic,
    email: userData.email,
    phone: formatPhoneNumberToClient(userData.phone),
    date_of_birth: userData.date_of_birth,
  };
}

const EditPersonalData = () => {
  const { handleSubmit, control, reset } = useForm<IEditUserForm>();
  const { isSuccess, userData, isLoading, isError } = useGetCurrientUser();
  const {
    isSuccess: isEditCurrientUserSuccess,
    mutate,
    isError: isEditCurrientUserError,
    isPending,
  } = useEditCurrientUser();

  const { navigateToDashboard } = useNavigation();

  const onSubmit: SubmitHandler<IEditUserForm> = (data) => {
    console.log(data);

    const formatedPhone = formatPhoneNumber(data.phone);
    const formatedDateOfBirth = data.date_of_birth ? data.date_of_birth : "";
    mutate({ ...data, phone: formatedPhone, date_of_birth: formatedDateOfBirth });
  };

  useEffect(() => {
    if (isSuccess && userData) {
      const pickedData = pickFormData(userData);
      reset(pickedData);
    }
  }, [isSuccess, userData]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Загрузка");
    }

    if (isError) {
      toast.dismiss();
      toast.error("Ошибка");
    } else if (isSuccess) {
      toast.dismiss();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isPending) {
      toast.loading("Загрузка");
    }

    if (isEditCurrientUserError) {
      toast.dismiss();
      toast.error("Ошибка");
    } else if (isEditCurrientUserSuccess) {
      toast.dismiss();
      toast.success("Данные изменены");

      setTimeout(() => {
        navigateToDashboard();
      }, 300);
    }
  }, [isPending]);

  return (
    <div>
      <CustomTitle tag="h1" isCentered>
        Изменить личные данные
      </CustomTitle>

      <Substrate withShadow="light" className={styles.substrate}>
        <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
          <EditUserFields control={control} />

          <Button type="submit" className={styles.submit}>
            Сохранить
          </Button>
        </form>
      </Substrate>
    </div>
  );
};

export default EditPersonalData;
