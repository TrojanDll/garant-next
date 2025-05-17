"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";

import styles from "./CustomInput.module.scss";

import { TInputType } from "@/types/IFieldConfig";
import { IMaskInput } from "react-imask";

import InputAsideElement from "../InputAsideElement/InputAsideElement";
import Calendar from "../Calendar/Calendar";
import ClickOutsideWrapper from "../ClickOutsideWrapper/ClickOutsideWrapper";
import { usePromocodeValidate } from "@/hooks/usePromocodeValidate/usePromocodeValidate";
import InputNotification from "../InputNotification/InputNotification";
import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";

import { useValidatePromocode } from "@/hooks/promocode/useValidatePromocode";
import usePromocodeError from "@/stores/Promocode/promocodeError.store";

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
  startDate?: Date;
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
  startDate,
}: IProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selected, setSelected] = useState<Date>();
  const [isCalendarOpened, setIsCalendarOpened] = useState(false);
  const [isValidationError, setIsValidationError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isAnotherCarVisible = useOsagoApplyCarMark((state) => state.isAnotherCarMark);
  const isPromocodeErrorStore = usePromocodeError((state) => state.isError);
  // const { isPromocodeLoading, promocodeResult, validatePromocode } =
  //   usePromocodeValidate();

  const {
    data: promocodeResult,
    mutate: validatePromocode,
    isPending: isPromocodeLoading,
    isError: isPromocodeError,
    isSuccess: isPromocodeSuccess,
  } = useValidatePromocode();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValidationError(false);

    if (inputType === "promocode") {
      setValue(e.target.value.toUpperCase());
    } else {
      setValue(e.target.value);
    }
  };

  const handleAsideElementClick = () => {
    if (inputType === "promocode") validatePromocode(value);
    if (inputType === "password") setIsPasswordVisible((prev) => !prev);
  };

  const handleDateChange = (date?: Date) => {
    if (date) {
      setSelected(date);
      setValue(date.toLocaleDateString());
    } else {
      setValue("");
      setSelected(undefined);
    }
    setIsCalendarOpened(false);
  };

  useEffect(() => {
    if (name === "vehicle_refined_make" && !isAnotherCarVisible) {
      setValue("");
    }
  }, [isAnotherCarVisible]);

  useEffect(() => {
    if (promocodeResult && isPromocodeError) {
      setIsValidationError(true);
    }
  }, [promocodeResult]);

  const isErrorMessage = !!errorMessage?.length;
  const isPointer = inputType === "date";

  return (
    <ClickOutsideWrapper
      className={`${className} ${styles.root}`}
      onClickOutside={() => setIsCalendarOpened(false)}
    >
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {inputType === "promocode" && (
            <span className={styles.labelSpan}>(если есть)</span>
          )}
        </label>
      )}

      <div className={styles.inputWrapper}>
        {inputType === "phone" ? (
          <IMaskInput
            id={name}
            mask="+7 (000) 000 00 00"
            value={value}
            onAccept={(value: string) => {
              setIsValidationError(false);
              setValue(value);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="+7 (___) ___ __ __"
            type="tel"
            name={name}
            required={required}
            inputRef={inputRef}
            className={`${styles.input} ${
              isErrorMessage || isValidationError ? styles.error : ""
            }`}
          />
        ) : (
          <input
            ref={inputRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onClick={isPointer ? () => setIsCalendarOpened(true) : undefined}
            readOnly={isPointer}
            type={inputType === "password" && !isPasswordVisible ? "password" : "text"}
            name={name}
            id={name}
            placeholder={placeholder}
            required={required}
            value={value ?? ""}
            onChange={handleInputChange}
            className={`${styles.input}
              ${isErrorMessage || isValidationError ? styles.error : ""}
              ${isPointer ? styles.pointer : ""}
              ${inputType === "promocode" ? styles.promocode : ""}
              ${
                inputType === "password" && !isPasswordVisible
                  ? styles.passwordHidden
                  : ""
              }`}
          />
        )}

        <InputAsideElement
          isLoading={isPromocodeLoading}
          onClick={handleAsideElementClick}
          className={styles.asideElement}
          inputType={inputType}
          isVisible={isPasswordVisible}
        />
      </div>

      {isErrorMessage && displayErrorMessage && (
        <InputNotification variant="error">{errorMessage}</InputNotification>
      )}

      {promocodeResult && (
        <InputNotification variant="success">
          Промокод успешно применен –{" "}
          <span className={styles.discountValue}>СКИДКА {promocodeResult.message}%</span>
        </InputNotification>
      )}

      {(isPromocodeError || (inputType === "promocode" && isPromocodeErrorStore)) && (
        <InputNotification variant="error">Промокод недействителен</InputNotification>
      )}

      {inputType === "date" && (
        <>
          <div
            onClick={() => setIsCalendarOpened(false)}
            className={isCalendarOpened ? styles.modalOverlay : ""}
          ></div>
          <Calendar
            className={`${styles.calendar} ${
              isCalendarOpened ? styles.visible : styles.hidden
            }`}
            value={selected}
            setValue={handleDateChange}
            onClose={() => setIsCalendarOpened(false)}
            startDate={startDate}
          />
        </>
      )}
    </ClickOutsideWrapper>
  );
};

export default CustomInput;
