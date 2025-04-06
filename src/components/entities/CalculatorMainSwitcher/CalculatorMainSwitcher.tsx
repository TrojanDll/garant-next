"use client";

import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Button from "@/components/ui/Button/Button";

import styles from "./CalculatorMainSwitcher.module.scss";
import CalculatorMainForm from "../CalculatorMainForm/CalculatorMainForm";

interface IProps { 
  items: TabsProps["items"]
}

const CalculatorMainSwitcher = ({items}:IProps) => {
  return <Tabs className={styles.tabs} defaultActiveKey="1" items={items} />;
};

export default CalculatorMainSwitcher;
