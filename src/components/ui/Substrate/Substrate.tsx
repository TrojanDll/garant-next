import React, { PropsWithChildren, RefObject } from "react";
import styles from "./Substrate.module.scss";

interface ISubstrateProps {
  widthType?: "fit" | "full";
  className?: string;
  ref?: RefObject<HTMLDivElement | null>
}

const Substrate = ({ children, widthType, className, ref }: PropsWithChildren<ISubstrateProps>) => {
  return (
    <div
    ref={ref}
      className={`${styles.substrate} ${widthType === "fit" ? styles.fit : styles.full} ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Substrate;
