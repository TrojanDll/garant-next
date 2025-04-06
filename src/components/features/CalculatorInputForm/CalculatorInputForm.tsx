"use client";

import dynamic from "next/dynamic";

import React, { useRef, useState } from "react";

import styles from "./CalculatorInputForm.module.scss";
import CustomSelect, { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import Button from "@/components/ui/Button/Button";

const options = [
  { value: "1", label: "Вариант 1" },
  { value: "2", label: "Вариант 2" },
  { value: "3", label: "Вариант 3" },
];

const CalculatorInputForm = () => {
  const [carCategoryValue, setCarCategoryValue] = useState<IOptions>();
  const [durationOfStay, setDurationOfStay] = useState<IOptions>();
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);

  console.log("carCategoryValue");
  console.log(carCategoryValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitClicked(true);
    console.log(carCategoryValue);
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)} action="">
      <CustomSelect
        className={styles.select}
        name="car_category"
        placeholder="Выберите категорию ТС"
        label="Категория ТС"
        required={true}
        options={options}
        selectedValue={carCategoryValue?.value}
        setValue={(value) => setCarCategoryValue(value)}
        isSubmitClicked={isSubmitClicked}
      />

      <CustomSelect
        className={styles.select}
        name="duration_of_stay"
        placeholder="Выберите срок пребывания"
        label="Выберите срок пребывания"
        required={true}
        options={options}
        selectedValue={durationOfStay?.value}
        setValue={(value) => setDurationOfStay(value)}
        isSubmitClicked={isSubmitClicked}
      />

      <Button className={styles.submit} type="submit">
        Рассчитать
      </Button>
    </form>
  );
};

export default CalculatorInputForm;
