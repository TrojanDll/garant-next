import CalculatorMainSwitcher from "@/components/entities/CalculatorMainSwitcher/CalculatorMainSwitcher";
import React from "react";
import styles from "./CalculatorPromo.module.scss";
import { TabsProps } from "antd";
import CalculatorMainForm from "@/components/entities/CalculatorMainForm/CalculatorMainForm";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "ОСАГО",
    children: <CalculatorMainForm variant="osago" />,
  },
  {
    key: "2",
    label: "НС",
    children: <CalculatorMainForm variant="ns" />,
  },
];

const CalculatorPromo = () => {
  return (
    <ContentContainer>
      <section className={styles.root}>
        <CalculatorMainSwitcher items={items} />
      </section>
    </ContentContainer>
  );
};

export default CalculatorPromo;
