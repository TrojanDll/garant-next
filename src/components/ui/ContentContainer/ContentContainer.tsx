import React, { PropsWithChildren } from "react";
import styles from "./ContentContainer.module.scss";

interface IProps {
  className?: string;
}

const ContentContainer = ({ children, className }: PropsWithChildren<IProps>) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export default ContentContainer;
