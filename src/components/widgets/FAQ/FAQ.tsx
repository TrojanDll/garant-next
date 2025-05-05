"use client";

import React, { useState } from "react";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import FAQItem, { IFAQItem } from "@/components/entities/FAQItem/FAQItem";

import styles from "./FAQ.module.scss";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";

const FAQItems: IFAQItem[] = [
  {
    question: "От чего зависит стоимость полиса?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore explicabo vitae? Voluptates corporis enim dolorem quaerat inventore placeat aliquam architecto. Quae aspernatur repudiandae porro quas officia nam fuga doloremque!",
  },
  {
    question: "От чего зависит стоимость полиса?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore explicabo vitae? Voluptates corporis enim dolorem quaerat inventore placeat aliquam architecto. Quae aspernatur repudiandae porro quas officia nam fuga doloremque!",
  },
  {
    question: "От чего зависит стоимость полиса?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore explicabo vitae? Voluptates corporis enim dolorem quaerat inventore placeat aliquam architecto. Quae aspernatur repudiandae porro quas officia nam fuga doloremque!",
  },
  {
    question: "От чего зависит стоимость полиса?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore explicabo vitae? Voluptates corporis enim dolorem quaerat inventore placeat aliquam architecto. Quae aspernatur repudiandae porro quas officia nam fuga doloremque!",
  },
  {
    question: "От чего зависит стоимость полиса?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore explicabo vitae? Voluptates corporis enim dolorem quaerat inventore placeat aliquam architecto. Quae aspernatur repudiandae porro quas officia nam fuga doloremque!",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <ContentContainer>
      <section className={styles.root}>
        <CustomTitle tag="h2" isCentered isLarge>Ответы на вопросы</CustomTitle>

        <div className={styles.FAQItemsWrapper}>
          {FAQItems.map((item, i) => (
            <FAQItem
              key={i}
              data={item}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </section>
    </ContentContainer>
  );
};

export default FAQ;
