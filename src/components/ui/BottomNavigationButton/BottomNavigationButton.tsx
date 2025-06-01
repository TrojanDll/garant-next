import React from "react";

import styles from "./BottomNavigationButton.module.scss";

import Link from "next/link";

interface IProps {
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
  href: string;
  className?: string;
}

const BottomNavigationButton = ({ Icon, label, active, href, className }: IProps) => {
  // console.log(active);

  return (
    <Link
      href={href}
      className={`${styles.root} ${active ? `${styles.active}` : ""} ${className}`}
    >
      <Icon className={`${styles.icon}`} />
      <div className={`${styles.text}`}>{label}</div>
    </Link>
  );
};

export default BottomNavigationButton;
