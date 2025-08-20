"use client";

import React, { useState } from "react";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import FAQItem, { IFAQItem } from "@/components/entities/FAQItem/FAQItem";

import styles from "./FAQ.module.scss";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import List from "@/components/ui/List/List";
import Text from "@/components/ui/Text/Text";
import CustomLink from "@/components/ui/CustomLink/CustomLink";
// import { FAQItems } from "@/helpers/FAQ/FAQData.helper";

const FAQItems: IFAQItem[] = [
  {
    question: "Как оформить полис ОСАГО онлайн?",
    answer: (
      <>
        <List
          items={[
            <Text>Зарегистрируйтесь на сайте и войдите в личный кабинет.</Text>,
            <Text>
              Заполните данные транспортного средства, собственника и выберите
              период страхования.
            </Text>,
            <Text>
              Оплатите полис онлайн: банковской картой или через СБП.
            </Text>,
            <Text>
              Готовый полис придёт на ваш email и будет доступен в личном
              кабинете.
            </Text>,
          ]}
        />
      </>
    ),
  },
  {
    question: "Полис, купленный на сайте, является официальным?",
    answer:
      "Да. Все полисы оформляются напрямую страховой компанией ЗАО «Страховая Компания «Гарант-Страхование» и имеют юридическую силу. Вы получаете действующий страховой документ, который можно предъявлять инспекторам и использовать при наступлении страхового случая.",
  },
  {
    question: "Кто может оформить полис ОСАГО, и кто должен быть в нём указан?",
    answer: (
      <>
        Полис ОСАГО оформляется на собственника автомобиля, а страхователем
        может быть любой человек, в том числе гражданин иностранного
        государства. Полис действует на <b>неограниченный круг водителей</b> —
        вписывать конкретных лиц не требуется.
      </>
    ),
  },
  {
    question: "Нужно ли распечатывать полис?",
    answer:
      "Распечатывать полис необязательно — достаточно предъявить в электронном виде с экрана телефона. Однако мы рекомендуем его распечатать и хранить в автомобиле для удобства в случае проверки документов.",
  },
  {
    question: "Что делать при наступлении страхового случая?",
    answer: (
      <>
        При возникновении ДТП или другого страхового случая необходимо:
        <List
          separated
          items={[
            <Text>Оставаться на месте и вызвать ГАИ по номеру 002.</Text>,
            <Text>
              Позвонить в страховую компанию по номеру +7 940 770 48 63 и
              сообщить о ДТП
            </Text>,
            <Text>
              Следовать инструкциям страховой компании для подачи заявления и
              предоставления документов.
            </Text>,
          ]}
        />
      </>
    ),
  },
  {
    question: "Как быстро я получу полис после оплаты?",
    answer:
      "Как правило, полис формируется в течение 3-5 минут. Он автоматически направляется на ваш email после оформления, а также становится доступен в личном кабинете.",
  },
  {
    question: "Что делать, если я ошибся в данных при оформлении?",
    answer: (
      <>
        <CustomLink
          variant="underline"
          href="https://wa.me/79407411000"
          rel="nofollow"
        >
          Напишите нам в WhatsApp
        </CustomLink>{" "}
        по номеру +7 (940) 741-10-00 — мы оперативно исправим данные и вышлем
        вам исправленный полис. В сообщении укажите номер полиса и данные,
        которые нужно исправить.
      </>
    ),
  },
  {
    question: "Какие документы нужны для въезда в Абхазию?",
    answer: (
      <>
        Для въезда в Абхазию на автомобиле потребуются:
        <List
          separated
          items={[
            <Text>Паспорт.</Text>,
            <Text>Водительское удостоверение</Text>,
            <Text>Свидетельство о регистрации транспортного средства.</Text>,
            <Text>
              Если автомобиль вам не принадлежит и владелец не с вами,
              необходима нотариально заверенная доверенность, в которой отмечено
              — <b>«с правом выезда за рубеж»</b> (обычная доверенность в
              простой письменной форме не подойдет), либо договор аренды,
              образец которого можно скачать по{" "}
              <CustomLink
                href="https://disk.yandex.ru/i/gsOwO-tTOd1BGQ"
                variant="underline"
                rel="nofollow"
              >
                ссылке
              </CustomLink>
              .
            </Text>,
          ]}
        />
      </>
    ),
  },
];

interface IProps {
  className?: string;
  isIsolated?: boolean;
  isBordered?: boolean;
}

const FAQ = ({ className, isIsolated, isBordered }: IProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const render = (
    <section
      className={`${styles.root} ${className} ${
        isIsolated ? styles.isolated : ""
      }`}
    >
      <CustomTitle tag={isIsolated ? "h2" : "h1"} isCentered isLarge>
        Ответы на вопросы
      </CustomTitle>

      <div className={styles.FAQItemsWrapper}>
        {FAQItems.map((item, i) => (
          <FAQItem
            key={i}
            data={item}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
            isBordered={isBordered}
          />
        ))}
      </div>
    </section>
  );

  return (
    <>{isIsolated ? <ContentContainer>{render}</ContentContainer> : render}</>
  );
};

export default FAQ;
