import React, { PropsWithChildren } from "react";

import styles from "./Text.module.scss";

interface IProps {
  className?: string;
  isCentered?: boolean;
}

const Text = ({ isCentered, className, children }: PropsWithChildren<IProps>) => {
  return (
    <p className={`${styles.text} ${className} ${isCentered ? styles.centered : ""}`}>{children}</p>
  );
};

export default Text;
