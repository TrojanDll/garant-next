import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Cars from "@/components/widgets/Cars/Cars";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сохранённые авто",
};

export default function CarsPage() {
  return <Cars />;
}
