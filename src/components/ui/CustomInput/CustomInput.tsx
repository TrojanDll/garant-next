"use client";

import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";

import { TInputType } from "@/types/IFieldConfig";

import InputAsideElement from "../InputAsideElement/InputAsideElement";
import Calendar from "../Calendar/Calendar";
import ClickOutsideWrapper from "../ClickOutsideWrapper/ClickOutsideWrapper";

import styles from "./CustomInput.module.scss";

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
  const handleInputClick = () => {
    setIsCalendarOpened(!isCalendarOpened);
  };

  const handleDateChange = (value: Date | undefined) => {
    if (value) {
      setSelected(value);
      setValue(value.toLocaleDateString());
    } else {
      setValue("");
      setSelected(value);
    }
  };

  const isErrorMessage: boolean = !!errorMessage?.length;

  const isPointer = inputType === "date" ? true : false;

  // const labelValue = inputType === "promocode" ? `${value} (если есть)`

  return (
    <ClickOutsideWrapper
      className={`${className} ${styles.root}`}
      onClickOutside={() => setIsCalendarOpened(false)}
    >
      <label className={styles.label} htmlFor={name}>
        {label}
        {inputType === "promocode" ? <span className={styles.labelSpan}>(если есть)</span> : ""}
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

      {inputType === "date" && (
        <Calendar
          className={`${styles.calendar} ${isCalendarOpened ? styles.visible : styles.hidden}`}
          value={selected}
          setValue={(value: Date | undefined) => handleDateChange(value)}
        />
      )}
    </ClickOutsideWrapper>
  );
};

export default CustomInput;
