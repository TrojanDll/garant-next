import React, { PropsWithChildren } from "react";

import styles from "./FilterOptionButton.module.scss";

interface IProps {
  isActive?: boolean;
  onClick?: () => void;
}

const FilterOptionButton = ({
  children,
  isActive = false,
  onClick,
}: PropsWithChildren<IProps>) => {
  return (
    <button
      className={`${styles.root} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FilterOptionButton;
