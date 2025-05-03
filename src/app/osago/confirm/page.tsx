import OsagoConfirm from "@/components/widgets/OsagoConfirm/OsagoConfirm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оформить ОСАГО",
};
export default function OsagoConfirmPage() {
  return <OsagoConfirm />;
}
