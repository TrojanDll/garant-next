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
  onClick?: () => void;
}

const CarsListItem = ({
  className,
  brand,
  model,
  registration_plate,
  id,
  onClick,
}: IProps) => {
  return (
    <div>
      <Substrate withShadow="light" className={`${styles.substrate} ${className}`}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            Марка: <span className={styles.value}>{brand}</span>
          </div>

          <div className={styles.infoItem}>
            Модель: <span className={styles.value}>{model}</span>
          </div>

          <div className={styles.infoItem}>
            Регистрационный знак:{" "}
            <span className={styles.value}>{registration_plate}</span>
          </div>
        </div>

        <div className={styles.buttons}>
          <Button
            onClickEvent={onClick}
            isLink
            href={PAGES.OSAGO_APPLY}
            className={styles.byPolicyButton}
          >
            Купить полис
          </Button>
          <Button isLink href={`${PAGES.CARS}/${id}`} className={styles.moreButton}>
            ...
          </Button>
        </div>

        <div className={styles.moreMobile}>
          <Button isLink href={`${PAGES.CARS}/${id}`} style="outlined">
            Подробнее
          </Button>
        </div>
      </Substrate>
    </div>
  );
};

export default CarsListItem;
