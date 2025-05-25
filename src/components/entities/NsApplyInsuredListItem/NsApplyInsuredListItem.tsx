import React from "react";

import styles from "./NsApplyInsuredListItem.module.scss";

import { EGenders, ICreateNsPolicyRequest } from "@/types/policy.types";
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFormClearErrors,
} from "react-hook-form";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import ButtonGroup, {
  TButtonGroupRequest,
} from "@/components/ui/ButtonGroup/ButtonGroup";

interface IProps {
  control: Control<ICreateNsPolicyRequest, any, ICreateNsPolicyRequest>;
  itemIndex: number;
  removeItem: () => void;
  field: FieldArrayWithId<ICreateNsPolicyRequest, "insured", "id">;
  clearErrors?: UseFormClearErrors<ICreateNsPolicyRequest>;
}

const NsApplyInsuredListItem = ({
  control,
  itemIndex,
  removeItem,
  field,
  clearErrors,
}: IProps) => {
  function handleChangeButtonGroup(
    buttonGroupRequest: TButtonGroupRequest,
    onChange: (...event: any[]) => void
  ) {
    if (
      buttonGroupRequest.value === EGenders.MAN ||
      buttonGroupRequest.value === EGenders.WOMAN
    ) {
      onChange(buttonGroupRequest.value);
    } else {
      onChange(EGenders.MAN);
    }
  }

  return (
    <div className={styles.root}>
      <CustomTitle tag="h2">Застрахованный {itemIndex + 1}</CustomTitle>

      <div className={styles.fieldsRow}>
        <Controller
          control={control}
          key={`insured.fio.${itemIndex}`}
          name={`insured.${itemIndex}.fio`}
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field: fieldRender, fieldState }) => (
            <CustomInput
              className={styles.input}
              name={fieldRender.name}
              setValue={(value) => {
                if (clearErrors) {
                  clearErrors(fieldRender.name);
                }
                fieldRender.onChange(value);
              }}
              value={fieldRender.value}
              errorMessage={fieldState.error?.message}
              placeholder="Введите поле"
              label="ФИО"
            />
          )}
        />

        <div className={styles.inputWrapper}>
          <Controller
            control={control}
            key={`insured.gender.${itemIndex}`}
            name={`insured.${itemIndex}.gender`}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field: fieldRender }) => (
              <ButtonGroup
                items={[EGenders.MAN, EGenders.WOMAN]}
                defaultActiveIndex={0}
                name={fieldRender.name}
                onButtonClick={(value: TButtonGroupRequest) =>
                  handleChangeButtonGroup(value, fieldRender.onChange)
                }
                groupType="small"
                isEquals={false}
              />
            )}
          />
        </div>
      </div>

      <div className={styles.fieldsRow}>
        <Controller
          control={control}
          key={`insured.date_of_birth.${itemIndex}`}
          name={`insured.${itemIndex}.date_of_birth`}
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field: fieldRender, fieldState }) => (
            <CustomInput
              className={styles.input}
              name={fieldRender.name}
              setValue={(value) => {
                if (clearErrors) {
                  clearErrors(fieldRender.name);
                }
                fieldRender.onChange(value);
              }}
              value={fieldRender.value}
              errorMessage={fieldState.error?.message}
              label="Дата рождения"
              placeholder="Выберите дату"
              inputType="date"
            />
          )}
        />

        <Controller
          control={control}
          key={`insured.passport_number.${itemIndex}`}
          name={`insured.${itemIndex}.passport_number`}
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field: fieldRender, fieldState }) => (
            <CustomInput
              className={styles.input}
              name={fieldRender.name}
              setValue={(value) => {
                if (clearErrors) {
                  clearErrors(fieldRender.name);
                }
                fieldRender.onChange(value);
              }}
              value={fieldRender.value}
              errorMessage={fieldState.error?.message}
              label="Серия и номер паспорта"
              placeholder="Введите поле"
            />
          )}
        />
      </div>

      {itemIndex !== 0 && (
        <button type="button" onClick={removeItem} className={styles.removeButton}>
          Удалить
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.8125 5H2.1875C1.8725 5 1.625 4.7525 1.625 4.4375C1.625 4.1225 1.8725 3.875 2.1875 3.875H16.8125C17.1275 3.875 17.375 4.1225 17.375 4.4375C17.375 4.7525 17.1275 5 16.8125 5Z"
              fill="#FF4343"
            />
            <path
              d="M12.8975 4.78627L12.4025 3.14377C12.3684 3.02693 12.2973 2.92429 12.2 2.85127C12.1026 2.77824 11.9842 2.73877 11.8625 2.73877H7.13746C7.01575 2.73877 6.89733 2.77824 6.79996 2.85127C6.70259 2.92429 6.63154 3.02693 6.59746 3.14377L6.10246 4.78627L5.02246 4.46002L5.51746 2.81752C5.73121 2.09752 6.38371 1.61377 7.13746 1.61377H11.8625C12.6162 1.61377 13.2575 2.09752 13.4825 2.81752L13.9775 4.46002L12.8975 4.78627Z"
              fill="#FF4343"
            />
            <path
              d="M13.4715 17.375H5.52898C4.61773 17.375 3.87523 16.6549 3.84148 15.7437L3.45898 4.63995L4.58398 4.6062L4.96648 15.71C4.96648 16.0137 5.22523 16.25 5.52898 16.25H13.4827C13.7865 16.25 14.034 16.0137 14.0452 15.71L14.4277 4.6062L15.5527 4.63995L15.1702 15.7437C15.1365 16.6549 14.394 17.375 13.4827 17.375H13.4715Z"
              fill="#FF4343"
            />
            <path
              d="M7.8125 13.5725C7.4975 13.5725 7.25 13.325 7.25 13.01V8.51001C7.25 8.19501 7.4975 7.94751 7.8125 7.94751C8.1275 7.94751 8.375 8.19501 8.375 8.51001V13.01C8.375 13.325 8.1275 13.5725 7.8125 13.5725ZM11.1875 13.5725C10.8725 13.5725 10.625 13.325 10.625 13.01V8.51001C10.625 8.19501 10.8725 7.94751 11.1875 7.94751C11.5025 7.94751 11.75 8.19501 11.75 8.51001V13.01C11.75 13.325 11.5025 13.5725 11.1875 13.5725Z"
              fill="#FF4343"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default NsApplyInsuredListItem;
