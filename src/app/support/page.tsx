import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Support from "@/components/widgets/Support/Support";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Помощь и ответы на вопросы – страховка и ОСАГО в Абхазии",
  description:
    "Ответы на частые вопросы по ОСАГО в Абхазии: оформление полиса онлайн, оплата, получение документа, страховой случай и необходимые документы.",
};
export default function SupportPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "Помощь", href: PAGES.SUPPORT },
        ]}
      />
      <Support />
    </>
  );
}
