"use client";

import React, { useEffect, useState } from "react";

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
import Substrate from "../Substrate/Substrate";
import SvgSelector from "../SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import { getPaymentStatusText } from "@/helpers/Policy/getPaymentStatusText";

interface IProps {
  policyType: "osago" | "ns";
  policyNsData?: INsPolicy;
  policyOsagoData?: IOsagoPolicy;
  className?: string;
}

const MyPolicyListItem = ({
  policyType,
  policyNsData,
  policyOsagoData,
  className,
}: IProps) => {
  const [universalPolicyData, setUniversalPolicyData] = useState<IPolicyUniversalData>();
  const [paymentStatusClassName, setPaymentStatusClassName] = useState<string>("");

  useEffect(() => {
    const universalData = getUniversalPolicyData({
      policyNsData,
      policyOsagoData,
    });

    setUniversalPolicyData(universalData);

    if (universalData.payment_status === EPolicyStatus.ACTIVE) {
      setPaymentStatusClassName("active");
    } else if (universalData.payment_status === EPolicyStatus.AWAITING_PAYMENT) {
      setPaymentStatusClassName("awaiting");
    } else if (universalData.payment_status === EPolicyStatus.EXPIRED) {
      setPaymentStatusClassName("expired");
    }
  }, []);

  return (
    <>
      {universalPolicyData && (
        <Link
          href={`${
            policyType === "osago" ? PAGES.POLICY_INFO_OSAGO : PAGES.POLICY_INFO_NS
          }${universalPolicyData.id}`}
          className={`${styles.root} ${className}`}
        >
          <Substrate withShadow="light" className={styles.substrate}>
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                {policyType === "osago" ? (
                  <>
                    <SvgSelector id={ESvgName.OSAGO} className={styles.icon} />
                    ОСАГО
                  </>
                ) : (
                  <>
                    <SvgSelector id={ESvgName.NS} className={styles.icon} />
                    НС
                  </>
                )}
              </div>
            </div>

            <div className={styles.contentWrapper}>
              <div className={styles.mainInfo}>
                <h2 className={styles.title}>{universalPolicyData.title}</h2>

                <div className={`${styles.status} ${styles[paymentStatusClassName]}`}>
                  {getPaymentStatusText(universalPolicyData.payment_status)}
                </div>

                <div className={styles.duration}>
                  {universalPolicyData.start_date} - {universalPolicyData.finish_date}
                </div>
              </div>

              <div className={styles.policyNumber}>
                <span>Номер полиса:</span>
                {universalPolicyData.policyNumber}
              </div>

              <div className={styles.more}>Подробнее...</div>
            </div>
          </Substrate>
        </Link>
      )}
    </>
  );
};

export default MyPolicyListItem;
