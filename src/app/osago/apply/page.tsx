import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import OsagoApply from "@/components/widgets/OsagoApply/OsagoApply";
import type { Metadata } from "next";

import "react-day-picker/style.css";


export const metadata: Metadata = {
  title: "Оформить ОСАГО",
};
export default function OsagoApplyPage() {
  return <OsagoApply />;
}
