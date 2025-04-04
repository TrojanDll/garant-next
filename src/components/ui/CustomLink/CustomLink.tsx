import Link from "next/link";
import React, { PropsWithChildren } from "react";
import styles from "./CustomLink.module.scss";

interface IProps {
  href: string;
  className?: string;
  onClick?: () => void
}

const CustomLink = ({ children, href, className, onClick}: PropsWithChildren<IProps>) => {
  return (
    <Link onClick={onClick} className={`${className ? className : ""} ${styles.link}`} href={href}>
      {children}
    </Link>
  );
};

export default CustomLink;
