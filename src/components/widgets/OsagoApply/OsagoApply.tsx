"use client";

import React, { useState } from "react";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";

import styles from "./OsagoApply.module.scss";
import CustomSelect, { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import { ISelectsProps } from "@/components/features/CalculatorInputForm/CalculatorInputForm";

const selects: ISelectsProps[] = [
  {
    name: "osago_ts_category",
    label: "Категория ТС",
    options: [
      {
        label: "Option 1",
        value: "Option 1",
      },
    ],
  },
];

const OsagoApply = () => {
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [localCorrect, setLocalCorrect] = useState(false);

  const [selectsValues, setSelectsValues] = useState<IOptions[]>(
    new Array(selects.length).fill({ value: "", label: "" })
  );

  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис ОСАГО в Абхазии
        </CustomTitle>

        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2">Транспортное средство</CustomTitle>

          <div className={styles.inputsWrapper}>{/* <CustomSelect name="osago"/> */}</div>
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default OsagoApply;
