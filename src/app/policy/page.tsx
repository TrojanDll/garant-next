import PrivacyPolicy from "@/components/widgets/PrivacyPolicy/PrivacyPolicy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика",
};
export default function PolicyPage() {
  return <PrivacyPolicy />;
}
