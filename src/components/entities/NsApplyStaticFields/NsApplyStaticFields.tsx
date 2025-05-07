import React from "react";

import styles from "./NsApplyStaticFields.module.scss";

import { Control, Controller } from "react-hook-form";
import { ICreateNsPolicyRequest } from "@/types/policy.types";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CustomSelect from "@/components/ui/CustomSelect/CustomSelect";
import { durationOfStayListItems } from "./fields.data";
import CustomInput from "@/components/ui/CustomInput/CustomInput";

interface IProps {
  control: Control<ICreateNsPolicyRequest, any, ICreateNsPolicyRequest>;
}

const NsApplyStaticFields = ({ control }: IProps) => {
  return (
    <div className={styles.root}>
      <CustomTitle>Срок пребывания</CustomTitle>
      <div className={styles.fieldsRow}>
        <Controller
          control={control}
          key="NsApply_duration_of_stay"
          name="duration_of_stay"
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field, fieldState }) => (
            <CustomSelect
              isSearchable={false}
              key={field.name}
              className={styles.input}
              name={field.name}
              placeholder="Длительность пребывания"
              label="Длительность пребывания"
              required={true}
              options={durationOfStayListItems}
              selectedValue={field.value}
              setValue={field.onChange}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          key="NsApply_start_date"
          name="start_date"
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field, fieldState }) => (
            <CustomInput
              className={styles.input}
              name={field.name}
              setValue={field.onChange}
              value={field.value}
              errorMessage={fieldState.error?.message}
              label="Дата начала"
              placeholder="Выберите дату"
              inputType="date"
            />
          )}
        />
      </div>

      <Controller
        control={control}
        key="NsApply_promocode"
        name="promocode"
        render={({ field, fieldState }) => (
          <CustomInput
            className={styles.promocodeInput}
            name={field.name}
            setValue={field.onChange}
            value={field.value}
            errorMessage={fieldState.error?.message}
            label="Дата начала"
            placeholder="Выберите дату"
            inputType="promocode"
          />
        )}
      />
    </div>
  );
};

export default NsApplyStaticFields;
