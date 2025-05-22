"use client";

import React, { useEffect, useState } from "react";

import styles from "./FilterOptionsProducer.module.scss";

import FilterOptionButton from "@/components/ui/FilterOptionButton/FilterOptionButton";
import usePolicyFilters from "@/stores/Policy/policyFilters.store";

export interface IFilterOptionItem {
  label: string;
  value: string;
}

interface IProps {
  options?: IFilterOptionItem[];
  getActiveItem?: (value: IFilterOptionItem | null) => void;
  activeItemProp?: IFilterOptionItem | null;
  className?: string;
}

const FilterOptionsProducer = ({
  getActiveItem = () => {},
  options,
  activeItemProp,
  className,
}: IProps) => {
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(null);

  function handleClickOption(option: IFilterOptionItem, optionIndex: number) {
    if (activeOptionIndex === optionIndex) {
      // setActiveOptionIndex(null);
      getActiveItem(null);
    } else {
      // setActiveOptionIndex(optionIndex);
      getActiveItem(option);
    }
  }

  useEffect(() => {
    if (activeItemProp) {
      options?.forEach((option, i) => {
        if (option.value === activeItemProp?.value) {
          setActiveOptionIndex(i);
        }
      });
    } else {
      setActiveOptionIndex(null);
    }
  }, [activeItemProp]);

  return (
    <div className={`${styles.root} ${className}`}>
      {options &&
        options.map((option, i) => (
          <FilterOptionButton
            isActive={activeOptionIndex === i}
            onClick={() => handleClickOption(option, i)}
            key={i}
          >
            {option.label}
          </FilterOptionButton>
        ))}
    </div>
  );
};

export default FilterOptionsProducer;
