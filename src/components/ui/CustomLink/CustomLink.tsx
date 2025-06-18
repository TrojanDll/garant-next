import Link from "next/link";
import React, { PropsWithChildren } from "react";
import styles from "./CustomLink.module.scss";

interface IProps {
  href: string;
  className?: string;
  onClick?: () => void;
  variant?: "underline" | "primary";
  isCentered?: boolean;
  download?: any;
}

const CustomLink = ({
  children,
  href,
  className,
  onClick,
  variant,
  isCentered = false,
  download,
}: PropsWithChildren<IProps>) => {
  return (
    <Link
      onClick={onClick}
      className={`${className ? className : ""} ${styles.link} ${
        variant === "underline" ? styles.underline : ""
      } ${isCentered ? styles.centered : ""}`}
      href={href}
      download={download}
      
    >
      {children}
    </Link>
  );
};

export default CustomLink;
