import Advantages from "@/components/widgets/Advantages/Advantages";
import AudienceInfoBlock from "@/components/widgets/AudienceInfoBlock/AudienceInfoBlock";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";
import FAQ from "@/components/widgets/FAQ/FAQ";
import PolicyPromo from "@/components/widgets/PolicyPromo/PolicyPromo";
import ReviwesYandex from "@/components/widgets/ReviwesYandex/ReviwesYandex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Осаго",
};
export default function OsagoPage() {
  return (
    <div>
      <DiscountBanner />
      <PolicyPromo variant="osago" />
      <AudienceInfoBlock />
      <ReviwesYandex />
      <FAQ />
    </div>
  );
}
