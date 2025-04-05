import CalculatorMainSwitcher from "@/components/entities/CalculatorMainSwitcher/CalculatorMainSwitcher";
import React from "react";
import styles from "./CalculatorPromo.module.scss";

const CalculatorPromo = () => {
  return (
    <div className={styles.root}>
      <CalculatorMainSwitcher />
      CalculatorPromo
    </div>
  );
};

export default CalculatorPromo;
