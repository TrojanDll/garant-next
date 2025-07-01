import { IAudienceInfoItem } from "@/components/entities/AudienceInfoItem/audience-info-item.types";
import AudienceInfoBlock from "@/components/widgets/AudienceInfoBlock/AudienceInfoBlock";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";
import FAQ from "@/components/widgets/FAQ/FAQ";
import PolicyPromo from "@/components/widgets/PolicyPromo/PolicyPromo";
import ReviwesYandex from "@/components/widgets/ReviwesYandex/ReviwesYandex";
import type { Metadata } from "next";

const audienceItems: IAudienceInfoItem[] = [
  {
    title: "Любителям активного отдыха",
    description: "Увлекаетесь спортом или активно проводите время",
    imageAlt: "backpack",
    imageUrl: "/img/backpack.png",
  },
  {
    title: "Семьям с детьми",
    description:
      "Безопасность и защита от непредвиденных ситуаций для всей семьи",
    imageAlt: "baby_carriage",
    imageUrl: "/img/baby_carriage.png",
  },
  {
    title: "Пожилым туристам",
    description: "Защита от случайных травм и внезапных ухудшений здоровья",
    imageAlt: "elderly",
    imageUrl: "/img/elderly.png",
  },
];

export const metadata: Metadata = {
  title: "НС",
};
export default function NsPage() {
  return (
    <div>
      <DiscountBanner />
      <PolicyPromo variant="ns" />
      <AudienceInfoBlock audienceItems={audienceItems} />
      <ReviwesYandex />
      <FAQ isIsolated />
    </div>
  );
}
