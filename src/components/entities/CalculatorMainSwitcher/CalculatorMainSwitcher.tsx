"use client";

import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Button from "@/components/ui/Button/Button";

import styles from "./CalculatorMainSwitcher.module.scss";
import CalculatorMainForm from "../CalculatorMainForm/CalculatorMainForm";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "ОСАГО",
    children: <CalculatorMainForm variant="osago"/>,
  },
  {
    key: "2",
    label: "НС",
    children: <CalculatorMainForm variant="ns"/>,
  },
];

const CalculatorMainSwitcher = () => {
  return <Tabs className={styles.tabs} defaultActiveKey="1" items={items} />;
};

export default CalculatorMainSwitcher;
