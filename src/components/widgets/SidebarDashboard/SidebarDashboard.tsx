"use client";

import React, { useState } from "react";

import styles from "./SidebarDashboard.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import SidebarLink from "@/components/ui/SidebarLink/SidebarLink";
import { PAGES } from "@/config/pages-url.config";

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

const SidebarDashboard = () => {
  const [active, setActive] = useState(1);

  return (
    <Substrate withShadow="light" className={styles.substrate}>
      <nav>
        {sidebarLinks.map((item, i) => (
          <SidebarLink
            active={active === i}
            setActive={() => setActive(i)}
            key={item.text}
            href={item.href}
          >
            {item.text}
          </SidebarLink>
        ))}
      </nav>
    </Substrate>
  );
};

export default SidebarDashboard;
