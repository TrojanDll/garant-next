import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import EditPersonalData from "@/components/widgets/EditPersonalData/EditPersonalData";
import type { Metadata } from "next";

import "react-day-picker/style.css";

export const metadata: Metadata = {
  title: "Личный кабинет",
};

export default function EditPersonalDataPage() {
  return <EditPersonalData />;
}
