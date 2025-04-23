import React from "react";

import styles from "./CarInfoItem.module.scss";

interface IProps {
  name: string;
  value: string;
}

const CarInfoItem = ({ name, value }: IProps) => {
  return (
    <div className={styles.root}>
      <span className={styles.title}>{name}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

export default CarInfoItem;
