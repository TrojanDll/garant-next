"use client";

import Substrate from "@/components/ui/Substrate/Substrate";
import React, { useEffect, useRef } from "react";
import { useSidebarStore } from "./store";

import styles from "./DropdownHeader.module.scss";
import CustomLink from "@/components/ui/CustomLink/CustomLink";
import { PAGES } from "@/config/pages-url.config";
import { text } from "stream/consumers";

type TDropdownLinks = {
  href: string;
  text: string;
};

const DropdownHeader = () => {
  const isDropdownOpened = useSidebarStore((state) => state.isOpened);
  const setIsDropdownOpened = useSidebarStore((state) => state.toggleIsOpened);

  const dropdownLinks: TDropdownLinks[] = [
    {
      href: PAGES.CALCULATOR,
      text: "Калькулятор стоимости",
    },
    {
      href: PAGES.OSAGO,
      text: "ОСАГО",
    },
    {
      href: PAGES.NS,
      text: "НС",
    },
    {
      href: PAGES.HELP,
      text: "Помощь",
    },
    {
      href: PAGES.CONTACTS,
      text: "Контакты",
    },
  ];

  return (
    <Substrate className={`${styles.dropdown} ${isDropdownOpened ? styles.open : ""}`}>
      <div className={styles.content}>
        {dropdownLinks.map((dropdownLink) => (
          <CustomLink
            key={dropdownLink.href}
            onClick={() => setIsDropdownOpened(false)}
            className={styles.link}
            href={dropdownLink.href}
          >
            {dropdownLink.text}
          </CustomLink>
        ))}
      </div>
    </Substrate>
  );
};

export default DropdownHeader;
