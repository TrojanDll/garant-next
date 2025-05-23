"use client";

import Substrate from "@/components/ui/Substrate/Substrate";
import React, { useEffect } from "react";

import { useSidebarStore } from "../../../stores/Header/store";

import CustomLink from "@/components/ui/CustomLink/CustomLink";
import Button from "@/components/ui/Button/Button";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";

import { ESvgName } from "@/constants/svg-ids.constants";

import { PAGES } from "@/config/pages-url.config";

import Link from "next/link";

import styles from "./DropdownHeader.module.scss";

type TDropdownLinks = {
  href: string;
  text: string;
};

const DropdownHeader = () => {
  const isDropdownOpened = useSidebarStore((state) => state.isOpened);
  const setIsDropdownOpened = useSidebarStore((state) => state.toggleIsOpened);

  useEffect(() => {
    if (isDropdownOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDropdownOpened]);

  const dropdownLinks: TDropdownLinks[] = [
    {
      href: PAGES.HOME,
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
      href: PAGES.SUPPORT,
      text: "Помощь",
    },
    {
      href: PAGES.CONTACTS,
      text: "Контакты",
    },
  ];

  const handleLayotClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsDropdownOpened(false);
    }
  };

  return (
    <div
      onClick={(e) => handleLayotClick(e)}
      className={`${styles.layout} ${isDropdownOpened ? styles.layoutOpen : ""}`}
    >
      <Substrate className={`${styles.dropdown} ${isDropdownOpened ? styles.open : ""}`}>
        <div>
          <button
            className={styles.close}
            onClick={() => setIsDropdownOpened(false)}
            type="button"
          >
            <SvgSelector id={ESvgName.CLOSE} />
          </button>

          <Link onClick={() => setIsDropdownOpened(false)} href={PAGES.HOME}>
            <SvgSelector className={styles.logo} id={ESvgName.LOGO} />
          </Link>

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
              href={PAGES.MY_POLICIES}
              onClickEvent={() => setIsDropdownOpened(false)}
            >
              <SvgSelector id={ESvgName.PROFILE} />

              <div>Личный кабинет</div>
            </Button>
          </div>
        </div>
      </Substrate>
    </div>
  );
};

export default DropdownHeader;
