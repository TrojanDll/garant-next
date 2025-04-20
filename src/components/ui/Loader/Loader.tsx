import React from "react";

import styles from "./Loader.module.scss";

interface IProps {
  className?: string;
}

const Loader = ({ className }: IProps) => {
  return <span className={`${styles.loader} ${className}`}></span>;
};

export default Loader;
