"use client";

import React, { useEffect, useState } from "react";

import styles from "./MyPoliciesFilters.module.scss";

import { TButtonGroupRequest } from "@/components/ui/ButtonGroup/ButtonGroup";
import SelectFilter from "@/components/ui/SelectFilter/SelectFilter";
import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import usePolicyFilters from "@/stores/Policy/policyFilters.store";
import { EPolicyStatus, EPolicyTypes } from "@/types/policy.types";
import Substrate from "@/components/ui/Substrate/Substrate";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import MyPoliciesFiltersWindow from "../MyPoliciesFiltersWindow/MyPoliciesFiltersWindow";

const policyCategoryOptions: IOptions[] = [
  { label: "Все категории", value: "all" },
  { label: "ОСАГО", value: `${EPolicyTypes.OSAGO}` },
  { label: "НС", value: `${EPolicyTypes.NS}` },
];

const policyStatusOptions: IOptions[] = [
  { label: "Все статусы", value: "all" },
  { label: "Активные", value: `${EPolicyStatus.ACTIVE}` },
  { label: "Ожидают оплаты", value: `${EPolicyStatus.AWAITING_PAYMENT}` },
  { label: "Архив", value: `${EPolicyStatus.ARCHIVE}` },
];

const MyPoliciesFilters = () => {
  const [policyTypeState, setPolicyTypeState] = useState<IOptions>();
  const [policyStatusState, setPolicyStatusState] = useState<IOptions>();
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState<boolean>(false);

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

  useEffect(() => {
    if (policyStatusState?.value === "all") {
      setPolicyType(undefined);
    } else {
      setActivityStatus(policyStatusState?.value as EPolicyStatus);
    }
  }, [policyStatusState]);

  return (
    <div className={styles.root}>
      <div className={styles.desktopItems}>
        <SelectFilter
          options={policyStatusOptions}
          selectedValue={policyStatusState}
          setValue={(value: IOptions) => setPolicyStatusState(value)}
          defaultValueIndex={0}
          className={styles.select}
        />
        <SelectFilter
          options={policyCategoryOptions}
          selectedValue={policyTypeState}
          setValue={(value: IOptions) => setPolicyTypeState(value)}
          defaultValueIndex={0}
          className={styles.select}
        />
      </div>

      <button
        className={styles.filtersMobileButton}
        onClick={() => setIsMobileFilterVisible(true)}
      >
        <Substrate withShadow="light" className={styles.filtersMobileButtonSubstrate}>
          <SvgSelector id={ESvgName.FILTER} />
          Фильтры
        </Substrate>
      </button>

      <MyPoliciesFiltersWindow
        isVisible={isMobileFilterVisible}
        setIsVisible={setIsMobileFilterVisible}
      />
    </div>
  );
};

export default MyPoliciesFilters;
