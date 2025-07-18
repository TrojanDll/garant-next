"use client";

import Link from "next/link";
import React, { PropsWithChildren } from "react";
import styles from "./Button.module.scss";

interface IProps {
  style?: "filled" | "outlined";
  type?: "button" | "submit" | "reset" | "download";
  variant?: "primary" | "dashboard" | "wide" | "small";
  onClickEvent?: () => void;
  isLink?: boolean;
  href?: string;
  className?: string;
  fileName?: string;
  isLoading?: boolean;
  contentClassName?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

const Button = ({
  children,
  type,
  style,
  onClickEvent,
  isLink,
  href,
  className,
  variant,
  fileName = "example.pdf",
  isLoading = false,
  contentClassName,
  target,
}: PropsWithChildren<IProps>) => {
  const classNames = `${styles.button} ${style ? styles[style] : ""} ${
    variant ? styles[variant] : ""
  }`;

  const handleDownload = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const a = document.createElement("a");
    a.href = href ? href : "";
    a.download = fileName || "download";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const content =
    isLink && href ? (
      <Link
        target={target}
        onClick={onClickEvent}
        className={`${classNames} ${className}`}
        href={href}
      >
        {children}
      </Link>
    ) : type === "download" && href ? (
      <a
        href={href}
        className={`${classNames} ${className}`}
        download={"example.pdf"}
        onClick={handleDownload}
      >
        {children}
      </a>
    ) : (
      <button
        type={type !== "download" ? type : "button"}
        className={`${classNames} ${className}`}
        onClick={onClickEvent ? onClickEvent : () => {}}
      >
        <span
          className={`${styles.text} ${contentClassName}`}
          style={{ opacity: isLoading ? 0 : 1 }}
        >
          {children}
        </span>

        {isLoading && <div className={styles.loader}></div>}
      </button>
    );

  return <>{content}</>;
};

export default Button;
