import EmailVerify from "@/components/widgets/EmailVerify/EmailVerify";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Подтверждение",
};

export default function EmailVerifyPage() {
  return (
    <Suspense>
      <EmailVerify />
    </Suspense>
  );
}
