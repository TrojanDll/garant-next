import CarInfo from "@/components/widgets/CarInfo/CarInfo";
import Cars from "@/components/widgets/Cars/Cars";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сохранённые авто",
};

export default function CarsPage() {
  return <CarInfo />;
}
