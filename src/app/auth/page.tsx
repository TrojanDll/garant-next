import Auth from "@/components/widgets/Auth/Auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет - страховка в Абхазии | Гарант-Страхование",
  description: "Войдите в личный кабинет, чтобы оформить страховку в Абхазию, скачать полис, оплатить и проверить статус онлайн.",
};

export default function HelpPage() {
  return <Auth />;
}
