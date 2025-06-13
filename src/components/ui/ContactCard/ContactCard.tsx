import React from "react";

import styles from "./ContactCard.module.scss";

import Substrate from "../Substrate/Substrate";
import Image from "next/image";

interface IProps {
  className?: string;
  title?: string;
  icon: string;
  text?: string;
  variant?: "default" | "blue" | "red";
  href: string;
}

const ContactCard = ({
  className,
  icon,
  text,
  title,
  variant = "default",
  href,
}: IProps) => {
  return (
    <a href={href} className={styles.link}>
      <Substrate bordered className={`${styles.root} ${className} ${styles[variant]}`}>
        <p className={styles.title}>{title}</p>

        <div className={styles.contentWrapper}>
          <Image alt="" src={icon} />
          <p className={`${styles.text} ${title === "Email" ? styles.emailText : ""}`}>
            {text}
          </p>
        </div>
      </Substrate>
    </a>
  );
};

export default ContactCard;
