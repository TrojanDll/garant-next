import React, { PropsWithChildren } from "react";
import styles from "./CustomTitle.module.scss";

interface IProps {
  isCentered?: boolean;
  className?: string;
}

const CustomTitle = ({ isCentered, className, children }: PropsWithChildren<IProps>) => {
  return (
    <h1 className={`${styles.title} ${isCentered ? styles.centered : ""} ${className}`}>
      {children}
    </h1>
  );
};

export default CustomTitle;
