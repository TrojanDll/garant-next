import React from "react";

import styles from "./NsInsuredConfirmList.module.scss";

import { ICreateNsPolicyResponseData } from "@/types/policy.types";
import NsInsuredConfirmListItem from "../NsInsuredConfirmListItem/NsInsuredConfirmListItem";

interface IProps {
  policy: ICreateNsPolicyResponseData;
  className?: string;
}

const NsInsuredConfirmList = ({ policy, className }: IProps) => {
  return (
    <div className={className}>
      {policy.get_peoples.map((people, i) => (
        <NsInsuredConfirmListItem
          className={styles.listItem}
          key={people.id}
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
