import React, { PropsWithChildren } from "react";

import SvgSelector from "../SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

import styles from "./InputNotification.module.scss";

interface IProps {
  variant: "success" | "error";
  className?: string;
}

const InputNotification = ({ variant, children, className }: PropsWithChildren<IProps>) => {
  return (
    <div
      className={`${variant === "success" ? styles.success : styles.error} ${className} ${
        styles.root
      }`}
    >
      <SvgSelector
        className={`${variant === "success" ? styles.successSvg : styles.errorSvg}`}
        id={variant === "success" ? ESvgName.CHECKMARK : ESvgName.ATTENTION}
      />
      {children}
    </div>
  );
};

export default InputNotification;
