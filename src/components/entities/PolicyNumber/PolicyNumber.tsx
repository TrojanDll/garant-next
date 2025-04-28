import React from "react";

import styles from "./PolicyNumber.module.scss";

import { EPolicyTypes } from "@/types/policy.types";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

interface IProps {
  policyType: EPolicyTypes;
  policyNumber: string;
}

const PolicyNumber = ({ policyNumber, policyType }: IProps) => {
  return (
    <div className={styles.root}>
      {policyType === EPolicyTypes.OSAGO ? (
        <SvgSelector id={ESvgName.OSAGO} className={styles.svg} />
      ) : (
        <SvgSelector id={ESvgName.NS} className={styles.svg} />
      )}

      <div className={styles.info}>
        <h2 className={styles.title}>
          {policyType === EPolicyTypes.OSAGO
            ? "Полис ОСАГО"
            : "Полис от несчастного случая"}
        </h2>
        <p className={styles.number}>{policyNumber}</p>
      </div>
    </div>
  );
};

export default PolicyNumber;
