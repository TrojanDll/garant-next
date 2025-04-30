import MyPolicies from "@/components/widgets/MyPolicies/MyPolicies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мои полисы",
};

export default function MyPoliciesPage() {
  return <MyPolicies />;
}
