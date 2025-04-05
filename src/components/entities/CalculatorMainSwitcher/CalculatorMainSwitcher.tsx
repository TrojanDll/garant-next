"use client";

import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Button from "@/components/ui/Button/Button";

import styles from "./CalculatorMainSwitcher.module.scss";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "ОСАГО",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "НС",
    children: "Content of Tab Pane 2",
  },
];

const CalculatorMainSwitcher = () => {
  return <Tabs className={styles.tabs} defaultActiveKey="1" items={items} />;
};

export default CalculatorMainSwitcher;
