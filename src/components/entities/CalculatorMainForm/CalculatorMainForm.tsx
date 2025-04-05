import Substrate from "@/components/ui/Substrate/Substrate";
import React from "react";
import styles from "./CalculatorMainForm.module.scss";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CalculatorInputForm from "@/components/features/CalculatorInputForm/CalculatorInputForm";

interface IProps {
  variant: "osago" | "ns";
}

const CalculatorMainForm = ({ variant }: IProps) => {
  const titles = {
    osago: "Полис ОСАГО в Абхазии",
    ns: "Полис от несчастного случая в Абхазии",
  };

  return (
    <Substrate className={styles.root}>
      <div className={styles.formWrapper}>
        <CustomTitle className={styles.title}>{titles[variant]}</CustomTitle>
        <CalculatorInputForm />
      </div>
    </Substrate>
  );
};

export default CalculatorMainForm;
