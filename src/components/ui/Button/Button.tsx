"use client";

import Link from "next/link";
import React, { PropsWithChildren } from "react";
import styles from "./Button.module.scss";

interface IProps {
  backgroundColor?: string;
  style?: "filled" | "outlined";
  type?: "button" | "submit" | "reset" | "download";
  variant?: "primary" | "dashboard" | "wide" | "small";
  onClickEvent?: () => void;
  isLink?: boolean;
  href?: string;
  className?: string;
  fileName?: string;
}

const Button = ({
  children,
  backgroundColor,
  type,
  style,
  onClickEvent,
  isLink,
  href,
  className,
  variant,
  fileName = "example.pdf",
}: PropsWithChildren<IProps>) => {
  const classNames = `${styles.button} ${style ? styles[style] : ""} ${
    variant ? styles[variant] : ""
  }`;

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
      <Link onClick={onClickEvent} className={`${classNames} ${className}`} href={href}>
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
        {children}
      </button>
    );

  return <>{content}</>;
};

export default Button;
