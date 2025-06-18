import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import React from "react";

import styles from "./Documents.module.scss";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomLink from "@/components/ui/CustomLink/CustomLink";

const Documents = () => {
  return (
    <ContentContainer>
      <CustomTitle className={styles.title} isCentered>
        Нормативные документы
      </CustomTitle>

      <Substrate className={styles.substrate}>
        <h2 className={styles.subtitle}>Лицензия</h2>

        <CustomLink
          className={styles.downloadLink}
          variant="underline"
          download
          href="/documents/Лицензия на осуществление страховой деятельности.pdf"
        >
          Лицензия на осуществление страховой деятельности
        </CustomLink>

        <CustomLink
          className={styles.downloadLink}
          variant="underline"
          download
          href="/documents/Лицензия на осуществление страховой деятельности.pdf"
        >
          Лицензия на осуществление страховой деятельности, приложение
        </CustomLink>

        <h2 className={styles.subtitle}>Нормативные документы</h2>

        <CustomLink
          className={styles.downloadLink}
          variant="underline"
          download
          href="/documents/Закон Республики Абхазия «О страховании» от 27 апреля 2004г., N884-с-XIV.pdf"
        >
          Закон Республики Абхазия «О страховании» от 27 апреля 2004г., N884-с-XIV
        </CustomLink>

        <CustomLink
          className={styles.downloadLink}
          variant="underline"
          download
          href="/documents/Закон Республики Абхазия «Об обязательном страховании» 12 июля 2006 г., N 1406-с-XIV.pdf"
        >
          Закон Республики Абхазия «Об обязательном страховании» 12 июля 2006 г., N
          1406-с-XIV
        </CustomLink>

        <CustomLink
          className={styles.downloadLink}
          variant="underline"
          download
          href="/documents/Закон Республики Абхазия «Об обязательном страховании от несчастных случаев иностранных граждан и лиц без гражданства, прибывающих на территорию Республики Абхазия» от 12 июля 2006 г., N 1408-с-XIV.pdf"
        >
          Закон Республики Абхазия «Об обязательном страховании от несчастных случаев
          иностранных граждан и лиц без гражданства, прибывающих на территорию Республики
          Абхазия» от 12 июля 2006 г., N 1408-с-XIV
        </CustomLink>

        <CustomLink
          className={styles.downloadLink}
          variant="underline"
          download
          href="/documents/Закон Республики Абхазия «Об обязательном страховании гражданской ответственности владельцев транспортных средств, иностранных физических и юридических лиц» от 12 июня 2006 г. N 1407-с-XIV.pdf"
        >
          Закон Республики Абхазия «Об обязательном страховании гражданской
          ответственности владельцев транспортных средств, иностранных физических и
          юридических лиц» от 12 июня 2006 г. N 1407-с-XIV
        </CustomLink>

        <CustomLink
          className={styles.downloadLink}
          variant="underline"
          download
          href="/documents/Постановление Кабинета Министров Республики Абхазия «Об утверждении правил, тарифов и форм документов обязательного страхования» от 28 июля 2006 г. N 189.pdf"
        >
          Постановление Кабинета Министров Республики Абхазия «Об утверждении правил,
          тарифов и форм документов обязательного страхования» от 28 июля 2006 г. N 189
        </CustomLink>
      </Substrate>
    </ContentContainer>
  );
};

export default Documents;
