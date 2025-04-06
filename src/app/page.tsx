import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Advantages from "@/components/widgets/Advantages/Advantages";
import CalculatorPromo from "@/components/widgets/CalculatorPromo/CalculatorPromo";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";

export default function Home() {
  return (
    <div>
      <ContentContainer>
        <DiscountBanner />
        <CalculatorPromo />
        <Advantages />
      </ContentContainer>
    </div>
  );
}
