"use client";

import React, { useEffect, useState } from "react";
import { ChangeHandler, Controller, SubmitHandler, useForm } from "react-hook-form";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";
import CustomSelect, { IOptions } from "@/components/ui/CustomSelect/CustomSelect";

import { IOsagoApplyForm } from "@/types/IOsagoApplyForm";
import { IFieldConfig } from "@/types/IFieldConfig";

import styles from "./OsagoApply.module.scss";
import getOsagoApplyFields, { ISplitFieldConfig } from "@/helpers/getOsagoApplyFields.helper";

const OsagoApply = () => {
  const [inputsConfig, setInputsConfig] = useState<ISplitFieldConfig>({});
  const { handleSubmit, control, reset } = useForm<IOsagoApplyForm>({
    defaultValues: {
      vehicle_category: "",
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
    console.log(data["vehicle_category"]);
    reset();
  };

  useEffect(() => {
    async function fetchConfig() {
      const inputsConfigData: ISplitFieldConfig = await getOsagoApplyFields();
      console.log(inputsConfigData.vehicle);

      setInputsConfig(inputsConfigData);
    }

    fetchConfig();
  }, []);

  // Вынести в отдельный файл выбор между select, input
  const renderedVehicleInputs = (
    <>
      {inputsConfig.vehicle.map((config) => (
        <Controller
          name={config.name}
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field, fieldState }) => (
            <CustomSelect
              name={field.name}
              options={config.options as IOptions[]}
              label={config.label}
              placeholder={config.placeholder}
              required={config.required}
              key={config.name}
              selectedValue={field.value}
              setValue={(value: IOptions) => field.onChange(value)}
              errorMessage={fieldState.error?.message}
              className={styles.input}
            />
          )}
        />
      ))}
    </>
  );

  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис ОСАГО в Абхазии
        </CustomTitle>

        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2">Транспортное средство</CustomTitle>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div className={styles.inputsWrapper}>
              {inputsConfig.vehicle ? renderedVehicleInputs : <div>loading...</div>}
            </div>
            <Button type="submit">submit</Button>
          </form>
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default OsagoApply;
