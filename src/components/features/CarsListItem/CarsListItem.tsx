import React from "react";

import styles from "./CarsListItem.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";

interface IProps {
  className?: string;
  brand: string;
  model: string;
  registration_plate: string;
}

const CarsListItem = ({ className, brand, model, registration_plate }: IProps) => {
  return (
    <Substrate withShadow="light" className={`${styles.substrate} ${className}`}>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          Марка: <span className={styles.value}>{brand}</span>
        </div>

        <div className={styles.infoItem}>
          Модель: <span className={styles.value}>{model}</span>
        </div>

        <div className={styles.infoItem}>
          Регистрационный знак: <span className={styles.value}>{registration_plate}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button className={styles.byPolicyButton}>Купить полис</Button>
        <Button className={styles.moreButton}>...</Button>
      </div>
    </Substrate>
  );
};

export default CarsListItem;
