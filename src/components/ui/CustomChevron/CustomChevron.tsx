import React from "react";

import styles from "./CustomChevron.module.scss";
import SvgSelector from "../SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import { ChevronProps } from "react-day-picker";

// interface IProps {
//   className?: string | undefined;
//   size?: number | undefined;
//   disabled?: boolean | undefined;
//   orientation?: "left" | "right" | "up" | "down" | undefined;
// }

const CustomChevron = ({ orientation, className, disabled, size }: ChevronProps) => {
  return (
    <span
      className={`${styles.chevron} ${
        orientation === "left" ? styles.left : styles.right
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <SvgSelector id={ESvgName.CHEVRON_DOWN} />
    </span>
  );
};

export default CustomChevron;
