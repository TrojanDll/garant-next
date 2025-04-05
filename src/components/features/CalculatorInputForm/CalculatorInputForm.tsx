"use client";

import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

import React, { useRef } from "react";

import styles from "./CalculatorInputForm.module.scss";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const CalculatorInputForm = () => {
  return (
    <Select
      placeholder="Выберите категорию ТС"
      classNames={{
        control: () => styles.control,
        placeholder: () => styles.placeholder
      }}
      options={options}
    />
  );
};

export default CalculatorInputForm;
