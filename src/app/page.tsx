import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CalculatorPromo from "@/components/widgets/CalculatorPromo/CalculatorPromo";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";

export default function Home() {
  return (
    <div>
      <ContentContainer>
        <DiscountBanner />
        <CalculatorPromo />
      </ContentContainer>
    </div>
  );
}
