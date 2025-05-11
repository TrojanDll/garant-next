import React from "react";

import styles from "./NsInsuredConfirmList.module.scss";

import {
  ICreateNsPolicyRequest,
  INsPolicy,
} from "@/types/policy.types";
import NsInsuredConfirmListItem from "../NsInsuredConfirmListItem/NsInsuredConfirmListItem";

interface IProps {
  policy: ICreateNsPolicyRequest;
  className?: string;
}

const NsInsuredConfirmList = ({ policy, className }: IProps) => {
  return (
    <div className={className}>
      {policy.insured.map((people, i) => (
        <NsInsuredConfirmListItem
          className={styles.listItem}
          key={`${people.date_of_birth}.${people.fio}.${people.gender}.${people.passport_number}.${i}`}
          index={i + 1}
          date_of_birth={people.date_of_birth}
          fio={people.fio}
          gender={people.gender}
          passport_number={people.passport_number}
        />
      ))}
    </div>
  );
};

export default NsInsuredConfirmList;
