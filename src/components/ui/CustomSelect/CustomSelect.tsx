"use client";

import React, { useState } from "react";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
import styles from "./CustomSelect.module.scss";
import dynamic from "next/dynamic";

export interface IOptions {
  value: string;
  label: string;
}

interface IProps {
  options: IOptions[];
  setValue: (value: IOptions) => void;
  required?: boolean;
  selectedValue: string | null | undefined;
  isSubmitClicked?: boolean;
  name: string;
  className?: string;
  placeholder?: string;
  label?: string;
}

const CustomSelect = ({
  options,
  setValue,
  required,
  selectedValue,
  isSubmitClicked,
  name,
  className,
  placeholder,
  label,
}: IProps) => {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isJustSelected, setIsJustSelected] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // console.log(isSelected);

  const handleMenuOpen = () => {
    setIsSelectOpened(true);
    setIsJustSelected(false); // Сбрасываем флаг при открытии меню
  };

  const handleMenuClose = () => {
    if (isJustSelected) {
      // Если элемент только что выбран, игнорируем закрытие из-за потери фокуса
      setIsJustSelected(false);
      return;
    }
    setIsSelectOpened(false);
  };

  const handleChange = (value: IOptions) => {
    setIsJustSelected(true); // Устанавливаем флаг, что элемент выбран
    setValue(value);
  };

  return (
    <div className={className}>
      {label && <p className={styles.label}>{label}</p>}
      <Select
        name={name}
        openMenuOnFocus={false}
        onMenuOpen={() => handleMenuOpen()}
        onMenuClose={() => handleMenuClose()}
        onChange={(value) => handleChange(value as IOptions)}
        placeholder={placeholder ? placeholder : ""}
        classNames={{
          control: () =>
            `${styles.control} ${isSelectOpened ? styles.controlOpened : ""} ${
              !selectedValue?.length && required && isSubmitClicked ? styles.controlError : ""
            }`,
          placeholder: () =>
            `${styles.placeholder} ${
              !selectedValue?.length && required && isSubmitClicked ? styles.placeholderError : ""
            }`,
          indicatorSeparator: () => styles.indicatorCustomSeparator,
          indicatorsContainer: () =>
            `${styles.indicatorCustomContainer} ${
              isSelectOpened ? styles.indicatorCustomContainerOpened : ""
            }`,
          singleValue: () => styles.singleCustomValue,
          menu: () => styles.dropdown,
          option: (state) =>
            `${styles.option} ${state.isFocused ? styles.optionFocused : ""} ${
              state.isSelected ? styles.optionSelected : ""
            }`,
          menuList: () => styles.menuList,
        }}
        options={options}
      />
    </div>
  );
};

export default CustomSelect;
