import Link from "next/link";
import React, { PropsWithChildren } from "react";
import styles from "./CustomLink.module.scss";

interface IProps {
  href: string;
  className?: string;
}

const CustomLink = ({ children, href, className }: PropsWithChildren<IProps>) => {
  return (
    <Link className={`${className ? className : ""} ${styles.link}`} href={href}>
      {children}
    </Link>
  );
};

export default CustomLink;
