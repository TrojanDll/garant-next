import Advantages from "@/components/widgets/Advantages/Advantages";
import CalculatorPromo from "@/components/widgets/CalculatorPromo/CalculatorPromo";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";
import FAQ from "@/components/widgets/FAQ/FAQ";
import { InsuranceBannerMain } from "@/components/widgets/InsuranceBannerMain/InsuranceBannerMain";
import ReviwesYandex from "@/components/widgets/ReviwesYandex/ReviwesYandex";

export default function Home() {
  return (
    <div>
      <DiscountBanner />
      <CalculatorPromo />
      <Advantages />
      <InsuranceBannerMain />
      <ReviwesYandex />
      <FAQ isIsolated />
    </div>
  );
}
