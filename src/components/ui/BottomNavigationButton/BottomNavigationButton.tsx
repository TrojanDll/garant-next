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
  return (
    <Link href={href} className={`${styles.root} ${className}`}>
      <Icon className={`${styles.icon} ${active ? "activeIcon" : ""}`} />
      <div className={`${styles.text} ${active ? "activeLabel" : ""}`}>{label}</div>
    </Link>
  );
};

export default BottomNavigationButton;
