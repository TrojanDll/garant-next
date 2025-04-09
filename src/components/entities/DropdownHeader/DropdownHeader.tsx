"use client";

import Substrate from "@/components/ui/Substrate/Substrate";
import React, { useEffect, useRef } from "react";
import { useSidebarStore } from "./store";

import styles from "./DropdownHeader.module.scss";
import CustomLink from "@/components/ui/CustomLink/CustomLink";
import { PAGES } from "@/config/pages-url.config";
import Button from "@/components/ui/Button/Button";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

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

        <Button
          className={styles.dropdownDasboard}
          variant="dashboard"
          isLink={true}
          href={PAGES.DASHBOARD}
          onClickEvent={() => setIsDropdownOpened(false)}
        >
          <SvgSelector id={ESvgName.PROFILE} />

          <div>Личный кабинет</div>
        </Button>
      </div>
    </Substrate>
  );
};

export default DropdownHeader;
