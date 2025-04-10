import React, { ChangeEvent } from "react";
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
}: IProps) => {
  const isErrorMessage: boolean = !!errorMessage?.length;
  return (
    <div className={`${className} ${styles.root}`}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        value={value ? value : ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        className={` ${isErrorMessage ? styles.error : ""} ${styles.input}`}
      />
    </div>
  );
};

export default CustomInput;
