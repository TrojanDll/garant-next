import React from "react";

import styles from "./NsData.module.scss";
import { ICreateNsPolicyResponseData } from "@/types/policy.types";
import { getDaysBetweenDates } from "@/helpers/getDaysBetweenDates";
import NsInsuredConfirmList from "../NsInsuredConfirmList/NsInsuredConfirmList";

interface IProps {
  policy: ICreateNsPolicyResponseData;
}

const NsData = ({ policy }: IProps) => {
  return (
    <>
      <NsInsuredConfirmList policy={policy} />

      <div className={`${styles.contentItem}`}>
        <h3 className={styles.contentItemLargeTitle}>Срок действия</h3>
        <div className={styles.contentItemLargeWrapper}>
          {policy.finish_date && (
            <span className={styles.contentItemTitle}>
              {getDaysBetweenDates(policy.start_date, policy.finish_date)} суток
            </span>
          )}
          <span className={styles.contentItemValue}>
            с {policy.start_date} {policy.finish_date && `по ${policy.finish_date}`}
          </span>
        </div>
      </div>
    </>
  );
};

export default NsData;
