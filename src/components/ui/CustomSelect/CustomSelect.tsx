"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

import CustomTitle from "../CustomTitle/CustomTitle";

import styles from "./CustomSelect.module.scss";

export interface IOptions {
  value: string;
  label: string;
}

interface IProps {
  options: IOptions[];
  required?: boolean;
  setValue?: (value: string) => void;
  selectedValue?: string | null | undefined;
  isSubmitClicked?: boolean;
  name: string;
  className?: string;
  placeholder?: string;
  label?: string;
  other?: any;
  errorMessage?: string;
  isSearchable?: boolean;
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
  isSearchable = true,
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
      setValue(value.value);
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
        // isSearchable={isSearchable}
        openMenuOnFocus={false}
        onMenuOpen={() => handleMenuOpen()}
        onMenuClose={() => handleMenuClose()}
        onChange={(value) => handleChange(value as IOptions)}
        placeholder={placeholder ? placeholder : ""}
        classNames={{
          control: () =>
            `${styles.control} ${isSelectOpened ? styles.controlOpened : ""} ${
              errorMessage?.length ? styles.controlError : ""
            }`,
          placeholder: () =>
            `${styles.placeholder} ${errorMessage?.length ? styles.placeholderError : ""}`,
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
      {/* {errorMessage?.length && (
        <p className={styles.errorMessage}>
          <SvgSelector id={ESvgName.ATTENTION} />
          {errorMessage}
        </p>
      )} */}
    </div>
  );
};

export default CustomSelect;
