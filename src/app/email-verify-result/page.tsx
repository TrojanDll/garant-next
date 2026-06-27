import EmailVerify from "@/components/widgets/EmailVerify/EmailVerify";
import type { Metadata } from "next";
import { Suspense } from "react";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "Подтверждение",
  ...NO_INDEX_PAGE,
};

export default function EmailVerifyPage() {
  return (
    <Suspense>
      <EmailVerify />
    </Suspense>
  );
}
