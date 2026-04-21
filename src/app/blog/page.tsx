import Blog from "@/components/widgets/Blog/Blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог – страховка в Абхазии, ОСАГО и автострахование онлайн",
};

export default function BlogPage() {
  return <Blog />;
}
