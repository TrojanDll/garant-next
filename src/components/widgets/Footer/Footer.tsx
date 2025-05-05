import React from "react";

import Link from "next/link";

import { ESvgName } from "@/constants/svg-ids.constants";
import { PAGES } from "@/config/pages-url.config";

import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <Substrate className={styles.root}>
      <div className={styles.container}>
        <Link className={styles.logoLink} href={PAGES.HOME}>
          <SvgSelector className={styles.logoSvg} id={ESvgName.LOGO} />
        </Link>

        <div className={styles.columnsWrapper}>
          <div className={styles.column}>
            <CustomTitle tag="h3" className={styles.title}>
              Страхование в Абхазии
            </CustomTitle>

            <Link className={styles.link} href={PAGES.OSAGO}>
              ОСАГО
            </Link>
            <Link className={styles.link} href={PAGES.NS}>
              От несчастного случая
            </Link>
            <Link className={styles.link} href={PAGES.HOME}>
              Калькулятор стоимости
            </Link>
            <Link className={styles.link} href={PAGES.DOCUMENTS}>
              Нормативные документы
            </Link>
          </div>

          <div className={styles.column}>
            <CustomTitle tag="h3" className={styles.title}>
              Компания
            </CustomTitle>

            <Link className={styles.link} href={PAGES.ABOUT}>
              О нас
            </Link>
            <Link className={styles.link} href={PAGES.CONTACTS}>
              Контакты
            </Link>
            <Link className={styles.link} href={PAGES.HELP}>
              Помощь
            </Link>
          </div>

          <div className={styles.column}>
            <a className={styles.linkLarge} href="mailto:garant@strah.ru">
              garant@strah.ru
            </a>
            <a className={styles.linkLarge} href="tel:79409901234">
              +7 940 990 12 34
            </a>

            <div className={styles.socialLinks}>
              <a href="">
                <SvgSelector id={ESvgName.TELEGRAM_ROUNDED} />
              </a>
              <a href="">
                <SvgSelector id={ESvgName.WHATSAPP_ROUNDED} />
              </a>
              <a href="">
                <SvgSelector id={ESvgName.EMAIL_ROUNDED} />
              </a>
            </div>
          </div>
        </div>

        <p className={styles.address}>Республика Абхазия, г. Сухум, проспект Леона, 9</p>

        <p className={styles.copyright}>© ЗАО "Гарант-Страхование" 2018-2024</p>
      </div>
    </Substrate>
  );
};

export default Footer;
