import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Support from "@/components/widgets/Support/Support";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Помощь и ответы на вопросы – страховка и ОСАГО в Абхазии",
};
export default function SupportPage() {
  return <Support />;
}
