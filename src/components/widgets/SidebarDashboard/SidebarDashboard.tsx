"use client";

import React, { useEffect, useState } from "react";

import styles from "./SidebarDashboard.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import SidebarLink from "@/components/ui/SidebarLink/SidebarLink";
import { PAGES } from "@/config/pages-url.config";
import LogoutButton from "@/components/ui/LogoutButton/LogoutButton";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import useShadow from "@/stores/Shadow/shadow.store";
import { usePathname } from "next/navigation";

interface ISidebarLink {
  text: string;
  href: string;
}

const sidebarLinks: ISidebarLink[] = [
  {
    href: PAGES.MY_POLICIES,
    text: "Мои полисы",
  },
  {
    href: PAGES.DASHBOARD,
    text: "Личные данные",
  },
  {
    href: PAGES.CARS,
    text: "Сохраненные авто",
  },
];

interface IProps {
  className?: string;
}

const SidebarDashboard = ({ className }: IProps) => {
  const [active, setActive] = useState<number>();
  const toggleIsShadowVisible = useShadow((state) => state.toggleIsShadowVisible);
  const isShadowVisible = useShadow((state) => state.isShadowVisible);
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();

  const handleSidebarMenuButtonClick = () => {
    toggleIsShadowVisible();
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    if (!isShadowVisible) {
      setIsOpened(false);
    }
  }, [isShadowVisible]);

  useEffect(() => {
    let activeIndex = 0;

    switch (pathname) {
      case PAGES.MY_POLICIES:
        activeIndex = 0;
        break;
      case PAGES.DASHBOARD:
        activeIndex = 1;
        break;
      case PAGES.EDIT_PERSONAL_DATA:
        activeIndex = 1;
        break;
      case PAGES.CARS:
        activeIndex = 2;
        break;
    }
    setActive(activeIndex);
  }, [pathname]);

  return (
    <Substrate
      withShadow="light"
      className={`${styles.substrate} ${className} ${isOpened ? styles.opened : ""}`}
    >
      <nav>
        <button onClick={handleSidebarMenuButtonClick} className={styles.sidebarMenuButton}>
          <SvgSelector
            id={ESvgName.CHEVRON_DOWN}
            className={`${styles.titleChevron} ${isOpened ? styles.titleChevronOpened : ""}`}
          />
          <h2 className={styles.sidebarTitle}>Меню</h2>
        </button>

        {sidebarLinks.map((item, i) => (
          <SidebarLink
            className={styles.link}
            active={active === i}
            setActive={() => setActive(i)}
            key={item.text}
            href={item.href}
          >
            {item.text}
          </SidebarLink>
        ))}

        <LogoutButton className={styles.logout} />
      </nav>
    </Substrate>
  );
};

export default SidebarDashboard;
