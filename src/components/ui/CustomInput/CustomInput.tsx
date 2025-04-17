"use client";

import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";

import { TInputType } from "@/types/IFieldConfig";

import InputAsideElement from "../InputAsideElement/InputAsideElement";
import Calendar from "../Calendar/Calendar";
import ClickOutsideWrapper from "../ClickOutsideWrapper/ClickOutsideWrapper";

import { usePromocodeValidate } from "@/hooks/usePromocodeValidate/usePromocodeValidate";
import InputNotification from "../InputNotification/InputNotification";
import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";

import styles from "./CustomInput.module.scss";

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  setValue: (value: string) => void;
  errorMessage?: string;
  displayErrorMessage?: boolean;
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
  displayErrorMessage = false,
}: IProps) => {
  const [selected, setSelected] = useState<Date>();
  const [isValidationError, setIsValidationError] = useState(false);
  const [isCalendarOpened, setIsCalendarOpened] = useState(false);
  const { isPromocodeLoading, promocodeResult, validatePromocode } = usePromocodeValidate();

  const isAnotherCarVisible = useOsagoApplyCarMark((state) => state.isAnotherCarMark);

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
    setIsCalendarOpened(false);
  };

  const isErrorMessage: boolean = !!errorMessage?.length;

  const isPointer = inputType === "date" ? true : false;

  const handleAsideElementClick = () => {
    if (inputType === "promocode") {
      validatePromocode(value);
    }
  };

  useEffect(() => {
    if (name === "vehicle_refined_make" && !isAnotherCarVisible && setValue) {
      setValue("");
    }
  }, [isAnotherCarVisible]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValidationError(false);
    setValue(e.target.value);
  };

  useEffect(() => {
    if (promocodeResult && !promocodeResult.isValid) {
      setIsValidationError(true);
    }
  }, [promocodeResult]);

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
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          className={` ${isErrorMessage || isValidationError ? styles.error : ""} ${styles.input} ${
            isPointer ? styles.pointer : ""
          } ${inputType === "promocode" ? styles.promocode : ""}`}
        />
        <InputAsideElement
          isLoading={isPromocodeLoading}
          onClick={handleAsideElementClick}
          className={styles.asideElement}
          inputType={inputType}
        />
      </div>

      {isErrorMessage && displayErrorMessage && (
        <InputNotification variant="error">{errorMessage}</InputNotification>
      )}

      {promocodeResult && promocodeResult?.isValid && (
        <InputNotification variant="success">
          Промокод успешно применен -{" "}
          <span className={styles.discountValue}>СКИДКА {promocodeResult.discountValue}%</span>
        </InputNotification>
      )}

      {promocodeResult && !promocodeResult?.isValid && (
        <InputNotification variant="error">Промокод недействителен</InputNotification>
      )}

      {inputType === "date" && (
        <>
          <div
            onClick={() => setIsCalendarOpened(false)}
            className={isCalendarOpened ? styles.modalOverlay : ""}
          ></div>
          <Calendar
            className={`${styles.calendar} ${isCalendarOpened ? styles.visible : styles.hidden}`}
            value={selected}
            setValue={(value: Date | undefined) => handleDateChange(value)}
            onClose={() => setIsCalendarOpened(false)}
          />
        </>
      )}
    </ClickOutsideWrapper>
  );
};

export default CustomInput;
