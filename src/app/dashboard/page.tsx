import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import PersonalData from "@/components/widgets/PersonalData/PersonalData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет",
};

export default function DashboardPage() {
  return (
    <ContentContainer>
      <PersonalData />
    </ContentContainer>
  );
}
