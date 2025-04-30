"use client";

import React, { useEffect, useState } from "react";

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
import { useGetOsagoPolicyById } from "@/hooks/policy/useGetOsagoPolicyById";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/Loader/Loader";
import { personTypes } from "@/types/user.types";

interface IProps {
  className?: string;
}

const PolicyInfo = ({ className }: IProps) => {
  const params = useParams();
  const [policyType, setPolicyType] = useState(EPolicyTypes.OSAGO);
  const [policyStatus, setPolicyStatus] = useState(EPolicyStatus.AWAITING_PAYMENT);
  const [policyNumber, setPolicyNumber] = useState("");

  const { data, isError, isPending, isSuccess, mutate } = useGetOsagoPolicyById();

  useEffect(() => {
    let slug = "";

    if (typeof params.slug === "string") {
      slug = params.slug;
    } else if (Array.isArray(params.slug)) {
      slug = params.slug[0];
    }

    slug = decodeURIComponent(slug);

    const match = slug.match(/(osago|ns)-(\d+)/);

    if (match && match[1] && match[2]) {
      const type = match[1];
      const id = parseInt(match[2], 10);

      if (type === "osago") {
        setPolicyType(EPolicyTypes.OSAGO);
      } else if (type === "ns") {
        setPolicyType(EPolicyTypes.NS);
      }

      mutate({ osago_id: id });
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      if (data.payment_status === "Активный") {
        setPolicyStatus(EPolicyStatus.ACTIVE);
      } else if (data.payment_status === "Ожидает оплаты") {
        setPolicyStatus(EPolicyStatus.AWAITING_PAYMENT);
      } else if (data.payment_status === "Истек срок действия") {
        setPolicyStatus(EPolicyStatus.EXPIRED);
      }
    }
  }, [isPending]);

  useEffect(() => {
    if (policyType === EPolicyTypes.OSAGO && data) {
      setPolicyNumber(data.osaga_number);
    }
  }, [policyType, isPending, isSuccess]);

  return (
    <div className={className}>
      {data ? (
        <ContentContainer className={styles.container}>
          <Substrate className={styles.substrate} withShadow="light">
            <div className={styles.header}>
              <PolicyNumber policyNumber={policyNumber} policyType={policyType} />
              <PolicyStatus className={styles.status} status={policyStatus} />
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
                <CarInfoItem
                  className={styles.contentItem}
                  name="Транспортное средство"
                  value={data.brand}
                />
                <CarInfoItem
                  className={styles.contentItem}
                  name="Год выпуска ТС"
                  value={data.year}
                />
                <CarInfoItem
                  className={styles.contentItem}
                  name="Тип ТС"
                  value={data.transport_category}
                />
                <CarInfoItem
                  className={styles.contentItem}
                  name="Регистрационный знак"
                  value={data.registration_plate}
                />
                <CarInfoItem
                  className={styles.contentItem}
                  name="Номер регистрации ТС"
                  value={data.registration_number}
                />
                <CarInfoItem className={styles.contentItem} name="VIN" value={data.vin} />
              </div>

              <CustomTitle tag="h2" className={styles.title}>
                Собственник ТС
              </CustomTitle>

              <div className={styles.content}>
                <CarInfoItem
                  className={styles.contentItem}
                  name="Собственник ТС"
                  value={data.fio}
                />
                <CarInfoItem
                  className={styles.contentItem}
                  name={data.owner === personTypes[1] ? "ИНН" : "Серия и номер паспорта"}
                  value={data.passport_number}
                />
              </div>

              <div className={styles.content}>
                {data && (
                  <>
                    <div className={`${styles.contentItem} ${styles.contentItemLarge}`}>
                      <h3 className={styles.contentItemLargeTitle}>Срок действия</h3>
                      <div className={styles.contentItemLargeWrapper}>
                        {data.finish_date && (
                          <span className={styles.contentItemTitle}>15 суток</span>
                        )}
                        <span className={styles.contentItemValue}>
                          с {data.start_date}{" "}
                          {data.finish_date && `по ${data.finish_date}`}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Substrate>

          {policyStatus === EPolicyStatus.AWAITING_PAYMENT && (
            <AwaitingPayment
              ammount={+data.amount_to_be_paid}
              className={styles.awaitingPayment}
            />
          )}
        </ContentContainer>
      ) : !isError ? (
        <Loader className={styles.loader} />
      ) : (
        <ContentContainer>
          <CustomTitle isCentered tag="h2" className={styles.error}>
            Ошибка
          </CustomTitle>
        </ContentContainer>
      )}
    </div>
  );
};

export default PolicyInfo;
