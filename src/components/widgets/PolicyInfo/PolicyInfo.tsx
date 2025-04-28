"use client";

import React, { useState } from "react";

import styles from "./PolicyInfo.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import { EPolicyStatus, EPolicyTypes } from "@/types/policy.types";
import PolicyNumber from "@/components/entities/PolicyNumber/PolicyNumber";
import PolicyStatus from "@/components/ui/PolicyStatus/PolicyStatus";
import Button from "@/components/ui/Button/Button";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import Link from "next/link";

interface IProps {
  className?: string;
}

const PolicyInfo = ({ className }: IProps) => {
  const [policyType, setPolicyType] = useState(EPolicyTypes.OSAGO);

  return (
    <div className={className}>
      <ContentContainer className={styles.container}>
        <Substrate className={styles.substrate} withShadow="light">
          <div className={styles.header}>
            <PolicyNumber policyNumber="АБ000012345" policyType={EPolicyTypes.OSAGO} />
            <PolicyStatus status={EPolicyStatus.AWAITING_PAYMENT} />
          </div>

          <Button
            isLink
            href="/files/example.pdf"
            type="download"
            style="outlined"
            variant="small"
            className={styles.downloadButton}
          >
            <SvgSelector id={ESvgName.PDF} className={styles.pdfSvg} />
            Скачать полис
          </Button>
        </Substrate>
      </ContentContainer>
    </div>
  );
};

export default PolicyInfo;
