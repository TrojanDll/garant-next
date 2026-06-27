import OsagoConfirm from "@/components/widgets/OsagoConfirm/OsagoConfirm";
import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "Оформить ОСАГО",
  ...NO_INDEX_PAGE,
};
export default function OsagoConfirmPage() {
  return <OsagoConfirm />;
}
