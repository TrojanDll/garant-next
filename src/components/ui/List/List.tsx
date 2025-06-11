import React from "react";

import styles from "./List.module.scss";
import ListItem from "../ListItem/ListItem";

interface IProps {
  items: React.ReactNode[];
  className?: string;
  separated?: boolean;
}

const List = ({ items, className, separated }: IProps) => {
  return (
    <ol className={`${styles.root} ${className} ${separated ? styles.separated : ""}`}>
      {items.map((item, i) => (
        <ListItem item={item} key={i} className={styles.listItem} />
      ))}
    </ol>
  );
};

export default List;
