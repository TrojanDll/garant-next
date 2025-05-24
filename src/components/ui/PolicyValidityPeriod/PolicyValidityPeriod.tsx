import React from "react";

import styles from "./PolicyValidityPeriod.module.scss";
import { getDaysBetweenDates } from "@/helpers/getDaysBetweenDates";

interface IProps {
  start_date?: string;
  finishDate?: string;
  
}

const PolicyValidityPeriod = ({finishDate, start_date}: IProps) => {
  return (
    <div className={`${styles.contentItem}`}>
      <h3 className={styles.contentItemLargeTitle}>Срок действия</h3>
      <div className={styles.contentItemLargeWrapper}>
        {start_date && finishDate && (
          <span className={styles.contentItemTitle}>
            {getDaysBetweenDates(start_date, finishDate)} суток
          </span>
        )}
        <span className={styles.contentItemValue}>
          с {start_date} {finishDate && `по ${finishDate}`}
        </span>
      </div>
    </div>
  );
};

export default PolicyValidityPeriod;
