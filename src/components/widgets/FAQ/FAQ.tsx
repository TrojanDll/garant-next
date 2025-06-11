"use client";

import React, { useState } from "react";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import FAQItem, { IFAQItem } from "@/components/entities/FAQItem/FAQItem";

import styles from "./FAQ.module.scss";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
// import { FAQItems } from "@/helpers/FAQ/FAQData.helper";

const FAQItems: IFAQItem[] = [
  {
    question: "Как оформить полис ОСАГО онлайн?",
    answer: <>
    
    </>
  }
]

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
      className={`${styles.root} ${className} ${isIsolated ? styles.isolated : ""}`}
    >
      <CustomTitle tag="h2" isCentered isLarge>
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

  return <>{isIsolated ? <ContentContainer>{render}</ContentContainer> : render}</>;
};

export default FAQ;
