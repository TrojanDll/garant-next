import Legal from "@/components/widgets/Legal/Legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Правовая информация",
};

export default function LegalPage() {
  return <Legal />;
}
