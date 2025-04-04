import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
};
export default function ContactsPage() {
  return (
    <ContentContainer>
      <div>Contacts</div>
    </ContentContainer>
  );
}
