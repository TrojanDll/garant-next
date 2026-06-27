import Contacts from "@/components/widgets/Contacts/Contacts";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты – страховка в Абхазии, ОСАГО и автострахование онлайн",
  description:
    "Контакты страховой компании «Гарант-Страхование»: телефон, WhatsApp, Telegram, email, адрес офиса в Сухуме и помощь по страховым случаям.",
};
export default function ContactsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "Контакты", href: PAGES.CONTACTS },
        ]}
      />
      <Contacts />
    </>
  );
}
