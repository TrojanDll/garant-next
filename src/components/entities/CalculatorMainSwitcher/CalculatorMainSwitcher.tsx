"use client";

import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

import styles from "./CalculatorMainSwitcher.module.scss";

interface IProps { 
  items: TabsProps["items"]
}

const CalculatorMainSwitcher = ({items}:IProps) => {
  return <Tabs className={styles.tabs} defaultActiveKey="1" items={items} />;
};

export default CalculatorMainSwitcher;
