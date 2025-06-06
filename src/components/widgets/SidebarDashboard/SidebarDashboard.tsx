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
import { getActivePageIndex } from "@/helpers/getActivePageIndex";

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
  const setIsShadowVisible = useShadow((state) => state.setIsShadowVisible);
  const isShadowVisible = useShadow((state) => state.isShadowVisible);
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();

  const handleSidebarMenuButtonClick = () => {
    toggleIsShadowVisible();
    setIsOpened(!isOpened);
  };

  const handleSidebarLinkClick = () => {
    setIsShadowVisible(false);
    setIsOpened(false);
  };

  useEffect(() => {
    if (!isShadowVisible) {
      setIsOpened(false);
    }
  }, [isShadowVisible]);

  useEffect(() => {
    let activeIndex = getActivePageIndex(pathname);

    setActive(activeIndex);
  }, [pathname]);

  return (
    <Substrate
      withShadow="light"
      className={`${styles.substrate} ${className} ${isOpened ? styles.opened : ""}`}
    >
      <nav>
        <button
          onClick={handleSidebarMenuButtonClick}
          className={styles.sidebarMenuButton}
        >
          <svg
            width="21"
            height="17"
            viewBox="0 0 21 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.125 1.625H19.875M1.125 8.5H19.875M1.125 15.375H19.875"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {sidebarLinks.map((item, i) => (
          <SidebarLink
            className={styles.link}
            active={active === i}
            setActive={() => setActive(i)}
            key={item.text}
            href={item.href}
            onClick={handleSidebarLinkClick}
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
