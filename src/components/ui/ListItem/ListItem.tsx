import React from "react";

import styles from "./ListItem.module.scss";

interface IProps {
  className?: string;
  item: React.ReactNode;
}

const ListItem = ({ item, className }: IProps) => {
  return <li className={`${styles.root} ${className}`}>{item}</li>;
};

export default ListItem;
