import React from "react";
import styles from "./CalculatorPolicyPrice.module.scss";

interface IProps {
  price: number;
}

const CalculatorPolicyPrice = ({ price }: IProps) => {
  return <div>{price}</div>;
};

export default CalculatorPolicyPrice;
