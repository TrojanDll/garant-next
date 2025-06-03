"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

import styles from "./MyPoliciesFiltersWindow.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import useShadow from "@/stores/Shadow/shadow.store";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import FilterOptionsProducer, {
  IFilterOptionItem,
} from "@/components/entities/FilterOptionsProducer/FilterOptionsProducer";
import { EPolicyStatus, EPolicyTypes } from "@/types/policy.types";
import usePolicyFilters from "@/stores/Policy/policyFilters.store";
import { compareStringAndEPolicyStatus } from "@/stores/Policy/compareStringAndEPolicyStatus";
import { compareStringAndEPolicyTypes } from "@/stores/Policy/compareStringAndEPolicyTypes";
import Button from "@/components/ui/Button/Button";

const policyTypeFilterOptions: IFilterOptionItem[] = [
  {
    label: "ОСАГО",
    value: EPolicyTypes.OSAGO,
  },
  {
    label: "НС",
    value: EPolicyTypes.NS,
  },
];

const policyStatusFilterOptions: IFilterOptionItem[] = [
  {
    label: "Активный",
    value: EPolicyStatus.ACTIVE,
  },
  {
    label: "Ожидает оплаты",
    value: EPolicyStatus.AWAITING_PAYMENT,
  },
  {
    label: "Истек срок действия",
    value: EPolicyStatus.EXPIRED,
  },
];

type TFilterProducerType = "policyType" | "policyStatus";

interface IActiveFilterItems {
  policyType: IFilterOptionItem | null;
  policyStatus: IFilterOptionItem | null;
}

interface IProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const MyPoliciesFiltersWindow = ({ isVisible, setIsVisible }: IProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const [activeFilterItems, setActiveFilterItems] = useState<IActiveFilterItems>({
    policyStatus: null,
    policyType: null,
  });

  const isShadowVisible = useShadow((state) => state.isShadowVisible);
  const setIsShadowVisible = useShadow((state) => state.setIsShadowVisible);
  const setPolicyTypeFilter = usePolicyFilters((state) => state.setPolicyType);
  const setPolicyStatusFilter = usePolicyFilters((state) => state.setActivityStatus);

  useEffect(() => {
    if (isVisible) {
      setPolicyTypeFilter(undefined);
      setPolicyStatusFilter(undefined);
      setActiveFilterItems({
        policyStatus: null,
        policyType: null,
      });
    }
  }, []);

  useEffect(() => {
    const el = rootRef.current;

    if (!el) return;

    if (isVisible) {
      setIsShadowVisible(true);
      // disableBodyScroll(el);
    } else {
      // enableBodyScroll(el);
    }

    return () => enableBodyScroll(el);
  }, [isVisible]);

  useEffect(() => {
    if (!isShadowVisible) {
      setIsVisible(false);
    }
  }, [isShadowVisible]);

  useEffect(() => {
    if (isVisible) {
      setPolicyStatusFilter(
        activeFilterItems.policyStatus
          ? compareStringAndEPolicyStatus(activeFilterItems.policyStatus.value)
          : undefined
      );

      setPolicyTypeFilter(
        activeFilterItems.policyType
          ? compareStringAndEPolicyTypes(activeFilterItems.policyType.value)
          : undefined
      );
    }
  }, [activeFilterItems]);

  function handleCloseButtonClick() {
    setIsShadowVisible(false);
    setIsVisible(false);
  }

  function handleChangeFilterOption(
    option: IFilterOptionItem | null,
    producerType: TFilterProducerType
  ) {
    if (producerType === "policyType") {
      setActiveFilterItems((prev) => {
        return {
          ...prev,
          policyType: option,
        };
      });
    } else if (producerType === "policyStatus") {
      setActiveFilterItems((prev) => {
        return {
          ...prev,
          policyStatus: option,
        };
      });
    }
  }

  function resetAllFilters() {
    handleChangeFilterOption(null, "policyStatus");
    handleChangeFilterOption(null, "policyType");
  }

  return (
    <Substrate
      ref={rootRef}
      className={`${styles.root} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.content}>
        <button className={styles.close} onClick={handleCloseButtonClick}>
          <SvgSelector id={ESvgName.CLOSE_ROUNDED} />
        </button>

        <CustomTitle tag="h4" isCentered>
          Фильтры
        </CustomTitle>

        <button className={styles.resetButton} onClick={resetAllFilters}>
          Сбросить
        </button>

        <div className={styles.filterParam}>
          <h5 className={styles.filterParamTitle}>Тип полиса</h5>
          <FilterOptionsProducer
            className={styles.filterProducer}
            options={policyTypeFilterOptions}
            getActiveItem={(value: IFilterOptionItem | null) =>
              handleChangeFilterOption(value, "policyType")
            }
            activeItemProp={activeFilterItems.policyType}
          />
        </div>

        <div className={styles.filterParam}>
          <h5 className={styles.filterParamTitle}>Статус</h5>
          <FilterOptionsProducer
            className={styles.filterProducer}
            options={policyStatusFilterOptions}
            getActiveItem={(value: IFilterOptionItem | null) =>
              handleChangeFilterOption(value, "policyStatus")
            }
            activeItemProp={activeFilterItems.policyStatus}
          />
        </div>
      </div>

      <Button className={styles.doneBtn} onClickEvent={handleCloseButtonClick}>
        Готово
      </Button>
    </Substrate>
  );
};

export default MyPoliciesFiltersWindow;
