"use client";

import Link from "next/link";
import React, { PropsWithChildren } from "react";

import styles from "./SidebarLink.module.scss";

interface IProps {
  className?: string;
  active?: boolean;
  setActive?: () => void;
  href: string;
}

const SidebarLink = ({
  children,
  className,
  active,
  setActive,
  href = "/",
}: PropsWithChildren<IProps>) => {
  return (
    <Link
      href={href}
      className={`${styles.link} ${className} ${active ? styles.active : ""}`}
      onClick={setActive}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;
