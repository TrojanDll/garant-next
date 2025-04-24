import React from "react";

import styles from "./GoBackLink.module.scss";

import { useNavigation } from "@/hooks/navigation/useNavigation";

interface IProps {
  className?: string;
}

const GoBackLink = ({ className }: IProps) => {
  const { goBack } = useNavigation();
  return (
    <button onClick={() => goBack()} className={`${styles.button} ${className}`}>
      <svg
        width="26"
        height="25"
        className={styles.svg}
        viewBox="0 0 26 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.791 5.46875L9.75977 12.5L16.791 19.5312"
          stroke="#3233F3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Назад
    </button>
  );
};

export default GoBackLink;
