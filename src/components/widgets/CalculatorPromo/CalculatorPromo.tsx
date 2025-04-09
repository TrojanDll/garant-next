"use client";

import React, { useState } from "react";

import CalculatorMainForm, {
  ICalculatorMainFormProps,
} from "@/components/entities/CalculatorMainForm/CalculatorMainForm";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import ButtonGroup from "@/components/ui/ButtonGroup/ButtonGroup";

import styles from "./CalculatorPromo.module.scss";

const content = [
  {
    value: <CalculatorMainForm key={1} variant="osago" />,
  },
  {
    value: <CalculatorMainForm key={2} variant="ns" />,
  },
];

const CalculatorPromo = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const buttons = ["ОСАГО", "НС"];

  return (
    <ContentContainer>
      <section className={styles.root}>
        <ButtonGroup items={buttons} defaultActiveIndex={0} onButtonClick={setCurrentTab} />
        {content[currentTab].value}
      </section>
    </ContentContainer>
  );
};

export default CalculatorPromo;
