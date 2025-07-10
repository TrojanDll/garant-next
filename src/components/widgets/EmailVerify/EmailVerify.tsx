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

export default function EmailVerify() {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);

  const params = useSearchParams();

  const { navigateToDashboard } = useNavigation();

  useEffect(() => {
    setIsVerified(params.get("verified") === "true" ? true : false);
    setMessage(params.get("message"));
    setIsProcessed(true);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigateToDashboard();
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
        return "Вы будете автоматически направлены в личный кабинет. Либо нажмите на ссылку ниже.";
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
          <CustomLink
            href={PAGES.DASHBOARD}
            variant="underline"
            className={styles.redirectLink}
          >
            Личный кабинет
          </CustomLink>
        )}
      </Substrate>
    </ContentContainer>
  );
}
