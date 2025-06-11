"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./FAQItem.module.scss";

import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

export interface IFAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface IProps {
  data: IFAQItem;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  isBordered?: boolean;
}

const FAQItem = ({ data, isOpen, onToggle, className, isBordered }: IProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.faqItem} ${isBordered ? styles.bordered : ""} ${className}`}
    >
      <button className={styles.question} onClick={onToggle}>
        {data.question}
        <SvgSelector
          id={ESvgName.CHEVRON_DOWN}
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
        />
      </button>
      <div
        className={styles.answer}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
        }}
      >
        <div ref={contentRef} className={styles.answerContent}>
          {data.answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
