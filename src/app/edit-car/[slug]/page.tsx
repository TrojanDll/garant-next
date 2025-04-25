import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CarsEdit from "@/components/widgets/CarsEdit/CarsEdit";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Изменить авто",
};

export default function CarsPage() {
  return (
    <ContentContainer>
      <CarsEdit />
    </ContentContainer>
  );
}
