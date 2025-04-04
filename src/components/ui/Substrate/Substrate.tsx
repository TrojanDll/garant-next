import React, { PropsWithChildren } from "react";
import styles from "./Substrate.module.scss";

interface ISubstrateProps {
  widthType?: "fit" | "full";
}

const Substrate = ({ children, widthType }: PropsWithChildren<ISubstrateProps>) => {
  return (
    <div className={`${styles.substrate} ${widthType === "fit" ? styles.fit : styles.full}`}>
      {children}
    </div>
  );
};

export default Substrate;
