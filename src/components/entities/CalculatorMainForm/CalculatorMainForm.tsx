"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CalculatorInputForm from "@/components/features/CalculatorInputForm/CalculatorInputForm";

import styles from "./CalculatorMainForm.module.scss";
import { selectsNSProps, selectsOsagoProps } from "./fields.data";
import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import { useGetCarCategories } from "@/hooks/cars/useGetCarCategories";

export interface ICalculatorMainFormProps {
  variant: "osago" | "ns";
}

const titles = {
  osago: "Полис ОСАГО в Абхазии",
  ns: "Полис от несчастного случая в Абхазии",
};

const CalculatorMainForm = ({ variant }: ICalculatorMainFormProps) => {

  return (
    <Substrate withShadow="light" className={styles.root}>
      <div className={styles.formWrapper}>
        <CustomTitle className={styles.title}>{titles[variant]}</CustomTitle>
        {variant === "osago" ? (
          <CalculatorInputForm variant="osago" config={{ fields: selectsOsagoProps }} />
        ) : (
          <CalculatorInputForm variant="ns" config={{ fields: selectsNSProps }} />
        )}
      </div>

      <div className={styles.imageWrapper}>
        {variant === "osago" ? (
          <Image
            className={`${styles.image} ${styles.osagoImage}`}
            src="/img/calculator-osago-bg.png"
            alt=""
            width={5652}
            height={3001}
            priority
          />
        ) : (
          <Image
            className={`${styles.image} ${styles.nsImage}`}
            src="/img/calculator-ns-bg.png"
            alt=""
            width={6187}
            height={3289}
            priority
          />
        )}
      </div>
    </Substrate>
  );
};

export default CalculatorMainForm;
