import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import React from "react";

import styles from "./Documents.module.scss";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomLink from "@/components/ui/CustomLink/CustomLink";
import Link from "next/link";

const Documents = () => {
  return (
    <ContentContainer>
      <CustomTitle className={styles.title} isCentered>
        Нормативные документы
      </CustomTitle>

      <Substrate className={styles.substrate}>
        <h2 className={styles.subtitle}>Лицензия</h2>

        <CustomLink
          href="/documents/Лицензия.pdf"
          target="_blank"
          className={styles.downloadLink}
        >
          Лицензия на осуществление страховой деятельности
        </CustomLink>

        <CustomLink
          href="/documents/Лицензия - приложение.pdf"
          target="_blank"
          className={styles.downloadLink}
        >
          Лицензия на осуществление страховой деятельности, приложение
        </CustomLink>

        <h2 className={styles.subtitle}>Нормативные документы</h2>

        <CustomLink
          href="/documents/О страховании.pdf"
          target="_blank"
          className={styles.downloadLink}
        >
          Закон Республики Абхазия «О страховании» от 27 апреля 2004г., N884-с-XIV
        </CustomLink>

        <CustomLink
          href="/documents/Об обязательном страховании.pdf"
          target="_blank"
          className={styles.downloadLink}
        >
          Закон Республики Абхазия «Об обязательном страховании» 12 июля 2006 г., N
          1406-с-XIV
        </CustomLink>

        <CustomLink
          href="/documents/От несчастных случаев.pdf"
          target="_blank"
          className={styles.downloadLink}
        >
          Закон Республики Абхазия «Об обязательном страховании от несчастных случаев
          иностранных граждан и лиц без гражданства, прибывающих на территорию Республики
          Абхазия» от 12 июля 2006 г., N 1408-с-XIV
        </CustomLink>

        <CustomLink
          href="/documents/О гражданской ответственности.pdf"
          target="_blank"
          className={styles.downloadLink}
        >
          Закон Республики Абхазия «Об обязательном страховании гражданской
          ответственности владельцев транспортных средств, иностранных физических и
          юридических лиц» от 12 июня 2006 г. N 1407-с-XIV
        </CustomLink>

        <CustomLink
          href="/documents/Постановление.pdf"
          target="_blank"
          className={styles.downloadLink}
        >
          Постановление Кабинета Министров Республики Абхазия «Об утверждении правил,
          тарифов и форм документов обязательного страхования» от 28 июля 2006 г. N 189
        </CustomLink>
      </Substrate>
    </ContentContainer>
  );
};

export default Documents;
