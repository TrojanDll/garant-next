import React from "react";

import styles from "./Legal.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import Text from "@/components/ui/Text/Text";

const Legal = () => {
  return (
    <ContentContainer>
      <CustomTitle tag="h1" isCentered className={styles.title}>
        Правовая информация
      </CustomTitle>

      <Substrate className={styles.substrate}>
        <h2 className={styles.subtitle}>Страховая компания</h2>

        <Text className={styles.text}>
          ЗАО «Страховая Компания «Гарант-Страхование» <br />
          ИНН: 11004300 <br />
          ОГРН: 117РА000241 <br />
          Р/счёт: 40702810200000001270 <br />
          КПП: 411000100 <br />
          КБ «Гарант-Банк» <br />
          БИК: 224100002 <br />
          Юридический адрес: Республика Абхазия, Сухумский р-н, Бзыпское ш. 518
          <br />
          Фактический адрес: Республика Абхазия, г. Сухум, ул. Чочуа, д. 2
        </Text>

        <h2 className={styles.subtitle}>Поддержка и реализация сервиса</h2>

        <Text className={styles.text}>
          ИП Аршба Илона Станиславовна <br />
          ИНН: 20008718 <br />
          ОГРН: 315РА000307 <br />
          Р/счёт: 40802810500000000306 <br />
          Кор/счёт: 30101810300000000018 <br />
          КБ «Универсал-банк» (ООО) БИК: 224100018 <br />
          Деятельность осуществляется по агентскому договору со страховой компанией.{" "}
          <br />
          <br />
          +7 (940) 741-10-00
        </Text>
      </Substrate>
    </ContentContainer>
  );
};

export default Legal;
