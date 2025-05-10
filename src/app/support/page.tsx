import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Support from "@/components/widgets/Support/Support";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Помощь",
};
export default function SupportPage() {
  return <Support />;
}
