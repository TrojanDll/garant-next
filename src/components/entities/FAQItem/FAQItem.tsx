"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./FAQItem.module.scss";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/config/svg-ids.config";

export interface IFAQItem {
  question: string;
  answer: string;
}

interface IProps {
  data: IFAQItem;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const FAQItem = ({ data, isOpen, onToggle, className }: IProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className={styles.faqItem}>
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
