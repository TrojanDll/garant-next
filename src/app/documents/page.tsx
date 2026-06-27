import Documents from "@/components/widgets/Documents/Documents";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Документы и лицензия – «Гарант-Страхование» в Абхазии",
  description:
    "Лицензия на страховую деятельность и нормативные документы Республики Абхазия по ОСАГО, обязательному страхованию и страхованию от несчастных случаев.",
};
export default function DocumentsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "Документы", href: PAGES.DOCUMENTS },
        ]}
      />
      <Documents />
    </>
  );
}
