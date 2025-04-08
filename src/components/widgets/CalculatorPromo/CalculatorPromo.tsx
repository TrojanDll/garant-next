"use client";

import React, { useState } from "react";

import CalculatorMainForm, {
  ICalculatorMainFormProps,
} from "@/components/entities/CalculatorMainForm/CalculatorMainForm";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import ButtonGroup from "@/components/ui/ButtonGroup/ButtonGroup";

import styles from "./CalculatorPromo.module.scss";

const CalculatorPromo = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const buttons = ["ОСАГО", "НС"];

  const variants = ["osago", "ns"];

  return (
    <ContentContainer>
      <section className={styles.root}>
        <ButtonGroup
          // className={styles.buttonGroup}
          items={buttons}
          defaultActiveIndex={0}
          onButtonClick={setCurrentTab}
        />
        <CalculatorMainForm variant={variants[currentTab] as ICalculatorMainFormProps["variant"]} />
      </section>
    </ContentContainer>
  );
};

export default CalculatorPromo;
