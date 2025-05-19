import React, { PropsWithChildren } from "react";

import styles from "./FilterOptionButton.module.scss";

interface IProps {
  isActive?: boolean;
}

const FilterOptionButton = ({ children, isActive = false }: PropsWithChildren<IProps>) => {
  return (
    <button className={`${styles.root} ${isActive ? styles.active : ""}`}>
      {children}
    </button>
  );
};

export default FilterOptionButton;
