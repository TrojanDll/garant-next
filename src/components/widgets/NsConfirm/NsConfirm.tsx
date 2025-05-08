"use client";

import React from "react";

import styles from "./NsConfirm.module.scss";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import useCurrientNsPolicy from "@/stores/Policy/currientNsPolicy";
import NsData from "@/components/features/NsData/NsData";

const NsConfirm = () => {
  const currientNsPolicy = useCurrientNsPolicy((state) => state.policy);
  const currientNsPolicyCalculation = useCurrientNsPolicy(
    (state) => state.calculationData
  );

  return (
    <section>
      <ContentContainer className={styles.container}>
        <CustomTitle tag="h1" isCentered className={styles.title}>
          Проверьте правильность данных
        </CustomTitle>

        <Substrate className={styles.substrate}>
          {currientNsPolicy && <NsData policy={currientNsPolicy} />}
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default NsConfirm;
