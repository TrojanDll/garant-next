import React from "react";

import styles from "./EditUserFields.module.scss";

import CustomInput from "@/components/ui/CustomInput/CustomInput";
import { IEditUserForm } from "@/types/user.types";
import { Control, Controller } from "react-hook-form";
import { editUserFields } from "./fields.data";

interface IProps {
  control: Control<IEditUserForm, any, IEditUserForm> | undefined;
}

const EditUserFields = ({ control }: IProps) => {
  return (
    <>
      {editUserFields.map((config) => {
        const isEmail = config.name === "email";
        const isPhone = config.name === "phone";

        return (
          <Controller<IEditUserForm, keyof IEditUserForm>
            key={config.name}
            name={config.name}
            control={control}
            rules={{
              ...(isEmail && {
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Некорректный email",
                },
              }),
              // ...(isPhone && {
              //   pattern: {
              //     value: /^(\+7|7|8)?\d{10}$/,
              //     message: "Неверный формат номера",
              //   },
              // }),
            }}
            render={({ field, fieldState }) => (
              <CustomInput
                className={styles.input}
                name={field.name}
                setValue={field.onChange}
                value={field.value as string}
                errorMessage={fieldState.error?.message}
                placeholder={config.placeholder}
                label={config.label}
                displayErrorMessage={true}
                inputType={config.inputType}
              />
            )}
          />
        );
      })}
    </>
  );
};

export default EditUserFields;
