"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ButtonGroup.module.scss";

interface ButtonGroupProps {
  items: string[];
  defaultActiveIndex?: number;
  onButtonClick?: (index: number) => void;
}

export default function ButtonGroup({
  items,
  defaultActiveIndex = 0,
  onButtonClick,
}: ButtonGroupProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const activeBgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeBgRef.current && containerRef.current) {
      const buttons = containerRef.current.getElementsByClassName(styles.button);
      if (buttons.length > 0) {
        const buttonWidth = buttons[0].getBoundingClientRect().width;
        const computedStyle = window.getComputedStyle(containerRef.current);
        const gap = parseFloat(computedStyle.gap) || 0;
        const offset = activeIndex * (buttonWidth + gap);
        activeBgRef.current.style.transform = `translateX(${offset}px)`;
      }
    }
  }, [activeIndex]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (onButtonClick) {
      onButtonClick(index);
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={activeBgRef} className={styles.activeBackground} />
      {items.map((item, index) => (
        <button
          key={item}
          className={`${styles.button} ${activeIndex === index ? styles.active : ""}`}
          onClick={() => handleClick(index)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
