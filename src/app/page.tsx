import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Advantages from "@/components/widgets/Advantages/Advantages";
import CalculatorPromo from "@/components/widgets/CalculatorPromo/CalculatorPromo";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";
import ReviwesYandex from "@/components/widgets/ReviwesYandex/ReviwesYandex";

export default function Home() {
  return (
    <div>
      <ContentContainer>
        <DiscountBanner />
        <CalculatorPromo />
        <Advantages />
        <ReviwesYandex />
      </ContentContainer>
    </div>
  );
}
