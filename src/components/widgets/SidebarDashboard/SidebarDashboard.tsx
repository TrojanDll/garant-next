"use client";

import React, { useState } from "react";

import styles from "./SidebarDashboard.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import SidebarLink from "@/components/ui/SidebarLink/SidebarLink";
import { PAGES } from "@/config/pages-url.config";
import LogoutButton from "@/components/ui/LogoutButton/LogoutButton";

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
  const [active, setActive] = useState(1);

  return (
    <Substrate withShadow="light" className={`${styles.substrate} ${className}`}>
      <nav>
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
