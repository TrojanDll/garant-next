import { IAudienceInfoItem } from "@/components/entities/AudienceInfoItem/audience-info-item.types";
import AudienceInfoBlock from "@/components/widgets/AudienceInfoBlock/AudienceInfoBlock";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";
import FAQ from "@/components/widgets/FAQ/FAQ";
import PolicyPromo from "@/components/widgets/PolicyPromo/PolicyPromo";
import ReviwesYandex from "@/components/widgets/ReviwesYandex/ReviwesYandex";
import type { Metadata } from "next";

const audienceItems: IAudienceInfoItem[] = [
  {
    title: "Соблюдение закона",
    description: "Оформите заранее, чтобы избежать штрафов и проблем на дороге",
    imageAlt: "scales",
    imageUrl: "/img/scales.png",
  },
  {
    title: "Финансовая безопасность",
    description:
      "Страховка покроет ущерб третьим лицам и защитит вас от расходов",
    imageAlt: "cash",
    imageUrl: "/img/cash.png",
  },
  {
    title: "Спокойствие в поездке",
    description:
      "Наслаждайтесь путешествием в безопасности и без лишних хлопот",
    imageAlt: "meditation",
    imageUrl: "/img/meditation.png",
  },
];

export const metadata: Metadata = {
  title: "Осаго",
};
export default function OsagoPage() {
  return (
    <div>
      <DiscountBanner />
      <PolicyPromo variant="osago" />
      <AudienceInfoBlock
        title="Почему нужно оформить ОСАГО?"
        audienceItems={audienceItems}
      />
      <ReviwesYandex />
      <FAQ isIsolated />
    </div>
  );
}
