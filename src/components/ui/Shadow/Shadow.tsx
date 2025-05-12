"use client";

import React, { useEffect, useState } from "react";

import styles from "./Shadow.module.scss";
import useShadow from "@/stores/Shadow/shadow.store";

const Shadow = () => {
  const isShadowVisible = useShadow((state) => state.isShadowVisible);
  const setIsShadowVisible = useShadow((state) => state.setIsShadowVisible);
  const [shadowClassName, setShadowClassName] = useState(`${styles.shadow}`);

  useEffect(() => {
    let timeoutId1: NodeJS.Timeout;
    let timeoutId2: NodeJS.Timeout;

    if (isShadowVisible) {
      setShadowClassName(`${styles.shadow} ${styles.block}`);

      timeoutId1 = setTimeout(() => {
        setShadowClassName(`${styles.shadow} ${styles.block} ${styles.visible}`);
      }, 4);
    } else {
      setShadowClassName(`${styles.shadow} ${styles.block}`);

      timeoutId2 = setTimeout(() => {
        setShadowClassName(`${styles.shadow}`);
      }, 300);
    }

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [isShadowVisible]);

  const handleShadowClick = () => {
    setIsShadowVisible(false);
  };

  return <div onClick={handleShadowClick} className={shadowClassName}></div>;
};

export default Shadow;
