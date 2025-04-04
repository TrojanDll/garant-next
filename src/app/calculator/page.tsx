import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Калькулятор",
};
export default function CalculatorPage() {
  return (
    <ContentContainer>
      <div>Calculator</div>
    </ContentContainer>
  );
}
