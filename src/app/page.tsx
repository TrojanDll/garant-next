import Advantages from "@/components/widgets/Advantages/Advantages";
import CalculatorPromo from "@/components/widgets/CalculatorPromo/CalculatorPromo";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";
import FAQ from "@/components/widgets/FAQ/FAQ";
import ReviwesYandex from "@/components/widgets/ReviwesYandex/ReviwesYandex";

export default function Home() {
  return (
    <div>
      <DiscountBanner />
      <CalculatorPromo />
      <Advantages />
      <ReviwesYandex />
      <FAQ isIsolated />
    </div>
  );
}
