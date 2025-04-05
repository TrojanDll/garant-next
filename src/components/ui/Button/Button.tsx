"use client";

import Link from "next/link";
import React, { PropsWithChildren } from "react";
import styles from "./Button.module.scss";

interface IProps {
  backgroundColor?: string;
  style?: "filled" | "outlined";
  type?: "button" | "submit" | "reset";
  onClickEvent?: () => void;
  isLink?: boolean;
  href?: string;
  className?: string
}

const Button = ({
  children,
  backgroundColor,
  type,
  style,
  onClickEvent,
  isLink,
  href,
  className
}: PropsWithChildren<IProps>) => {
  const classNames = `${styles.button} ${style ? styles[style] : ""}`;

  const content =
    isLink && href ? (
      <Link onClick={onClickEvent} className={`${classNames} ${className}`} href={href}>
        {children}
      </Link>
    ) : (
      <button type={type} className={`${classNames} ${className}`} onClick={onClickEvent ? onClickEvent : () => {}}>
        {children}
      </button>
    );

  return <>{content}</>;
};

export default Button;
