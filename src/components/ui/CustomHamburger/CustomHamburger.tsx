"use client";

import { useSidebarStore } from "@/components/entities/DropdownHeader/store";
import React from "react";
import SvgSelector from "../SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

import styles from "./CustomHamburger.module.scss"

interface IProps {
  className?: string;
}

const CustomHamburger = ({ className }: IProps) => {
  const setIsDropdownOpened = useSidebarStore((state) => state.toggleIsOpened);
  const isDropdownOpened = useSidebarStore((state) => state.isOpened);

  return (
    <button className={`${className} ${styles.hamburger} ${isDropdownOpened ? styles.opened : ""}`} onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
      {isDropdownOpened ? (
        <SvgSelector id={ESvgName.CLOSE} />
      ) : (
        <SvgSelector id={ESvgName.HAMBURGER} />
      )}
      
    </button>
  );
};

export default CustomHamburger;
