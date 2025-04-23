import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CarsNew from "@/components/widgets/CarsNew/CarsNew";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Добавить авто",
};

export default function CarsPage() {
  return (
    <ContentContainer>
      <CarsNew />
    </ContentContainer>
  );
}
