import React from "react";

import styles from "./BottomNavigationPanel.module.scss";
import Substrate from "@/components/ui/Substrate/Substrate";
import { PAGES } from "@/config/pages-url.config";
import Link from "next/link";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

interface IProps {
  className?: string;
}

const BottomNavigationPanel = ({ className }: IProps) => {
  return (
    <nav className={`${styles.root} ${className}`}>
      <Substrate className={styles.substrate}>
        <div className={styles.menuItems}>
          <Link href={PAGES.CARS}>
            <SvgSelector id={ESvgName.CAR} className={styles.meniItemIcon} />
            <div className={styles.meniItemText}>Мои авто</div>
          </Link>
        </div>
      </Substrate>
    </nav>
  );
};

export default BottomNavigationPanel;
