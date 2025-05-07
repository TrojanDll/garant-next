import React from "react";

import styles from "./CountedPrice.module.scss";
import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";

interface IProps {
  className?: string;
  preliminaryCost: number;
  discount?: number;
  finalCost: number;
  isIsolated?: boolean;
  onClick?: () => void;
}

const CountedPrice = ({
  discount,
  finalCost,
  preliminaryCost,
  className,
  isIsolated = false,
  onClick,
}: IProps) => {
  return (
    <Substrate
      withShadow={isIsolated ? "light" : undefined}
      bordered
      className={`${className} ${styles.substrate} ${isIsolated && styles.isolated}`}
    >
      <div className={styles.priceRow}>
        <div className={styles.priceRowTitle}>Полис ОСАГО</div>
        <div className={styles.preliminaryCost}>{preliminaryCost} ₽</div>
      </div>

      {discount !== 0 && (
        <div className={styles.priceRow}>
          <div className={styles.priceRowTitle}>Скидка (промокод)</div>
          <div className={styles.discount}>-{discount} ₽</div>
        </div>
      )}

      <div className={styles.divider}></div>

      <div className={styles.priceRow}>
        <div className={styles.priceRowTotalTitle}>Итого</div>
        <div className={styles.finalCost}>{finalCost} ₽</div>
      </div>

      <Button
        type="submit"
        className={styles.button}
        variant="wide"
        onClickEvent={onClick}
      >
        {isIsolated ? "Перейти к оплате" : "Оформить"}
      </Button>
    </Substrate>
  );
};

export default CountedPrice;
