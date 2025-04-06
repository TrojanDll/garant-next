import CalculatorMainSwitcher from "@/components/entities/CalculatorMainSwitcher/CalculatorMainSwitcher";
import React from "react";
import styles from "./CalculatorPromo.module.scss";
import { TabsProps } from "antd";
import CalculatorMainForm from "@/components/entities/CalculatorMainForm/CalculatorMainForm";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "ОСАГО",
    children: <CalculatorMainForm variant="osago"/>,
  },
  {
    key: "2",
    label: "НС",
    children: <CalculatorMainForm variant="ns"/>,
  },
];

const CalculatorPromo = () => {
  return (
    <div className={styles.root}>
      <CalculatorMainSwitcher items={items} />
    </div>
  );
};

export default CalculatorPromo;
