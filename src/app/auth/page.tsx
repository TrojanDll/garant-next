import Auth from "@/components/widgets/Auth/Auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация",
};

export default function HelpPage() {
  return <Auth />;
}
