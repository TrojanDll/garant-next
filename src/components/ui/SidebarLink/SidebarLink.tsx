"use client";

import Link from "next/link";
import React, { PropsWithChildren } from "react";

import styles from "./SidebarLink.module.scss";

interface IProps {
  className?: string;
  active?: boolean;
  setActive?: () => void;
  href: string;
  onClick?: () => void;
}

const SidebarLink = ({
  children,
  className,
  active,
  setActive,
  href = "/",
  onClick,
}: PropsWithChildren<IProps>) => {
  const handleClick = () => {
    if (setActive) {
      setActive();
    }

    if (onClick) {
      onClick();
    }
  };
  return (
    <Link
      href={href}
      className={`${styles.link} ${className} ${active ? styles.active : ""}`}
      onClick={handleClick}
    >
      {children}
      <svg
        className={styles.chevron}
        width="8"
        height="15"
        viewBox="0 0 8 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.99985 7.66425C7.99977 7.66425 7.99971 7.6643 7.9997 7.66437C7.92191 7.97855 7.71119 8.20016 7.48976 8.42095C5.57711 10.3258 3.66722 12.2338 1.75842 14.1425C1.52871 14.3724 1.26768 14.5211 0.933843 14.4976C0.540103 14.4699 0.253247 14.2721 0.0916849 13.9156C-0.0638327 13.5729 -0.017672 13.2403 0.201042 12.9351C0.253797 12.8617 0.319741 12.7968 0.384311 12.7324C2.09418 11.0245 3.80377 9.31628 5.51666 7.6111C5.60129 7.527 5.61311 7.48371 5.52079 7.39193C3.79773 5.67771 2.07962 3.95884 0.358483 2.24271C0.0521186 1.93723 -0.0797691 1.58683 0.0614606 1.1641C0.161201 0.865747 0.3681 0.665202 0.663198 0.554793C0.751415 0.521742 0.852721 0.5 0.946926 0.5H1.09205C1.15151 0.5 1.21114 0.507255 1.26668 0.528479C1.56824 0.643713 1.78047 0.879294 2.00378 1.10246C3.83125 2.92955 5.65927 4.75609 7.49031 6.57962C7.70358 6.79201 7.90666 7.00541 7.99084 7.30156C7.99731 7.32434 8 7.34801 8 7.3717V7.6641C8 7.66418 7.99993 7.66425 7.99985 7.66425Z"
          fill="#1C1C1F"
        />
      </svg>
    </Link>
  );
};

export default SidebarLink;
