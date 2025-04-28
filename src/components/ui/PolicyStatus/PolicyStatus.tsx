import React from "react";

import styles from "./PolicyStatus.module.scss";
import { EPolicyStatus } from "@/types/policy.types";

interface IProps {
  status: EPolicyStatus;
}

const PolicyStatus = ({ status = EPolicyStatus.AWAITING_PAYMENT }: IProps) => {
  const statusClassName =
    status === EPolicyStatus.ACTIVE
      ? styles.active
      : status === EPolicyStatus.AWAITING_PAYMENT
      ? styles.awaiting
      : status === EPolicyStatus.EXPIRED
      ? styles.expired
      : "";

  const statusText =
    status === EPolicyStatus.ACTIVE
      ? "Активный"
      : status === EPolicyStatus.AWAITING_PAYMENT
      ? "Ожидает оплаты"
      : status === EPolicyStatus.EXPIRED
      ? "Истек срок действия"
      : "";

  return <div className={`${styles.root} ${statusClassName}`}>{statusText}</div>;
};

export default PolicyStatus;
