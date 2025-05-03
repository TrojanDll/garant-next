import React, { PropsWithChildren, RefObject } from "react";
import styles from "./Substrate.module.scss";

interface ISubstrateProps {
  widthType?: "fit" | "full" | "window";
  className?: string;
  ref?: RefObject<HTMLDivElement | null>;
  withShadow?: "light" | "deep";
  bordered?: boolean;
}

const Substrate = ({
  children,
  widthType,
  className,
  ref,
  withShadow,
  bordered = false
}: PropsWithChildren<ISubstrateProps>) => {
  return (
    <div
      ref={ref}
      className={`${styles.substrate} ${
        widthType === "fit" ? styles.fit : widthType === "window" ? styles.window : styles.full
      } ${className ? className : ""}
      ${
        withShadow === "light"
          ? styles.withLightShadow
          : withShadow === "deep"
          ? styles.withDeepShadow
          : ""
      } ${bordered && styles.bordered}`}
    >
      {children}
    </div>
  );
};

export default Substrate;
