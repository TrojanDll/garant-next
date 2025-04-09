"use client";

import React, { useEffect, useState } from "react";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";

import styles from "./OsagoApply.module.scss";
import CustomSelect, { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import { ISelectsProps } from "@/components/features/CalculatorInputForm/CalculatorInputForm";
import { ChangeHandler, Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button/Button";
import { IOsagoApplyForm } from "@/types/IOsagoApplyForm";

const carCategoryParams: ISelectsProps = {
  name: "car_category",
  label: "Категория ТС",
  placeholder: "Категория ТС",
  options: [
    {
      label: "Option 1",
      value: "Option 1",
    },
    {
      label: "Option 2",
      value: "Option 2",
    },
  ],
};

const OsagoApply = () => {
  // const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  // const [localCorrect, setLocalCorrect] = useState(false);

  // const [selectsValues, setSelectsValues] = useState<IOptions[]>(
  //   new Array(selects.length).fill({ value: "", label: "" })
  // );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<IOsagoApplyForm>({
    defaultValues: {
      car_category: "",
    },
  });

  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
    console.log(data["car_category"]);
    reset();
  };

  const onChangeField = (data: string) => {
    console.log(data);
  };

  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис ОСАГО в Абхазии
        </CustomTitle>

        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2">Транспортное средство</CustomTitle>

          <div className={styles.inputsWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <Controller
                name="car_category"
                control={control}
                rules={{ required: "ОБЯЗАТЕЛЬНО" }}
                render={({ field, fieldState }) => (
                  <>
                    <CustomSelect
                      name={field.name}
                      options={carCategoryParams.options as IOptions[]}
                      placeholder={carCategoryParams.placeholder}
                      required={carCategoryParams.required}
                      key={carCategoryParams.name}
                      selectedValue={field.value}
                      setValue={(value: IOptions) => field.onChange(value)}
                      errorMessage={fieldState.error?.message}
                    />
                    {fieldState.error?.message}
                  </>
                )}
              />
              <Button type="submit">submit</Button>
            </form>
          </div>
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default OsagoApply;
