"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

import Tooltip from "../Tooltip/Tooltip";

import styles from "./CustomSelect.module.scss";
import useOsagoApplyCarMark from "@/stores/OsagoApplyCarMark/osagoApplyCarMark.store";


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
  tooltip?: boolean;
  tooltipText?: string;
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
  tooltip = false,
  tooltipText = "",
}: IProps) => {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isJustSelected, setIsJustSelected] = useState(false);

  const setIsAnotherCarMark = useOsagoApplyCarMark((state) => state.setCarMarkValue);

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

    if (value.value === "another_vehicle") {
      setIsAnotherCarMark(true);
    } else {
      setIsAnotherCarMark(false);
    }
  };

  return (
    <div className={`${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {tooltip && <Tooltip className={styles.tooltip} text={tooltipText} />}
        </label>
      )}

      <Select
        name={name}
        isSearchable={isSearchable}
        openMenuOnFocus={false}
        onMenuOpen={() => handleMenuOpen()}
        onMenuClose={() => handleMenuClose()}
        onChange={(value) => handleChange(value as IOptions)}
        placeholder={placeholder ? placeholder : ""}
        classNames={{
          control: () =>
            `${styles.control} ${isSelectOpened ? styles.controlOpened : ""} ${
              errorMessage?.length ? styles.controlError : ""
            } ${isSearchable ? styles.controlSearchable : ""}`,
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
