import React from "react";

import styles from "./CarInfoItem.module.scss";

interface IProps {
  name: string;
  value: string;
  className?: string;
}

const CarInfoItem = ({ name, value, className }: IProps) => {
  return (
    <div className={`${styles.root} ${className}`}>
      <span className={styles.title}>{name}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

export default CarInfoItem;
