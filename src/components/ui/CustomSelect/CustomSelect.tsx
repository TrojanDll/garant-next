"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

import Tooltip from "../Tooltip/Tooltip";

import styles from "./CustomSelect.module.scss";
import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";
import useCarBrand from "@/stores/Cars/carBrand.store";
import { useGetCarModelByBrandId } from "@/hooks/cars/useGetCarModelByBrandId";

export interface IOptions {
  value: string;
  label: string;
}

interface IProps {
  allOptions?: IOptions[];
  options: IOptions[];
  popularBrands?: IOptions[];
  required?: boolean;
  setValue?: (value: string) => void;
  setFullValue?: (value: IOptions) => void;
  selectedValue?: string | null | undefined | IOptions;
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
  popularBrands,
  setValue,
  setFullValue,
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
  allOptions,
}: IProps) => {
  const [inputValue, setInputValue] = useState(""); // значение в поле ввода
  const [filteredOptions, setFilteredOptions] = useState<IOptions[]>([]); // то, что отображаем
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isJustSelected, setIsJustSelected] = useState(false);
  const [carModelOptions, setCarModelOptions] = useState<IOptions[]>([]);

  const { getCarModelByBrandName, isError, isPending, isSuccess, carModelData } =
    useGetCarModelByBrandId();

  const isModelSelect = options.map((item) => item.value).indexOf("thumbnail") !== -1;

  const carBrand = useCarBrand((state) => state.carBrand);
  const setCarBrand = useCarBrand((state) => state.setCarBrand);

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

    if (setFullValue) {
      setFullValue(value);
    }

    if (allOptions) {
      // setInputValue(value?.label || "");

      if (value.value === "another_vehicle") {
        setIsAnotherCarMark(true);
      } else {
        setIsAnotherCarMark(false);
        setCarBrand(value.value);
      }
    }
  };

  useEffect(() => {
    if (isModelSelect && carBrand.length !== 0) {
      getCarModelByBrandName(carBrand);
    }
  }, [carBrand]);

  useEffect(() => {
    if (isSuccess && carModelData) {
      const newData: IOptions[] = carModelData.map((item) => {
        return {
          label: item.Model_Name,
          value: item.Model_Name,
        };
      });
      setCarModelOptions(newData);
    }
  }, [isPending]);

  useEffect(() => {
    async function search() {
      if (inputValue.length >= 2 && allOptions) {
        const filtered = await allOptions.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions([
          {
            label: "Другое ТС",
            value: "another_vehicle",
          },
          ...filtered,
        ]);
      } else {
        setFilteredOptions([
          {
            label: "Другое ТС",
            value: "another_vehicle",
          },
        ]);
      }

      if (inputValue.length === 0 && popularBrands) {
        setFilteredOptions([
          {
            label: "Другое ТС",
            value: "another_vehicle",
          },
          ...popularBrands,
        ]);
      }
    }

    search();
  }, [inputValue, allOptions]);

  useEffect(() => {
    if (setValue) {
      setValue(
        selectedValue
          ? typeof selectedValue === "string"
            ? selectedValue
            : selectedValue.value
          : ""
      );
    }
  }, []);

  return (
    <div className={`${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {tooltip && <Tooltip className={styles.tooltip} text={tooltipText} />}
        </label>
      )}

      <Select
        value={
          selectedValue
            ? {
                value: typeof selectedValue === "string" ? selectedValue : selectedValue.value,
                label: typeof selectedValue === "string" ? selectedValue : selectedValue.label,
              }
            : null
        }
        filterOption={() => true}
        name={name}
        inputValue={inputValue}
        onInputChange={(value) => setInputValue(value)}
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
        options={
          isModelSelect && carModelData
            ? carModelOptions
            : name === "brand"
            ? filteredOptions.slice(0, 50)
            : options
        }
      />
    </div>
  );
};

export default CustomSelect;
