"use client";

import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  SyntheticEvent,
} from "react";

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

const PHONE_MASK = "+7 (___) ___ __ __";
const MAX_DIGITS = 10;

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
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<Date>();
  const [isValidationError, setIsValidationError] = useState(false);
  const [isCalendarOpened, setIsCalendarOpened] = useState(false);
  const [rawValue, setRawValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const isAnotherCarVisible = useOsagoApplyCarMark((state) => state.isAnotherCarMark);
  const { isPromocodeLoading, promocodeResult, validatePromocode } = usePromocodeValidate();

  const formatWithMask = (digits: string) => {
    let formatted = "";
    let digitIndex = 0;

    for (let char of PHONE_MASK) {
      if (char === "_") {
        formatted += digits[digitIndex] ?? "_";
        digitIndex++;
      } else {
        formatted += char;
      }
    }

    return formatted;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, MAX_DIGITS);
    setRawValue(digitsOnly);
    setValue(`${digitsOnly}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (inputType !== "phone") return;

    const isDigit = /^\d$/.test(e.key);
    const isBackspace = e.key === "Backspace";
    const isDelete = e.key === "Delete";

    if (!isDigit && !isBackspace && !isDelete) {
      e.preventDefault();
      return;
    }

    const cursor = inputRef.current?.selectionStart ?? 0;

    if (isDigit) {
      if (rawValue.length >= MAX_DIGITS) {
        e.preventDefault();
        return;
      }

      const nextDigitIndex = PHONE_MASK.slice(0, cursor)
        .split("")
        .filter((c) => c === "_").length;

      const updated = rawValue.slice(0, nextDigitIndex) + e.key + rawValue.slice(nextDigitIndex);

      setRawValue(updated.slice(0, MAX_DIGITS));
      setValue(`7${updated.slice(0, MAX_DIGITS)}`);
      e.preventDefault();

      requestAnimationFrame(() => {
        moveCursorToNextPlaceholder(cursor + 1);
      });
    }

    if (isBackspace) {
      e.preventDefault();
      const prevDigitIndex =
        PHONE_MASK.slice(0, cursor)
          .split("")
          .filter((c) => c === "_").length - 1;
      if (prevDigitIndex >= 0) {
        const updated = rawValue.slice(0, prevDigitIndex) + rawValue.slice(prevDigitIndex + 1);
        setRawValue(updated);
        setValue(`7${updated}`);
        requestAnimationFrame(() => {
          moveCursorToPrevPlaceholder(cursor - 1);
        });
      }
    }
  };

  const moveCursorToNextPlaceholder = (start: number) => {
    const mask = PHONE_MASK;
    for (let i = start; i < mask.length; i++) {
      if (mask[i] === "_") {
        inputRef.current?.setSelectionRange(i, i);
        break;
      }
    }
  };

  const moveCursorToPrevPlaceholder = (start: number) => {
    const mask = PHONE_MASK;
    for (let i = start; i >= 0; i--) {
      if (mask[i] === "_") {
        inputRef.current?.setSelectionRange(i, i);
        break;
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValidationError(false);
    if (inputType === "phone") {
      handlePhoneChange(e);
    } else {
      setValue(e.target.value);
    }
  };

  const handleAsideElementClick = () => {
    if (inputType === "promocode") {
      validatePromocode(value);
    }
    if (inputType === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  const handleDateChange = (value: Date | undefined) => {
    if (value) {
      setSelected(value);
      setValue(value.toLocaleDateString());
    } else {
      setValue("");
      setSelected(undefined);
    }
    setIsCalendarOpened(false);
  };

  const handleInputClick = () => {
    setIsCalendarOpened(!isCalendarOpened);
  };

  useEffect(() => {
    if (name === "vehicle_refined_make" && !isAnotherCarVisible && setValue) {
      setValue("");
    }
  }, [isAnotherCarVisible]);

  useEffect(() => {
    if (promocodeResult && !promocodeResult.isValid) {
      setIsValidationError(true);
    }
  }, [promocodeResult]);

  // useEffect(() => {
  //   if (inputType === "phone") {
  //     const initialDigits = value ? value.replace(/\D/g, "").slice(0, MAX_DIGITS) : "";
  //     setRawValue(initialDigits);
  //   }
  // }, []);

  useEffect(() => {
    if (inputType === "phone") {
      const digits = value ? value.replace(/\D/g, "").slice(1, 11) : ""; // отсекаем первую 7 и оставляем 10 цифр
      if (digits !== rawValue) {
        setRawValue(digits);
      }
    }
  }, [value, inputType]);

  const isErrorMessage: boolean = !!errorMessage?.length;
  const isPointer = inputType === "date";

  return (
    <ClickOutsideWrapper
      className={`${className} ${styles.root}`}
      onClickOutside={() => setIsCalendarOpened(false)}
    >
      <label className={styles.label} htmlFor={name}>
        {label}
        {inputType === "promocode" && <span className={styles.labelSpan}>(если есть)</span>}
      </label>

      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={inputType === "phone" ? PHONE_MASK.length : undefined}
          onClick={isPointer ? handleInputClick : undefined}
          readOnly={isPointer}
          type={inputType === "password" && !isPasswordVisible ? "password" : "text"}
          name={name}
          id={name}
          placeholder={placeholder}
          required={required}
          value={inputType === "phone" ? formatWithMask(rawValue) : value ?? ""}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={` ${isErrorMessage || isValidationError ? styles.error : ""} ${styles.input} ${
            isPointer ? styles.pointer : ""
          } ${inputType === "promocode" ? styles.promocode : ""} ${
            inputType === "password" && !isPasswordVisible ? styles.passwordHidden : ""
          }`}
        />
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

      {promocodeResult?.isValid && (
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
            setValue={handleDateChange}
            onClose={() => setIsCalendarOpened(false)}
          />
        </>
      )}
    </ClickOutsideWrapper>
  );
};

export default CustomInput;
