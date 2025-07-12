import Contacts from "@/components/widgets/Contacts/Contacts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты – страховка в Абхазии, ОСАГО и автострахование онлайн",
};
export default function ContactsPage() {
  return <Contacts />;
}
