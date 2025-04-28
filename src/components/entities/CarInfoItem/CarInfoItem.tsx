import React, { PropsWithChildren } from "react";

import styles from "./CarInfoItem.module.scss";

interface IProps {
  name?: string;
  value?: string;
  className?: string;
}

const CarInfoItem = ({ name, value, className, children }: PropsWithChildren<IProps>) => {
  return (
    <div className={`${styles.root} ${className}`}>
      {children ? (
        <>
          <span className={styles.title}>{name}</span>

          {children}
        </>
      ) : (
        <>
          <span className={styles.title}>{name}</span>
          <span className={styles.value}>{value}</span>
        </>
      )}
    </div>
  );
};

export default CarInfoItem;
