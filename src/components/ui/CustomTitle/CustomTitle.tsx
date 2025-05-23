import React, { PropsWithChildren } from "react";
import styles from "./CustomTitle.module.scss";

interface IProps {
  isCentered?: boolean;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  type?: "default" | "small";
  isLarge?: boolean;
}

const CustomTitle = ({
  isCentered,
  className,
  children,
  tag,
  type,
  isLarge,
}: PropsWithChildren<IProps>) => {
  const Tag = tag ? tag : "h1";

  return (
    <Tag
      className={`${styles.title} ${isCentered ? styles.centered : ""} ${
        Tag === "h2" ? styles.h2 : Tag === "h3" ? styles.h3 : ""
      } ${className} ${type === "small" ? styles.small : ""} ${isLarge && styles.large}`}
    >
      {children}
    </Tag>
  );
};

export default CustomTitle;
