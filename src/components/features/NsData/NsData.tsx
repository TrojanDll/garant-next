import React from "react";

import styles from "./NsData.module.scss";
import { ICreateNsPolicyRequest, INsPolicy } from "@/types/policy.types";
import { getDaysBetweenDates } from "@/helpers/getDaysBetweenDates";
import NsInsuredConfirmList from "../NsInsuredConfirmList/NsInsuredConfirmList";
import { getFinishDate } from "@/helpers/getFinishDate";
import { getDaysFromNsDurationOfStayString } from "@/helpers/getDaysFromNsDurationOfStayString";

interface IProps {
  policy: ICreateNsPolicyRequest;
}

const NsData = ({ policy }: IProps) => {
  const finishDate = getFinishDate(
    policy.start_date,
    getDaysFromNsDurationOfStayString(policy.duration_of_stay) - 1
  );

  return (
    <>
      <NsInsuredConfirmList policy={policy} />

      <div className={`${styles.contentItem}`}>
        <h3 className={styles.contentItemLargeTitle}>Срок действия</h3>
        <div className={styles.contentItemLargeWrapper}>
          {policy && (
            <span className={styles.contentItemTitle}>
              {getDaysBetweenDates(policy.start_date, finishDate) + 1} суток
            </span>
          )}
          <span className={styles.contentItemValue}>
            с {policy.start_date} {finishDate && `по ${finishDate}`}
          </span>
        </div>
      </div>
    </>
  );
};

export default NsData;
