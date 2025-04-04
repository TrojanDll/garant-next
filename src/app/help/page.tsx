import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Помощь",
};
export default function HelpPage() {
  return (
    <ContentContainer>
      <div>Help</div>
    </ContentContainer>
  );
}
