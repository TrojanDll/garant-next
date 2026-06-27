import NsApply from "@/components/widgets/NsApply/NsApply";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";
import type { Metadata } from "next";

import "react-day-picker/style.css";

export const metadata: Metadata = {
  title: "Оформить полис от несчастного случая в Абхазии онлайн",
  description:
    "Оформление полиса от несчастного случая в Абхазии онлайн. Укажите данные застрахованных, срок пребывания и рассчитайте стоимость страховки.",
};
export default function NsApplyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "От несчастного случая", href: PAGES.NS },
          { name: "Оформление", href: PAGES.NS_APPLY },
        ]}
      />
      <NsApply />
    </>
  );
}
