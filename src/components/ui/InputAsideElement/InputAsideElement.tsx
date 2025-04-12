import React from "react";

import { TInputType } from "@/types/IFieldConfig";
import { ESvgName } from "@/constants/svg-ids.constants";

import SvgSelector from "../SvgSelector/SvgSelector";
import Button from "../Button/Button";

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
          className={`${className} ${styles.calendar}`}
          id={ESvgName.CALENDAR}
        />
      )}

      {inputType === "promocode" && (
        <Button className={`${className} ${styles.promocode}`}>Применить</Button>
      )}
    </>
  );
};

export default InputAsideElement;
