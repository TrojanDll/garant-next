import React, { PropsWithChildren } from "react";
import styles from "./ContentContainer.module.scss";

const ContentContainer = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};

export default ContentContainer;
