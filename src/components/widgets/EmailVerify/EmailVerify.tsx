"use client";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import styles from "./EmailVerify.module.scss";
import Substrate from "@/components/ui/Substrate/Substrate";
import { useParams, useSearchParams } from "next/navigation";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { useEffect, useState } from "react";

export default function EmailVerify() {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);

  const params = useSearchParams();

  useEffect(() => {
    setIsVerified(params.get("verified") === "true" ? true : false);
    setMessage(params.get("message"));
    setIsProcessed(true);
  }, []);

  function confirmationTitle(): string {
    if (isProcessed) {
      if (isVerified) {
        return "Почта успешно подтверждена";
      } else {
        return "Ошибка подтверждения почты";
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
      </Substrate>
    </ContentContainer>
  );
}
