"use client";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import styles from "./EmailVerify.module.scss";
import Substrate from "@/components/ui/Substrate/Substrate";
import { useParams, useSearchParams } from "next/navigation";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { useEffect, useState } from "react";
import Text from "@/components/ui/Text/Text";
import CustomLink from "@/components/ui/CustomLink/CustomLink";
import { PAGES } from "@/config/pages-url.config";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import Button from "@/components/ui/Button/Button";

export default function EmailVerify() {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);

  const params = useSearchParams();

  const { navigateToPolicies } = useNavigation();

  useEffect(() => {
    setIsVerified(params.get("verified") === "true" ? true : false);
    setMessage(params.get("message"));
    setIsProcessed(true);
  }, []);

  function refreshPageAndNavigateToAuth() {
    navigateToPolicies();
    // window.location.reload();
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refreshPageAndNavigateToAuth();
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  function confirmationTitle(): string {
    if (isProcessed) {
      if (isVerified) {
        return "Почта успешно подтверждена!";
      } else {
        return "Ошибка подтверждения почты";
      }
    }

    return "";
  }

  function confirmationDescription(): string {
    if (isProcessed) {
      if (isVerified) {
        return "Вы будете автоматически направлены на страницу входа через несколько секунд. Либо нажмите на ссылку ниже.";
      } else {
        return "Что-то пошло не так при подтверждении почты.";
      }
    }
    return "";
  }

  return (
    <ContentContainer>
      <Substrate className={styles.root} withShadow="light">
        <CustomTitle tag="h2" isCentered>
          {confirmationTitle()}
        </CustomTitle>

        <Text className={styles.description}>{confirmationDescription()}</Text>

        {isVerified && (
          <button
            className={styles.redirectButton}
            onClick={refreshPageAndNavigateToAuth}
          >
            Войти
          </button>
        )}
      </Substrate>
    </ContentContainer>
  );
}
