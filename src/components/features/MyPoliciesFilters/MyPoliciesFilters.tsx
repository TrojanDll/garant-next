"use client";

import React, { useEffect, useState } from "react";

import styles from "./MyPoliciesFilters.module.scss";

import ButtonGroup, {
  TButtonGroupRequest,
} from "@/components/ui/ButtonGroup/ButtonGroup";
import SelectFilter from "@/components/ui/SelectFilter/SelectFilter";
import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import usePolicyFilters from "@/stores/Policy/policyFilters";
import { EPolicyStatus, EPolicyTypes } from "@/types/policy.types";

const buttonGroupItems: string[] = ["Активные", "Архив", "Ожидают оплаты"];

const options: IOptions[] = [
  { label: "Все категории", value: "all" },
  { label: "ОСАГО", value: `${EPolicyTypes.OSAGO}` },
  { label: "НС", value: `${EPolicyTypes.NS}` },
];

const MyPoliciesFilters = () => {
  const [policyTypeState, setPolicyTypeState] = useState<IOptions>();
  const setActivityStatus = usePolicyFilters((state) => state.setActivityStatus);
  const setPolicyType = usePolicyFilters((state) => state.setPolicyType);

  function handleButtonGroupClick(buttonGroupRequest: TButtonGroupRequest) {
    if (buttonGroupRequest.value === "Активные") {
      setActivityStatus(EPolicyStatus.ACTIVE);
    } else if (buttonGroupRequest.value === "Архив") {
      setActivityStatus(EPolicyStatus.EXPIRED);
    } else if (buttonGroupRequest.value === "Ожидают оплаты") {
      setActivityStatus(EPolicyStatus.AWAITING_PAYMENT);
    } else {
      setActivityStatus(undefined);
    }
  }

  useEffect(() => {
    if (policyTypeState?.value === "all") {
      setPolicyType(undefined);
    } else if (policyTypeState?.value === EPolicyTypes.OSAGO) {
      setPolicyType(EPolicyTypes.OSAGO);
    } else if (policyTypeState?.value === EPolicyTypes.NS) {
      setPolicyType(EPolicyTypes.NS);
    }
  }, [policyTypeState]);

  return (
    <div className={styles.root}>
      <ButtonGroup
        items={buttonGroupItems}
        isEquals={false}
        onButtonClick={handleButtonGroupClick}
      />
      <SelectFilter
        options={options}
        selectedValue={policyTypeState}
        setValue={(value: IOptions) => setPolicyTypeState(value)}
        defaultValueIndex={0}
        className={styles.select}
      />
    </div>
  );
};

export default MyPoliciesFilters;
