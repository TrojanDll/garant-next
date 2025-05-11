import MyPolicyListItem from "@/components/ui/MyPolicyListItem/MyPolicyListItem";
import { IAllPolicies, INsPolicy } from "@/types/policy.types";
import React from "react";

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
            />
          ))
        : ""}
      {filteredPolicies.NS
        ? filteredPolicies.NS.map((item) => (
            <MyPolicyListItem
              policyType="ns"
              key={`osago_${item.id}`}
              policyNsData={item}
            />
          ))
        : ""}
    </div>
  );
};

export default MyPoliciesList;
