import Auth from "@/components/widgets/Auth/Auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HelpPage() {
  return <Auth />;
}
