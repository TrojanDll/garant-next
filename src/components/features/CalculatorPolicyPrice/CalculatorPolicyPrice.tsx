import React from "react";

import Button from "@/components/ui/Button/Button";

import { PAGES } from "@/config/pages-url.config";

import styles from "./CalculatorPolicyPrice.module.scss";
import useCurrientCar from "@/stores/Cars/currientCar";

interface IProps {
  price: number;
  policyType: "osago" | "ns";
  className: string;
}

const CalculatorPolicyPrice = ({ price, policyType, className }: IProps) => {
  const setCar = useCurrientCar((state) => state.setCar);
  const handleClick = () => {
    setCar(undefined);
  };

  return (
    <div className={`${styles.root} ${className}`}>
      <div className={styles.priceWrapper}>
        <h3 className={styles.title}>Стоимость полиса</h3>
        <p className={styles.price}>{price} ₽</p>
      </div>
      <Button
        className={styles.button}
        isLink={true}
        href={policyType === "osago" ? PAGES.OSAGO_APPLY : PAGES.NS_APPLY}
        onClickEvent={handleClick}
      >
        Купить полис
      </Button>
    </div>
  );
};

export default CalculatorPolicyPrice;
