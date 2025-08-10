"use client";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";

import { useNavigation } from "@/hooks/navigation/useNavigation";
import useAuthType from "@/stores/Auth/authType.store";

import styles from "./EmailConfirmation.module.scss";
import { CustomOneTimePasswordField } from "@/components/ui/CustomOneTimePasswordField/CustomOneTimePasswordField";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button/Button";
import { Timer } from "@/components/ui/Timer/Timer";
import { useGetNewVerificationCode } from "@/hooks/auth/useGetNewVerificationCode";
import toast from "react-hot-toast";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
import IconArrowLeft from "@/assets/icons/IconArrowLeft";

interface IProps {
  email: string;
  isMustRedirect?: boolean;
  isModal?: boolean;
  handleReturnButtonClick?: () => void;
}

const EmailConfirmation = ({
  email,
  isMustRedirect = false,
  isModal = false,
  handleReturnButtonClick,
}: IProps) => {
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [isNewCodeAvailable, setIsNewCodeAvailable] = useState<boolean>(false);
  const [isErrorMessageVisible, setIsErrorMessageVisible] =
    useState<boolean>(false);

  useEffect(() => {
    setIsErrorMessageVisible(false);
  }, [confirmationCode]);

  const { navigateToHome } = useNavigation();

  const {
    mutate: getNewVerificationCode,
    isPending: isGetNewVerificationCodePending,
    isSuccess: isGetNewVerificationCodeSuccess,
    isError: isGetNewVerificationCodeError,
  } = useGetNewVerificationCode();
  const {
    mutate: verifyEmail,
    isPending: isVerifyEmailPending,
    isSuccess: isVerifyEmailSuccess,
    isError: isVerifyEmailError,
    data: verifyEmailData,
  } = useVerifyEmail();

  const { reloadPage } = useNavigation();
  const setAuthType = useAuthType((state) => state.setAuthType);

  function handleReturnButton() {
    if (handleReturnButtonClick) {
      handleReturnButtonClick();
    } else {
      setAuthType("login");
      reloadPage();
    }
  }

  function handleNewCodeButton() {
    setIsNewCodeAvailable(false);
    getNewVerificationCode({ email: email });
  }

  useEffect(() => {
    if (isGetNewVerificationCodePending) {
      toast.loading("Отправка кода");
    } else {
      toast.dismiss();
    }

    if (isGetNewVerificationCodeSuccess) {
      toast.success("Новый код отправлен!");
    } else if (isGetNewVerificationCodeError) {
      toast.error("Ошибка отправки кода");
    }
  }, [isGetNewVerificationCodePending]);

  function handleVerifyEmailButtonClick() {
    verifyEmail({ email: email, code: confirmationCode });
  }

  useEffect(() => {
    let timoutId: NodeJS.Timeout;

    if (isVerifyEmailPending) {
      toast.loading("Проверка кода");
    } else {
      toast.dismiss();
    }

    if (isVerifyEmailSuccess) {
      toast.success("Код подтвержден!");
      if (isMustRedirect) {
        timoutId = setTimeout(() => {
          navigateToHome();
        }, 2000);
      }
    } else if (isVerifyEmailError) {
      setIsErrorMessageVisible(true);
    }

    return () => {
      clearTimeout(timoutId);
    };
  }, [isVerifyEmailPending]);

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
        isError={isErrorMessageVisible}
      />

      {isErrorMessageVisible && (
        <div className={styles.errorMessage}>
          Неверный код, попробуйте снова
        </div>
      )}

      <Button
        onClickEvent={handleVerifyEmailButtonClick}
        className={styles.submitButton}
      >
        Далее
      </Button>

      {isNewCodeAvailable ? (
        <Button
          onClickEvent={handleNewCodeButton}
          className={styles.getNewCodeButton}
          style="outlined"
        >
          Получить новый код
        </Button>
      ) : (
        <div className={styles.timerWrapper}>
          Получить новый код через{" "}
          <Timer
            duration={60}
            className={styles.timer}
            timerID="confirmationCode"
            handleFinish={() => setIsNewCodeAvailable(true)}
          />
        </div>
      )}

      <button
        className={styles.returnButton}
        type="button"
        onClick={handleReturnButton}
      >
        <IconArrowLeft className={styles.iconArrowLeft} />
        {isModal ? <>Вернуться к регистрации</> : <>Вернуться ко входу</>}
      </button>
    </>
  );
};

export default EmailConfirmation;
