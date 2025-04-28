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
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CarInfoItem from "@/components/entities/CarInfoItem/CarInfoItem";
import { PAGES } from "@/config/pages-url.config";
import AwaitingPayment from "@/components/features/AwaitingPayment/AwaitingPayment";

interface IProps {
  className?: string;
}

const PolicyInfo = ({ className }: IProps) => {
  const [policyType, setPolicyType] = useState(EPolicyTypes.OSAGO);
  const [data, setData] = useState("sdvb");

  return (
    <div className={className}>
      <ContentContainer className={styles.container}>
        <Substrate className={styles.substrate} withShadow="light">
          <div className={styles.header}>
            <PolicyNumber policyNumber="АБ000012345" policyType={EPolicyTypes.OSAGO} />
            <PolicyStatus
              className={styles.status}
              status={EPolicyStatus.AWAITING_PAYMENT}
            />
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

          <div className={styles.wrapper}>
            <CustomTitle tag="h2" className={styles.title}>
              Транспортное средство
            </CustomTitle>

            <div className={styles.content}>
              {data && (
                <>
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Транспортное средство"
                    value={"Mercedes-Benz CLS"}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Год выпуска ТС"
                    value={"2019"}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Тип ТС"
                    value={"Легковой автомобиль"}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Регистрационный знак"
                    value={"А123АА999"}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Номер регистрации ТС"
                    value={"12345 67896789"}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name="VIN"
                    value={"12345 67896789"}
                  />
                </>
              )}
            </div>

            <CustomTitle tag="h2" className={styles.title}>
              Собственник ТС
            </CustomTitle>

            <div className={styles.content}>
              {data && (
                <>
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Собственник ТС"
                    value={"Иванов Петр Алексеевич"}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name={"Серия и номер паспорта"}
                    value={"4523 77889955"}
                  />
                </>
              )}
            </div>

            <div className={styles.content}>
              {data && (
                <>
                  <div className={`${styles.contentItem} ${styles.contentItemLarge}`}>
                    <h3 className={styles.contentItemLargeTitle}>Срок действия</h3>
                    <div className={styles.contentItemLargeWrapper}>
                      <span className={styles.contentItemTitle}>15 суток</span>
                      <span className={styles.contentItemValue}>
                        с 01.01.2025 по 15.01.2025
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Substrate>

        <AwaitingPayment ammount={1000} className={styles.awaitingPayment} />
      </ContentContainer>
    </div>
  );
};

export default PolicyInfo;
