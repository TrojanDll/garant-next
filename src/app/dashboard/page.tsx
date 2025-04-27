import PersonalData from "@/components/widgets/PersonalData/PersonalData";
import type { Metadata } from "next";

import "react-day-picker/style.css";

export const metadata: Metadata = {
  title: "Личный кабинет",
};

export default function DashboardPage() {
  return <PersonalData />;
}
