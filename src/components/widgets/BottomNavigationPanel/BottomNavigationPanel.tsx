"use client";

import React, { useEffect, useState } from "react";

import styles from "./BottomNavigationPanel.module.scss";
import Substrate from "@/components/ui/Substrate/Substrate";
import { PAGES } from "@/config/pages-url.config";
import BottomNavigationButton from "@/components/ui/BottomNavigationButton/BottomNavigationButton";
import IconCar from "@/assets/icons/IconCar";
import IconPolicy from "@/assets/icons/IconPolicy";
import IconProfileRounded from "@/assets/icons/IconProfileRounded";
import { usePathname } from "next/navigation";
import { getActivePageIndex } from "@/helpers/getActivePageIndex";

interface IBottomNavigationButtonsData {
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
}

const bottomNavigationButtonsData: IBottomNavigationButtonsData[] = [
  {
    href: PAGES.CARS,
    Icon: IconCar,
    label: "Мои авто",
  },
  {
    href: PAGES.MY_POLICIES,
    Icon: IconPolicy,
    label: "Мои полисы",
  },
  {
    href: PAGES.DASHBOARD,
    Icon: IconProfileRounded,
    label: "Профиль",
  },
];

interface IProps {
  className?: string;
}

const BottomNavigationPanel = ({ className }: IProps) => {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const pathName = usePathname();

  useEffect(() => {
    const CARS_INDEX = 0;
    const MY_POLICIES_INDEX = 1;
    const DASHBOARD_INDEX = 2;

    let activeIndex = 0;

    if (pathName === PAGES.MY_POLICIES) {
      activeIndex = MY_POLICIES_INDEX;
    } else if (pathName === PAGES.DASHBOARD || pathName === PAGES.EDIT_PERSONAL_DATA) {
      activeIndex = DASHBOARD_INDEX;
    } else if (pathName.startsWith(PAGES.CARS)) {
      activeIndex = CARS_INDEX;
    }

    setActivePageIndex(activeIndex);
  });

  return (
    <nav className={`${styles.root} ${className}`}>
      <Substrate className={styles.substrate}>
        <div className={styles.menuItems}>
          {bottomNavigationButtonsData.map((data, i) => (
            <BottomNavigationButton
              key={`${data.href}${i}`}
              Icon={data.Icon}
              label={data.label}
              href={data.href}
              active={i === activePageIndex}
            />
          ))}
        </div>
      </Substrate>
    </nav>
  );
};

export default BottomNavigationPanel;
