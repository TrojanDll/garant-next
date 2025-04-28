"use client";

import React, { useState } from "react";

import styles from "./PolicyInfo.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import { EPolicyTypes } from "@/types/policy.types";
import PolicyNumber from "@/components/entities/PolicyNumber/PolicyNumber";

interface IProps {
  className?: string;
}

const PolicyInfo = ({ className }: IProps) => {
  const [policyType, setPolicyType] = useState(EPolicyTypes.OSAGO);

  return (
    <div className={className}>
      <ContentContainer>
        <Substrate className={styles.substrate} withShadow="light">
          <div className={styles.header}>
            <PolicyNumber policyNumber="АБ000012345" policyType={EPolicyTypes.OSAGO} />
          </div>
        </Substrate>
      </ContentContainer>
    </div>
  );
};

export default PolicyInfo;
