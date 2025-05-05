import NsApply from "@/components/widgets/NsApply/NsApply";
import type { Metadata } from "next";

import "react-day-picker/style.css";

export const metadata: Metadata = {
  title: "Оформить полис",
};
export default function NsApplyPage() {
  return <NsApply />;
}
