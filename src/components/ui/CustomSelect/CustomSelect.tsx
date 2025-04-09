"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
import styles from "./CustomSelect.module.scss";
import CustomTitle from "../CustomTitle/CustomTitle";

export interface IOptions {
  value: string;
  label: string;
}

interface IProps {
  options: IOptions[];
  required?: boolean;
  setValue?: (value: IOptions) => void;
  selectedValue?: string | null | undefined;
  isSubmitClicked?: boolean;
  name: string;
  className?: string;
  placeholder?: string;
  label?: string;
  other?: any;
  errorMessage?: string;
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
  other,
  errorMessage,
}: IProps) => {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isJustSelected, setIsJustSelected] = useState(false);

  const handleMenuOpen = () => {
    setIsSelectOpened(true);
    setIsJustSelected(false);
  };

  const handleMenuClose = () => {
    if (isJustSelected) {
      setIsJustSelected(false);
      return;
    }
    setIsSelectOpened(false);
  };

  const handleChange = (value: IOptions) => {
    setIsJustSelected(true);
    if (setValue) {
      setValue(value);
    }
  };

  return (
    <div className={className}>
      {label && (
        <CustomTitle tag="h3" className={styles.label}>
          {label}
        </CustomTitle>
      )}
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
              !selectedValue?.length && required && isSubmitClicked && errorMessage?.length
                ? styles.controlError
                : ""
            }`,
          placeholder: () =>
            `${styles.placeholder} ${
              !selectedValue && required && isSubmitClicked && errorMessage?.length
                ? styles.placeholderError
                : ""
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
              state.isSelected ? styles.optionFocused : ""
            }`,
          menuList: () => styles.menuList,
        }}
        options={options}
      />
    </div>
  );
};

export default CustomSelect;
