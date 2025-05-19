"use client";

import React, { useEffect } from "react";

import styles from "./MyPoliciesFiltersWindow.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import useShadow from "@/stores/Shadow/shadow.store";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import FilterOptionButton from "@/components/ui/FilterOptionButton/FilterOptionButton";

interface IProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const MyPoliciesFiltersWindow = ({ isVisible, setIsVisible }: IProps) => {
  const isShadowVisible = useShadow((state) => state.isShadowVisible);
  const setIsShadowVisible = useShadow((state) => state.setIsShadowVisible);

  useEffect(() => {
    if (isVisible) {
      setIsShadowVisible(true);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isShadowVisible) {
      setIsVisible(false);
    }
  }, [isShadowVisible]);

  function handleCloseButtonClick() {
    setIsShadowVisible(false);
    setIsVisible(false);
  }

  return (
    <Substrate className={`${styles.root} ${isVisible ? styles.visible : ""}`}>
      <button className={styles.close} onClick={handleCloseButtonClick}>
        <SvgSelector id={ESvgName.CLOSE_ROUNDED} />
      </button>

      <CustomTitle tag="h4" isCentered>
        Фильтры
      </CustomTitle>

      <button className={styles.resetButton}>Сбросить</button>

      <div className={styles.filterParam}>
        <h5 className={styles.filterParamTitle}>Тип полиса</h5>
        <FilterOptionButton>ОСАГО</FilterOptionButton>
      </div>
    </Substrate>
  );
};

export default MyPoliciesFiltersWindow;
