import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании «Гарант-Страхование» – страхование в Абхазии",
  description:
    "Страховая компания «Гарант-Страхование» в Абхазии. Информация о компании, страховых продуктах, контактах и онлайн-оформлении полисов.",
};
export default function AboutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "О компании", href: PAGES.ABOUT },
        ]}
      />
      <ContentContainer>
        <div>AboutPage</div>
      </ContentContainer>
    </>
  );
}
