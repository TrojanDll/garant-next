import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мои полисы",
};

export default function MyPoliciesPage() {
  return (
    <ContentContainer>
      <div>Мои полисы</div>
    </ContentContainer>
  );
}
