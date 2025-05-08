import NsConfirm from "@/components/widgets/NsConfirm/NsConfirm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оформить полис",
};
export default function NsConfirmPage() {
  return <NsConfirm />;
}
