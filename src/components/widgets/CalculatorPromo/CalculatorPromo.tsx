"use client";

import React, { useEffect, useState } from "react";

import CalculatorMainForm from "@/components/entities/CalculatorMainForm/CalculatorMainForm";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import ButtonGroup, {
  TButtonGroupRequest,
} from "@/components/ui/ButtonGroup/ButtonGroup";

import styles from "./CalculatorPromo.module.scss";
import toast from "react-hot-toast";

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

  // useEffect(() => {
  //   toast.success(
  //     "Внимание! Сайт в разработке. Оплата станет доступна 13 июля",
  //     {
  //       duration: 6000,
  //     }
  //   );
  // }, []);

  return (
    <ContentContainer>
      <section className={styles.root}>
        <ButtonGroup
          items={buttons}
          defaultActiveIndex={0}
          onButtonClick={(value: TButtonGroupRequest) =>
            setCurrentTab(value.index)
          }
        />
        {content[currentTab].value}
      </section>
    </ContentContainer>
  );
};

export default CalculatorPromo;
