"use client";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";

import { useNavigation } from "@/hooks/navigation/useNavigation";
import useAuthType from "@/stores/Auth/authType.store";

import styles from "./EmailConfirmation.module.scss";
import { CustomOneTimePasswordField } from "@/components/ui/CustomOneTimePasswordField/CustomOneTimePasswordField";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button/Button";
import { Timer } from "@/components/ui/Timer/Timer";

interface IProps {
  email: string;
}

const EmailConfirmation = ({ email }: IProps) => {
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [isNewCodeAvailable, setIsNewCodeAvailable] = useState<boolean>(false);

  useEffect(() => {
    console.log(confirmationCode);
  }, [confirmationCode]);

  const { reloadPage } = useNavigation();
  const setAuthType = useAuthType((state) => state.setAuthType);

  const handleReturnButton = () => {
    setAuthType("login");
    reloadPage();
  };

  return (
    <>
      <CustomTitle tag="h2" isCentered className={styles.title}>
        Введите код подтверждения
      </CustomTitle>

      <p className={styles.text}>
        Мы отправили его на почту <span className={styles.email}>{email}</span>
      </p>

      <CustomOneTimePasswordField
        value={confirmationCode}
        setValue={setConfirmationCode}
        className={styles.codeField}
      />

      <Button className={styles.submitButton}>Далее</Button>

      {isNewCodeAvailable ? (
        <Button className={styles.getNewCodeButton} style="outlined">
          Получить новый код
        </Button>
      ) : (
        <Timer
          duration={2}
          className={styles.timer}
          timerID="confirmationCode"
          handleFinish={() => setIsNewCodeAvailable(true)}
        />
      )}

      <button
        className={styles.returnButton}
        type="button"
        onClick={handleReturnButton}
      >
        Вернуться ко входу
      </button>
    </>
  );
};

export default EmailConfirmation;
