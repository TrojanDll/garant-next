import { Switch } from "radix-ui";
import styles from "./CustomSwitch.module.scss";

interface IProps {
  className?: string;
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
}

export function CustomSwitch({ className, isChecked, setIsChecked }: IProps) {
  return (
    <Switch.Root
      checked={isChecked}
      onCheckedChange={setIsChecked}
      className={`${className} ${styles.root}`}
    >
      <Switch.Thumb className={styles.thumb} />
    </Switch.Root>
  );
}
