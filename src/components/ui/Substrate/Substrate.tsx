import React, { PropsWithChildren, RefObject } from "react";
import styles from "./Substrate.module.scss";

interface ISubstrateProps {
  widthType?: "fit" | "full";
  className?: string;
  ref?: RefObject<HTMLDivElement | null>;
  withShadow?: "light" | "deep";
}

const Substrate = ({
  children,
  widthType,
  className,
  ref,
  withShadow,
}: PropsWithChildren<ISubstrateProps>) => {
  return (
    <div
      ref={ref}
      className={`${styles.substrate} ${widthType === "fit" ? styles.fit : styles.full} ${
        className ? className : ""
      }
      ${
        withShadow === "light"
          ? styles.withLightShadow
          : withShadow === "deep"
          ? styles.withDeepShadow
          : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Substrate;
