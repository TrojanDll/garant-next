import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Калькулятор",
};
export default function CalculatorPage() {
  return (
    <ContentContainer>
      <DiscountBanner />
    </ContentContainer>
  );
}
