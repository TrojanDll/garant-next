import React from "react";

import { TInputType } from "@/types/IFieldConfig";
import { ESvgName } from "@/constants/svg-ids.constants";

import SvgSelector from "../SvgSelector/SvgSelector";
import Button from "../Button/Button";

import styles from "./InputAsideElement.module.scss";
import usePromocodeEvent from "@/stores/Promocode/promocodeEvent.store";

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
  const callTrigger = usePromocodeEvent((state) => state.callTrigger);

  function handleClick() {
    callTrigger();
    if (onClick) {
      onClick();
    }
  }

  return (
    <>
      {inputType === "date" && (
        <SvgSelector
          className={`${className} ${styles.calendar}`}
          id={ESvgName.CALENDAR}
        />
      )}

      {inputType === "promocode" && (
        <Button
          isLoading={isLoading}
          onClickEvent={handleClick}
          type="button"
          className={`${className} ${styles.promocode}`}
        >
          Применить
        </Button>
      )}

      {inputType === "password" && (
        <button className={`${className} ${styles.eye}`} type="button" onClick={onClick}>
          <SvgSelector
            className={`${isVisible ? styles.svgEyeOpened : styles.svgEyeClosed}`}
            id={isVisible ? ESvgName.EYE : ESvgName.EYE_CLOSED}
          />
        </button>
      )}
    </>
  );
};

export default InputAsideElement;
