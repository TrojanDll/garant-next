"use client";

import React, { useState } from "react";

import styles from "./CalculatorInputForm.module.scss";
import CustomSelect, { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import Button from "@/components/ui/Button/Button";

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
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [localCorrect, setLocalCorrect] = useState(false)

  const [selectsValues, setSelectsValues] = useState<IOptions[]>(
    new Array(selects.length).fill({ value: "", label: "" })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitClicked(true);

    let correct = true;

    selectsValues.forEach((selectValue) => {
      if (!selectValue.value) {
        correct = false;
      }
    });

    if (correct) {
      setIsCorrectSubmit(true);
      setLocalCorrect(true)
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
          required={select.required ? select.required : false}
          options={select.options as IOptions[]}
          selectedValue={selectsValues[i]?.value}
          setValue={(value) => handleSingleSelect(i, value)}
          isSubmitClicked={isSubmitClicked}
        />
      ))}

      <Button className={`${styles.submit} ${localCorrect ? styles.submitHidden : ""}`} type="submit">
        Рассчитать
      </Button>
    </form>
  );
};

export default CalculatorInputForm;
