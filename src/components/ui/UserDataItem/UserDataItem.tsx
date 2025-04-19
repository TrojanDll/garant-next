import React from "react";

import styles from "./UserDataItem.module.scss";

interface IProps {
  title: string | undefined;
  value: string | undefined;
  className?: string;
}

const UserDataItem = ({ title, value, className }: IProps) => {
  return (
    <li className={`${styles.userDataItem} ${className}`}>
      <span className={styles.userDataTitle}>{title}</span>
      <span className={styles.userDataInfo}>{value ? value : "---"}</span>
    </li>
  );
};

export default UserDataItem;
