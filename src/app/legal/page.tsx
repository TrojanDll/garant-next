import Legal from "@/components/widgets/Legal/Legal";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Правовая информация – «Гарант-Страхование»",
  description:
    "Правовая информация о компании «Гарант-Страхование»: реквизиты, юридический и фактический адрес, данные по поддержке и реализации сервиса.",
};

export default function LegalPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "Правовая информация", href: PAGES.LEGAL },
        ]}
      />
      <Legal />
    </>
  );
}
