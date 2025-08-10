import styles from "./CustomOneTimePasswordField.module.scss";

import { unstable_OneTimePasswordField as OneTimePasswordField } from "radix-ui";

interface IProps {
  className?: string;
  isError?: boolean;
  value: string;
  setValue: (value: string) => void;
}

export function CustomOneTimePasswordField({
  className,
  setValue,
  value,
  isError = false,
}: IProps) {
  return (
    <OneTimePasswordField.Root
      value={value}
      onValueChange={setValue}
      className={`${styles.root} ${className} ${isError ? styles.error : ""}`}
    >
      <OneTimePasswordField.Input className={styles.input} />
      <OneTimePasswordField.Input className={styles.input} />
      <OneTimePasswordField.Input className={styles.input} />
      <OneTimePasswordField.Input className={styles.input} />
      <OneTimePasswordField.HiddenInput />
    </OneTimePasswordField.Root>
  );
}
