import React from "react";

import { TInputType } from "@/types/IFieldConfig";
import SvgSelector from "../SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

import styles from "./InputAsideElement.module.scss";

interface IProps {
  inputType: TInputType;
  className?: string;
}

const InputAsideElement = ({ inputType, className }: IProps) => {
  return (
    <>
      {inputType === "date" && (
        <SvgSelector
          className={`${className} ${styles.calendar} ${styles.item}`}
          id={ESvgName.CALENDAR}
        />
      )}
    </>
  );
};

export default InputAsideElement;
