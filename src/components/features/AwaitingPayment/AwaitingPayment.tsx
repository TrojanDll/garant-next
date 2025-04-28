import React from "react";

import styles from "./AwaitingPayment.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";

interface IProps {
  className?: string;
  ammount: number;
}

const AwaitingPayment = ({ ammount, className }: IProps) => {
  return (
    <Substrate className={`${className} ${styles.substrate}`} withShadow="light">
      <p className={styles.title}>Полис ожидает оплаты</p>
      <p className={styles.ammount}>{ammount}₽</p>
      <Button className={styles.button} variant="wide">
        Оплатить
      </Button>
    </Substrate>
  );
};

export default AwaitingPayment;
