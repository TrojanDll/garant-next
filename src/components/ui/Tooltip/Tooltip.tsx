"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./Tooltip.module.scss";
import SvgSelector from "../SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

interface IProps {
  text: string;
  className?: string;
}

const Tooltip = ({ text, className }: IProps) => {
  const [isTooltopVisible, setIsTooltopVisible] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsTooltopVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTooltopVisible]);

  const toggleTooltip = () => {
    setIsTooltopVisible(!isTooltopVisible);
  };

  return (
    <div
      ref={wrapperRef}
      onClick={toggleTooltip}
      // onMouseEnter={toggleTooltip}
      // onMouseLeave={toggleTooltip}
      className={`${styles.root} ${className}`}
    >
      <button type="button" className={styles.button}>
        <SvgSelector className={styles.svg} id={ESvgName.TOOLTIP} />
      </button>
      <div className={`${styles.tooltip} ${isTooltopVisible ? styles.visible : ""}`}>
        {text}
        <svg
          className={styles.triangle}
          width="13"
          height="9"
          viewBox="0 0 13 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.5 9L0.00480938 0.75H12.9952L6.5 9Z" fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default Tooltip;
