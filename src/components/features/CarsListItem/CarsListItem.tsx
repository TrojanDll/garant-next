import React from "react";

import styles from "./CarsListItem.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";

interface IProps {
  className?: string;
  brand: string;
  model: string;
  registration_plate: string;
  id: number;
}

const CarsListItem = ({ className, brand, model, registration_plate, id }: IProps) => {
  return (
    <Link href={`${PAGES.CARS}/${id}`}>
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

        <div className={styles.moreMobile}>
          <Button style="outlined">Подробнее</Button>
        </div>
      </Substrate>
    </Link>
  );
};

export default CarsListItem;
