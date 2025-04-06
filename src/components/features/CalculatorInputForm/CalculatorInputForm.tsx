"use client";

import React, { useState } from "react";

import styles from "./CalculatorInputForm.module.scss";
import CustomSelect, { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import Button from "@/components/ui/Button/Button";

const options = [
  { value: "1", label: "Вариант 1" },
  { value: "2", label: "Вариант 2" },
  { value: "3", label: "Вариант 3" },
];

interface IProps {
  setIsCorrectSubmit: (value: boolean) => void;
  selects: ISelectsProps[];
}

export interface ISelectsProps {
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  options?: IOptions[];
}

const CalculatorInputForm = ({ setIsCorrectSubmit, selects }: IProps) => {
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);

  const [selectsValues, setSelectsValues] = useState<IOptions[]>(
    new Array(selects.length).fill("")
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitClicked(true);

    let correct = true;

    selectsValues.forEach((selectValue) => {
      if (!selectValue.value.length) {
        correct = false;
      }
    });

    if (correct) {
      setIsCorrectSubmit(true);
    }
  };

  const handleSingleSelect = (index: number, newValue: IOptions) => {
    setSelectsValues((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = newValue;
      return newArray;
    });
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)} action="">
      {selects.map((select, i) => (
        <CustomSelect
          key={select.name}
          className={styles.select}
          name={select.name}
          placeholder={select.placeholder}
          label={select.label}
          required={select.required}
          options={select.options as IOptions[]}
          selectedValue={selectsValues[i]?.value}
          setValue={(value) => handleSingleSelect(i, value)}
          isSubmitClicked={isSubmitClicked}
        />
      ))}
      {/* <CustomSelect
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
      /> */}

      <Button className={styles.submit} type="submit">
        Рассчитать
      </Button>
    </form>
  );
};

export default CalculatorInputForm;
