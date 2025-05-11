import React from "react";

import styles from "./MyPoliciesList.module.scss";

import MyPolicyListItem from "@/components/ui/MyPolicyListItem/MyPolicyListItem";
import { IAllPolicies, INsPolicy } from "@/types/policy.types";

interface IProps {
  allPolicies?: IAllPolicies;
  isFiltersEnabled?: boolean;
  filteredPolicies: IAllPolicies;
}

const MyPoliciesList = ({ allPolicies, filteredPolicies, isFiltersEnabled }: IProps) => {
  return (
    <div>
      {filteredPolicies.OSAGO
        ? filteredPolicies.OSAGO.map((item) => (
            <MyPolicyListItem
              policyType="osago"
              key={`osago_${item.id}`}
              policyOsagoData={item}
              className={styles.listItem}
            />
          ))
        : ""}
      {filteredPolicies.NS
        ? filteredPolicies.NS.map((item) => (
            <MyPolicyListItem
              policyType="ns"
              key={`osago_${item.id}`}
              policyNsData={item}
              className={styles.listItem}
            />
          ))
        : ""}
    </div>
  );
};

export default MyPoliciesList;
