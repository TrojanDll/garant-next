import React from "react";
import Link from "next/link";

import Substrate from "@/components/ui/Substrate/Substrate";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import Button from "@/components/ui/Button/Button";
import CustomLink from "@/components/ui/CustomLink/CustomLink";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";

import { PAGES } from "@/config/pages-url.config";
import { ESvgName } from "@/config/svg-ids.config";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <ContentContainer>
        <Substrate>
          <div className={styles.wrapper}>
            <div className={styles.headerLeft}>
              <Link href={PAGES.HOME}>
                <SvgSelector id={ESvgName.LOGO} />
              </Link>

              <ul className={styles.links}>
                <li>
                  <CustomLink href={PAGES.CALCULATOR} className={styles.link}>
                    Калькулятор стоимости
                  </CustomLink>
                </li>
                <li>
                  <CustomLink href={PAGES.OSAGO} className={styles.link}>
                    ОСАГО
                  </CustomLink>
                </li>
                <li>
                  <CustomLink href={PAGES.NS} className={styles.link}>
                    НС
                  </CustomLink>
                </li>
              </ul>
            </div>

            <div className={styles.headerRight}>
              <ul className={styles.links}>
                <li>
                  <CustomLink href={PAGES.CONTACTS} className={styles.link}>
                    Контакты
                  </CustomLink>
                </li>
                <li>
                  <CustomLink href={PAGES.HELP} className={styles.link}>
                    Помощь
                  </CustomLink>
                </li>
              </ul>

              <Button type="dashboard" isLink={true} href={PAGES.DASHBOARD}>
                <SvgSelector id={ESvgName.PROFILE} />
                Личный кабинет
              </Button>
            </div>
          </div>
        </Substrate>
      </ContentContainer>
    </header>
  );
};

export default Header;
