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
  isVisible?: boolean;
}

const InputAsideElement = ({
  inputType,
  className,
  onClick,
  isLoading = true,
  isVisible = false,
}: IProps) => {
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

      {inputType === "password" && (
        <button className={`${className} ${styles.eye}`} type="button" onClick={onClick}>
          <SvgSelector id={isVisible ? ESvgName.EYE : ESvgName.EYE_CLOSED} />
        </button>
      )}
    </>
  );
};

export default InputAsideElement;
