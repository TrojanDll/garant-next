"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { TInputType } from "@/types/IFieldConfig";
import InputAsideElement from "../InputAsideElement/InputAsideElement";

import styles from "./CustomInput.module.scss";
import Calendar from "../Calendar/Calendar";

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  setValue: (value: string) => void;
  errorMessage?: string;
  className?: string;
  isError?: boolean;
  inputType?: TInputType;
}

const CustomInput = ({
  name,
  label,
  placeholder,
  required,
  value,
  setValue,
  className,
  isError,
  errorMessage,
  inputType = "text",
}: IProps) => {
  const [selected, setSelected] = useState<Date>();
  const [isCalendarOpened, setIsCalendarOpened] = useState(false);

  useEffect(() => {
    setIsCalendarOpened(false);
  }, [selected]);

  const handleInputClick = () => {
    setIsCalendarOpened(!isCalendarOpened);
  };

  const isErrorMessage: boolean = !!errorMessage?.length;

  const isPointer = inputType === "date" ? true : false;

  return (
    <div className={`${className} ${styles.root}`}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          onClick={isPointer ? handleInputClick : undefined}
          readOnly={isPointer}
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          required={required}
          value={value ? value : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          className={` ${isErrorMessage ? styles.error : ""} ${styles.input} ${
            isPointer ? styles.pointer : ""
          }`}
        />
        <InputAsideElement className={styles.asideElement} inputType={inputType} />
      </div>

      {inputType === "date" && isCalendarOpened && (
        <Calendar className={styles.calendar} value={selected} setValue={setSelected} />
      )}
    </div>
  );
};

export default CustomInput;
