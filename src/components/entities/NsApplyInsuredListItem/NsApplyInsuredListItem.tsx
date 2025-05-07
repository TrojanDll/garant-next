import React from "react";

import styles from "./NsApplyInsuredListItem.module.scss";

import { EGenders, ICreateNsPolicyRequest } from "@/types/policy.types";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import ButtonGroup, {
  TButtonGroupRequest,
} from "@/components/ui/ButtonGroup/ButtonGroup";

interface IProps {
  control: Control<ICreateNsPolicyRequest, any, ICreateNsPolicyRequest>;
  itemIndex: number;
  removeItem: () => void;
  id: string;
}

const NsApplyInsuredListItem = ({ control, itemIndex, removeItem, id }: IProps) => {
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
      <CustomTitle tag="h2">Застрахованный {++itemIndex}</CustomTitle>

      <div className={styles.fieldsRow}>
        <Controller
          control={control}
          key={`insured.fio.${id}`}
          name={`insured.${itemIndex}.fio`}
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field: fieldRender, fieldState }) => (
            <CustomInput
              className={styles.input}
              name={fieldRender.name}
              setValue={fieldRender.onChange}
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
            render={({ field: fieldRender, fieldState }) => (
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
              setValue={fieldRender.onChange}
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
              setValue={fieldRender.onChange}
              value={fieldRender.value}
              errorMessage={fieldState.error?.message}
              label="Серия и номер паспорта"
              placeholder="Введите поле"
            />
          )}
        />
      </div>

      <button type="button" onClick={removeItem}>
        Удалить
      </button>
    </div>
  );
};

export default NsApplyInsuredListItem;
