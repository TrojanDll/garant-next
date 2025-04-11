import React from "react";
import { ChevronProps } from "react-day-picker";

import { ESvgName } from "@/constants/svg-ids.constants";

import SvgSelector from "../SvgSelector/SvgSelector";

import styles from "./CustomChevron.module.scss";

const CustomChevron = ({ orientation, className, size }: ChevronProps) => {
  return (
    <span
      className={`${styles.chevron} ${
        orientation === "left"
          ? styles.left
          : orientation === "down"
          ? styles.down
          : orientation === "up"
          ? styles.up
          : styles.right
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <SvgSelector fill="#3233F3" id={ESvgName.CHEVRON_CALENDAR} />
    </span>
  );
};

export default CustomChevron;
