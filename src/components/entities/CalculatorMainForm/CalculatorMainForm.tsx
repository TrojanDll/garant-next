"use client";

import Substrate from "@/components/ui/Substrate/Substrate";
import React, { useState } from "react";
import styles from "./CalculatorMainForm.module.scss";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { ISelectsProps } from "@/components/features/CalculatorInputForm/CalculatorInputForm";
import CalculatorInputNSForm from "@/components/features/CalculatorInputNSForm/CalculatorInputNSForm";
import CalculatorPolicyPrice from "@/components/features/CalculatorPolicyPrice/CalculatorPolicyPrice";
import CalculatorInputForm from "@/components/features/CalculatorInputForm/CalculatorInputForm";

interface IProps {
  variant: "osago" | "ns";
}

const titles = {
  osago: "Полис ОСАГО в Абхазии",
  ns: "Полис от несчастного случая в Абхазии",
};

const selectsProps: ISelectsProps[] = [
  {
    name: "car_category",
    label: "qwer",
    placeholder: "Выберите категорию ТС",
    options: [
      {
        label: "aboba 1",
        value: "aboba 1",
      },
      {
        label: "aboba 2",
        value: "aboba 2",
      },
      {
        label: "aboba 3",
        value: "aboba 3",
      },
    ],
  },
  {
    name: "duration_of_stay",
    label: "uurt",
    placeholder: "Выберите срок пребывания",
    options: [
      {
        label: "aboba 1",
        value: "aboba 1",
      },
      {
        label: "aboba 2",
        value: "aboba 2",
      },
      {
        label: "aboba 3",
        value: "aboba 3",
      },
    ],
  },
];

const CalculatorMainForm = ({ variant }: IProps) => {
  const [isCorrectSubmit, setIsCorrectSubmit] = useState(false);

  return (
    <Substrate className={styles.root}>
      <div className={styles.formWrapper}>
        <CustomTitle className={styles.title}>{titles[variant]}</CustomTitle>
        {variant === "osago" ? (
          <CalculatorInputForm
            setIsCorrectSubmit={(value: boolean) => setIsCorrectSubmit(value)}
            selects={selectsProps}
          />
        ) : (
          <CalculatorInputNSForm />
        )}
        {isCorrectSubmit && <CalculatorPolicyPrice price={1000} />}
      </div>
    </Substrate>
  );
};

export default CalculatorMainForm;
