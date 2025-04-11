"use client";

import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ru } from "date-fns/locale";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";
import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";

import { IOsagoApplyForm } from "@/types/IOsagoApplyForm";

import getOsagoApplyFields, { ISplitFieldConfig } from "@/helpers/getOsagoApplyFields.helper";
import InputsSelector from "@/components/ui/InputsSelector/InputsSelector";

import styles from "./OsagoApply.module.scss";
import ButtonGroup from "@/components/ui/ButtonGroup/ButtonGroup";
import { DayPicker } from "react-day-picker";
import CustomChevron from "@/components/ui/CustomChevron/CustomChevron";
import DynamicFormSection from "@/components/entities/DynamicFormSection/DynamicFormSection";

const OsagoApply = () => {
  const [inputsConfig, setInputsConfig] = useState<ISplitFieldConfig>({});
  const { handleSubmit, control, reset } = useForm<IOsagoApplyForm>({
    defaultValues: {
      vehicle_category: "",
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
    console.log(data);
    // reset();
  };

  useEffect(() => {
    async function fetchConfig() {
      const inputsConfigData: ISplitFieldConfig = await getOsagoApplyFields();
      setInputsConfig(inputsConfigData);
    }

    fetchConfig();
  }, []);

  const renderedVehicleInputs = (
    <>
      {inputsConfig.vehicle &&
        inputsConfig.vehicle.map((config, i) => (
          <div
            key={config.name}
            className={`${i === 0 ? styles.singleInStroke : styles.partial} ${styles.inputWrapper}`}
          >
            <Controller
              name={config.name}
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field, fieldState }) => (
                <InputsSelector
                  type={config.type}
                  name={field.name}
                  options={config.options as IOptions[]}
                  label={config.label}
                  placeholder={config.placeholder}
                  required={config.required}
                  key={config.name}
                  value={field.value}
                  setValue={(value: string) => field.onChange(value)}
                  errorMessage={fieldState.error?.message}
                  className={`${styles.input} ${
                    i === 0 ? styles.inputSingleInStroke : styles.inputPartial
                  }`}
                />
              )}
            />
          </div>
        ))}
    </>
  );

  const renderedOwnerInputs = (
    <>
      {inputsConfig.owner &&
        inputsConfig.owner.map((config, i) => (
          <div
            key={config.name}
            className={`${i === 0 ? styles.singleInStroke : styles.partial} ${styles.inputWrapper}`}
          >
            <Controller
              name={config.name}
              control={control}
              render={({ field, fieldState }) => (
                <InputsSelector
                  buttonGroupType="small"
                  type={config.type}
                  name={field.name}
                  options={config.options as IOptions[]}
                  label={config.label}
                  placeholder={config.placeholder}
                  required={config.required}
                  key={config.name}
                  value={field.value}
                  setValue={(value: string) => field.onChange(value)}
                  errorMessage={fieldState.error?.message}
                  buttons={config.buttons}
                  className={`${styles.input} ${
                    i === 0 ? styles.inputSingleInStroke : styles.inputPartial
                  }`}
                />
              )}
            />
          </div>
        ))}
    </>
  );

  const renderedDurationOfstayInputs = (
    <>
      {inputsConfig.duration &&
        inputsConfig.duration.map((config, i) => (
          <div
            key={config.name}
            className={`${i === 0 ? styles.singleInStroke : styles.partial} ${styles.inputWrapper}`}
          >
            <Controller
              name={config.name}
              control={control}
              render={({ field, fieldState }) => (
                <InputsSelector
                  buttonGroupType="small"
                  type={config.type}
                  name={field.name}
                  options={config.options as IOptions[]}
                  label={config.label}
                  placeholder={config.placeholder}
                  required={config.required}
                  key={config.name}
                  value={field.value}
                  setValue={(value: string) => field.onChange(value)}
                  errorMessage={fieldState.error?.message}
                  buttons={config.buttons}
                  className={`${styles.input} ${
                    i === 0 ? styles.inputSingleInStroke : styles.inputPartial
                  }`}
                />
              )}
            />
          </div>
        ))}
    </>
  );

  const [selected, setSelected] = useState<Date>();

  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис ОСАГО в Абхазии
        </CustomTitle>

        <Substrate withShadow="light" className={styles.substrate}>
          <form noValidate onSubmit={handleSubmit(onSubmit)} action="">
            <div className={styles.section}>
              <CustomTitle tag="h2">Транспортное средство</CustomTitle>
              <div className={styles.inputsWrapper}>
                {inputsConfig.vehicle ? (
                  <DynamicFormSection
                    fields={inputsConfig.vehicle}
                    control={control}
                    className={styles.input}
                    isTopItemSingle
                  />
                ) : (
                  <div>loading...</div>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <CustomTitle tag="h2" className={styles.sectionTitle}>
                Собственник
              </CustomTitle>
              <div className={styles.inputsWrapper}>
                {inputsConfig.owner ? (
                  <DynamicFormSection
                    fields={inputsConfig.owner}
                    control={control}
                    isTopItemSingle
                  />
                ) : (
                  <div>loading...</div>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <CustomTitle tag="h2" className={styles.sectionTitle}>
                Срок пребывания
              </CustomTitle>
              <div className={styles.inputsWrapper}>
                {inputsConfig.duration ? (
                  <DynamicFormSection fields={inputsConfig.duration} control={control} />
                ) : (
                  <div>loading...</div>
                )}
              </div>
            </div>

            <Button type="submit">submit</Button>
          </form>
          <DayPicker
            locale={ru}
            animate
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."}
            components={{
              Chevron: CustomChevron,
            }}
          />
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default OsagoApply;
