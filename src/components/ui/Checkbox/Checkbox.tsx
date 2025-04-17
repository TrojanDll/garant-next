import React from "react";

import styles from "./Checkbox.module.scss";

interface IProps {
  value: boolean;
  setValue: (value: boolean) => void;
  isError?: boolean;
  className?: string;
  errorMessage?: string;
}

const Checkbox = ({ value, setValue, isError = false, errorMessage }: IProps) => {
  return (
    <div className={styles.root}>
      <input className={styles.checkbox} type="checkbox" checked={!!value} readOnly />
      <span
        className={`${styles.field} ${isError ? styles.error : ""} ${value ? styles.checked : ""}`}
        onClick={() => setValue(!value)}
      >
        <svg
          width="19"
          height="16"
          className={styles.svg}
          viewBox="0 0 19 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.8511 1.0236C16.7938 1.04209 16.6786 1.10798 16.5953 1.16997C16.5061 1.23634 14.479 3.62976 11.6693 6.98598C7.13048 12.4078 6.89227 12.6859 6.84257 12.6222C6.81383 12.5854 5.80781 11.4612 4.60699 10.1241C2.18594 7.42828 2.30908 7.54485 1.88248 7.54485C1.22872 7.54485 0.804467 8.25842 1.09109 8.87586C1.13221 8.96453 2.15611 10.1308 3.77151 11.9292C6.59209 15.0693 6.48496 14.9629 6.86157 14.9966C7.1167 15.0194 7.34 14.9285 7.55496 14.7142C7.85457 14.4155 17.8378 2.47208 17.9085 2.32775C18.1901 1.75289 17.7881 1.03914 17.1619 1.00213C17.0484 0.995431 16.9086 1.00508 16.8511 1.0236Z"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
      </span>
    </div>
  );
};

export default Checkbox;
