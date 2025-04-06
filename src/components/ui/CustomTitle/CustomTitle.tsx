import React, { PropsWithChildren } from "react";
import styles from "./CustomTitle.module.scss";

interface IProps {
  isCentered?: boolean;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CustomTitle = ({ isCentered, className, children, tag }: PropsWithChildren<IProps>) => {
  const Tag = tag ? tag : "h1";

  return (
    <Tag className={`${styles.title} ${isCentered ? styles.centered : ""} ${className}`}>
      {children}
    </Tag>
  );
};

export default CustomTitle;
