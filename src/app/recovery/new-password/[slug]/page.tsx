import RecoveryPassword from "@/components/widgets/RecoveryPassword/RecoveryPassword";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новый пароль",
  ...NO_INDEX_PAGE
};
export default function NewPasswordPage() {
  return <RecoveryPassword />;
}
