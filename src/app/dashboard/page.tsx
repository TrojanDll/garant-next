import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет",
};

export default function DashboardPage() {
  return (
    <ContentContainer>
      <div>Личный кабинет</div>
    </ContentContainer>
  );
}
