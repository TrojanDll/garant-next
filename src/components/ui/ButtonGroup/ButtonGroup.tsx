"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import styles from "./ButtonGroup.module.scss";

export type TButtonGroupRequest = {
  value: string;
  index: number;
};

export type TButtonGroupType = "default" | "small";

interface ButtonGroupProps {
  items: string[];
  defaultActiveIndex?: number;
  onButtonClick?: (value: TButtonGroupRequest) => void;
  name?: string;
  className?: string;
  buttonWidth?: number | string;
  groupType?: TButtonGroupType;
  isEquals?: boolean;
}

export default function ButtonGroup({
  items,
  defaultActiveIndex = 0,
  onButtonClick,
  name,
  className,
  buttonWidth,
  groupType,
  isEquals = true,
}: ButtonGroupProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [maxWidth, setMaxWidth] = useState<number | null>(null);

  const activeBgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    if (isEquals && !buttonWidth && buttonsRef.current.length > 0) {
      const widths = buttonsRef.current.map((btn) => btn?.offsetWidth || 0);
      const max = Math.max(...widths);
      setMaxWidth(max);
    }
  }, [items, isEquals, buttonWidth]);

  useEffect(() => {
    if (activeBgRef.current && containerRef.current) {
      const computedStyle = window.getComputedStyle(containerRef.current);
      const gap = parseFloat(computedStyle.gap) || 0;

      let offset = 0;

      if (buttonWidth || (isEquals && maxWidth)) {
        const width =
          typeof buttonWidth === "number"
            ? buttonWidth
            : typeof buttonWidth === "string"
            ? parseFloat(buttonWidth)
            : maxWidth || 0;

        offset = activeIndex * (width + gap);
      } else {
        for (let i = 0; i < activeIndex; i++) {
          offset += (buttonsRef.current[i]?.offsetWidth || 0) + gap;
        }
      }

      if (buttonWidth || (isEquals && maxWidth)) {
        activeBgRef.current.style.width = resolveWidth() ?? "auto";
      } else {
        const currentBtn = buttonsRef.current[activeIndex];
        if (currentBtn) {
          activeBgRef.current.style.width = `${currentBtn.offsetWidth}px`;
        }
      }
      
      activeBgRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [activeIndex, buttonWidth, isEquals, maxWidth]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (onButtonClick) {
      onButtonClick({ value: items[index], index: index });
    }
  };

  const resolveWidth = () => {
    if (buttonWidth) return typeof buttonWidth === "number" ? `${buttonWidth}px` : buttonWidth;
    if (isEquals && maxWidth) return `${maxWidth}px`;
    return undefined;
  };

  const commonStyle = {
    width: resolveWidth(),
  };

  useEffect(() => {
    handleClick(0);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className} ${
        groupType === "small" ? styles.groupSmall : ""
      }`}
    >
      <div ref={activeBgRef} className={`${styles.activeBackground}`} style={commonStyle} />

      {name && (
        <input type="text" className={styles.input} value={activeIndex} readOnly name={name} />
      )}
      {items.map((item, index) => (
        <button
          ref={(el) => {
            buttonsRef.current[index] = el;
          }}
          key={item}
          className={`${styles.button} ${activeIndex === index ? styles.active : ""}`}
          onClick={() => handleClick(index)}
          style={commonStyle}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
