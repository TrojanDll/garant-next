"use client";

import React, { useState } from "react";

import styles from "./MyPoliciesFilters.module.scss";

import ButtonGroup from "@/components/ui/ButtonGroup/ButtonGroup";
import SelectFilter from "@/components/ui/SelectFilter/SelectFilter";
import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";

const buttonGroupItems: string[] = ["Активные", "Архив", "Ожидают оплаты"];

const options: IOptions[] = [
  { label: "ОСАГО", value: "osago" },
  { label: "НС", value: "ns" },
];

const MyPoliciesFilters = () => {
  const [value, setValue] = useState<IOptions>();

  return (
    <div>
      <ButtonGroup items={buttonGroupItems} isEquals={false} />
      <SelectFilter
        options={options}
        selectedValue={value}
        setValue={(value: IOptions) => setValue(value)}
      />
    </div>
  );
};

export default MyPoliciesFilters;
