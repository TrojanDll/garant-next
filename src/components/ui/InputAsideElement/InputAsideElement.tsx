import React from "react";

import { TInputType } from "@/types/IFieldConfig";
import { ESvgName } from "@/constants/svg-ids.constants";

import SvgSelector from "../SvgSelector/SvgSelector";
import Button from "../Button/Button";

import styles from "./InputAsideElement.module.scss";

interface IProps {
  inputType: TInputType;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const InputAsideElement = ({ inputType, className, onClick, isLoading = true }: IProps) => {
  return (
    <>
      {inputType === "date" && (
        <SvgSelector className={`${className} ${styles.calendar}`} id={ESvgName.CALENDAR} />
      )}

      {inputType === "promocode" && (
        <Button onClickEvent={onClick} type="button" className={`${className} ${styles.promocode}`}>
          {isLoading ? <div className={styles.loader}></div> : "Применить"}
        </Button>
      )}
    </>
  );
};

export default InputAsideElement;
