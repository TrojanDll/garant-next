"use client";

import { useEffect, useState } from "react";
import styles from "./Timer.module.scss";

interface IProps {
  className?: string;
  duration: number;
  timerID?: string;
  handleFinish?: () => void;
}

export function Timer({
  className,
  duration,
  timerID = "1",
  handleFinish = () => {},
}: IProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const TIMER_ID = `timerEnd-${timerID}`;

  if (!TIMER_ID) return;

  useEffect(() => {
    const savedEndTime = localStorage.getItem(TIMER_ID);

    let endTime: number;

    if (savedEndTime) {
      endTime = parseInt(savedEndTime, 10);
    } else {
      endTime = Date.now() + duration * 1000;
      localStorage.setItem(TIMER_ID, endTime.toString());
    }

    const tick = () => {
      const diff = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(diff);

      if (diff === 0) {
        localStorage.removeItem(TIMER_ID);
        clearIntervalFunc();
        handleFinish();
      }
    };

    tick();
    const timerIdInterval = setInterval(tick, 1000);

    function clearIntervalFunc() {
      if (timerIdInterval) {
        clearInterval(timerIdInterval);
      }
    }

    return () => {
      if (timerIdInterval) {
        clearInterval(timerIdInterval);
      }
    };
  }, [duration]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <span className={`${className} ${styles.root}`}>
      {minutes}:{seconds}
    </span>
  );
}
