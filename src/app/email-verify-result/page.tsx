import EmailVerify from "@/components/widgets/EmailVerify/EmailVerify";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Подтверждение",
};

export default function EmailVerifyPage() {
  return <EmailVerify />;
}
