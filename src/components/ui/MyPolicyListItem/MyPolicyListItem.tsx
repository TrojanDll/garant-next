import React from "react";

import styles from "./MyPolicyListItem.module.scss";

import { PAGES } from "@/config/pages-url.config";
import Link from "next/link";
import {
  EPolicyStatus,
  INsPolicy,
  IOsagoPolicy,
  IPolicyUniversalData,
} from "@/types/policy.types";
import { getPaymentStatus } from "@/helpers/Policy/getPaymentStatus";
import { getUniversalPolicyData } from "@/helpers/Policy/getUniversalPolicyData";

interface IProps {
  policyType: "osago" | "ns";
  policyNsData?: INsPolicy;
  policyOsagoData?: IOsagoPolicy;
}

const MyPolicyListItem = ({ policyType, policyNsData, policyOsagoData }: IProps) => {
  const universalPolicyData: IPolicyUniversalData = getUniversalPolicyData({
    policyNsData,
    policyOsagoData,
  });

  return (
    <>
      <Link
        href={`${PAGES.POLICY_INFO}/${universalPolicyData.id}`}
        className={styles.root}
      >
        {universalPolicyData.title}
        qwerty
      </Link>
    </>
  );
};

export default MyPolicyListItem;
