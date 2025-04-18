import React from "react";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";

import { useNavigation } from "@/hooks/navigation/useNavigation";
import useAuthType from "@/stores/Auth/authType.store";

import styles from "./EmailConfirmation.module.scss";

const EmailConfirmation = () => {
  const { reloadPage } = useNavigation();
  const setAuthType = useAuthType((state) => state.setAuthType);

  const handleReturnButton = () => {
    setAuthType("login");
    reloadPage();
  };
  return (
    <>
      <CustomTitle tag="h2" isCentered className={styles.title}>
        Почти готово!
      </CustomTitle>

      <p className={styles.text}>
        Мы отправили письмо с подтверждением на ваш Email. Перейдите по ссылке в письме, чтобы
        завершить регистрацию.
      </p>

      <button className={styles.returnButton} type="button" onClick={handleReturnButton}>
        Вернуться ко входу
      </button>
    </>
  );
};

export default EmailConfirmation;
