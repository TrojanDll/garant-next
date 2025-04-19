import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сохранённые авто",
};

export default function CarsPage() {
  return (
    <ContentContainer>
      <div>Сохранённые авто</div>
    </ContentContainer>
  );
}
