import NsConfirm from "@/components/widgets/NsConfirm/NsConfirm";
import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "Оформить полис",
  ...NO_INDEX_PAGE,
};
export default function NsConfirmPage() {
  return <NsConfirm />;
}
