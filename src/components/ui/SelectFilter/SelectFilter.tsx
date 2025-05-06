"use client";

import React, { useEffect, useState } from "react";

import styles from "./SelectFilter.module.scss";

import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  className?: string;
  options: IOption[];
  setValue?: (value: IOption) => void;
  selectedValue?: IOption | null | undefined;
  defaultValueIndex?: number;
}

const SelectFilter = ({
  className,
  options,
  selectedValue,
  setValue,
  defaultValueIndex,
}: IProps) => {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isJustSelected, setIsJustSelected] = useState(false);

  useEffect(() => {
    if (defaultValueIndex !== undefined && setValue) {
      setValue(options[defaultValueIndex]);
    }
  }, []);

  function handleChange(option: IOption) {
    if (setValue) {
      setValue(option);
    }
  }

  function handleMenuOpen() {
    setIsSelectOpened(true);
    setIsJustSelected(false);
  }

  function handleMenuClose() {
    if (isJustSelected) {
      setIsJustSelected(false);
      return;
    }
    setIsSelectOpened(false);
  }

  return (
    <div className={`${className}`}>
      <Select
        value={selectedValue ? selectedValue : null}
        isSearchable={false}
        openMenuOnFocus={false}
        onMenuOpen={() => handleMenuOpen()}
        onMenuClose={() => handleMenuClose()}
        onChange={(value) => handleChange(value as IOption)}
        classNames={{
          control: () =>
            `${styles.control} ${isSelectOpened ? styles.controlOpened : ""}`,
          placeholder: () => `${styles.placeholder}`,
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

export default SelectFilter;
