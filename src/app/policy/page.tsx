import PrivacyPolicy from "@/components/widgets/PrivacyPolicy/PrivacyPolicy";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности – garant-abh.com",
  description:
    "Политика конфиденциальности сайта garant-abh.com: порядок обработки персональных данных, цели сбора информации и меры по защите данных пользователей.",
};
export default function PolicyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "Политика конфиденциальности", href: PAGES.POLICY },
        ]}
      />
      <PrivacyPolicy />
    </>
  );
}
