import AudienceInfoBlock from "@/components/widgets/AudienceInfoBlock/AudienceInfoBlock";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";
import FAQ from "@/components/widgets/FAQ/FAQ";
import PolicyPromo from "@/components/widgets/PolicyPromo/PolicyPromo";
import ReviwesYandex from "@/components/widgets/ReviwesYandex/ReviwesYandex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "НС",
};
export default function NsPage() {
  return (
    <div>
      <DiscountBanner />
      <PolicyPromo variant="ns" />
      <AudienceInfoBlock />
      <ReviwesYandex />
      <FAQ />
    </div>
  );
}
