import React from "react";

import styles from "./ContactUs.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import ContactCard from "@/components/ui/ContactCard/ContactCard";

import whatsappSvg from "./../../../../public/img/icons/whatsapp.svg";
import lightningSvg from "./../../../../public/img/icons/lightning.svg";
import telegramSvg from "./../../../../public/img/icons/telegram.svg";
import emailSvg from "./../../../../public/img/icons/email.svg";

interface IContactCardInfo {
  title?: string;
  icon: string;
  text?: string;
  variant?: "default" | "blue" | "red";
  href: string;
  className?: string;
  rel?: string;
}

const contactsCardsInfo: IContactCardInfo[] = [
  {
    title: "WhatsApp",
    href: "https://wa.me/79407411000",
    rel: "nofollow",
    icon: whatsappSvg,
    text: "+7 940 741 10 00",
    variant: "blue",
  },
  {
    title: "Страховой случай",
    href: "tel:79407704863",
    rel: "nofollow",
    icon: lightningSvg,
    text: "+7 940 770 48 63",
    variant: "red",
  },
  {
    title: "Telegram",
    href: "https://t.me/garantabh",
    rel: "nofollow",
    icon: telegramSvg,
    text: "@garantabh",
  },
  {
    title: "Email",
    href: "mailto:info@garant-abh.com",
    rel: "nofollow",
    icon: emailSvg,
    text: "info@garant-abh.com",
  },
];

interface IProps {
  className?: string;
}

const ContactUs = ({ className }: IProps) => {
  return (
    <Substrate className={`${className} ${styles.root}`}>
      <h2 className={styles.title}>Свяжитесь с нами</h2>
      <div className={styles.description}>
        Поможем с любым вопросом с 09:00 до 17:00 мск
      </div>

      {contactsCardsInfo.map((info, i) => (
        <ContactCard
          key={i}
          icon={info.icon}
          text={info.text}
          variant={info.variant}
          title={info.title}
          href={info.href}
          rel={info.rel}
          className={styles.infoCard}
        />
      ))}
    </Substrate>
  );
};

export default ContactUs;
