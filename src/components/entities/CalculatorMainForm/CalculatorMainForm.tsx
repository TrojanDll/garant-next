"use client";

import React, { useState } from "react";
import Image from "next/image";

import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { ISelectsProps } from "@/components/features/CalculatorInputForm/CalculatorInputForm";
import CalculatorPolicyPrice from "@/components/features/CalculatorPolicyPrice/CalculatorPolicyPrice";
import CalculatorInputForm from "@/components/features/CalculatorInputForm/CalculatorInputForm";

import styles from "./CalculatorMainForm.module.scss";
import { IFieldConfig } from "@/types/IFieldConfig";

export interface ICalculatorMainFormProps {
  variant: "osago" | "ns";
}

const titles = {
  osago: "Полис ОСАГО в Абхазии",
  ns: "Полис от несчастного случая в Абхазии",
};

const selectsOsagoProps: IFieldConfig[] = [
  {
    type: "select",
    name: "car_category",
    label: "Категория ТС",
    placeholder: "Выберите категорию ТС",
    required: true,
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
    type: "select",
    name: "duration_of_stay_osago",
    label: "Выберите срок пребывания",
    placeholder: "Выберите срок пребывания",
    required: true,
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

const selectsNSProps: IFieldConfig[] = [
  {
    type: "select",
    name: "number_of_people",
    label: "Количество человек",
    placeholder: "Количество человек",
    required: true,
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
    type: "select",
    name: "duration_of_stay_ns",
    label: "Выберите срок пребывания",
    placeholder: "Выберите срок пребывания",
    required: true,
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

const CalculatorMainForm = ({ variant }: ICalculatorMainFormProps) => {
  const [isCorrectSubmit, setIsCorrectSubmit] = useState(false);

  return (
    <Substrate withShadow="light" className={styles.root}>
      <div className={styles.formWrapper}>
        <CustomTitle className={styles.title}>{titles[variant]}</CustomTitle>
        {variant === "osago" ? (
          <CalculatorInputForm config={{ fields: selectsOsagoProps }} />
        ) : (
          <CalculatorInputForm config={{ fields: selectsOsagoProps }} />

        )}
        {isCorrectSubmit && (
          <CalculatorPolicyPrice className={styles.price} policyType={variant} price={1000} />
        )}
      </div>

      <div className={styles.imageWrapper}>
        {variant === "osago" ? (
          <Image
            className={styles.image}
            src="/img/calculator-osago-bg.png"
            alt=""
            width={840}
            height={520}
            priority
          />
        ) : (
          <Image
            className={styles.image}
            src="/img/calculator-ns-bg.png"
            alt=""
            width={840}
            height={520}
            priority
          />
        )}
      </div>
    </Substrate>
  );
};

export default CalculatorMainForm;
