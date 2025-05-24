"use client";

import React, { useEffect, useState } from "react";

import styles from "./PolicyInfo.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import {
  EPolicyStatus,
  EPolicyTypes,
  ICreateOsagoPolicyRequest,
} from "@/types/policy.types";
import PolicyNumber from "@/components/entities/PolicyNumber/PolicyNumber";
import PolicyStatus from "@/components/ui/PolicyStatus/PolicyStatus";
import Button from "@/components/ui/Button/Button";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import AwaitingPayment from "@/components/features/AwaitingPayment/AwaitingPayment";
import { useGetOsagoPolicyById } from "@/hooks/policy/useGetOsagoPolicyById";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/Loader/Loader";
import OsagoPolicyInfoFields from "@/components/features/OsagoPolicyInfoFields/OsagoPolicyInfoFields";

interface IProps {
  className?: string;
}

const PolicyInfo = ({ className }: IProps) => {
  const params = useParams();
  const [policyType, setPolicyType] = useState(EPolicyTypes.OSAGO);
  const [policyStatus, setPolicyStatus] = useState(EPolicyStatus.AWAITING_PAYMENT);
  const [policyNumber, setPolicyNumber] = useState("");
  const [policyData, setPolicyData] = useState<ICreateOsagoPolicyRequest>();

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

      setPolicyData({
        brand: data.brand,
        car_model: data.model,
        car_year: data.year,
        duration_of_stay: data.duration_of_stay,
        fio: data.fio,
        owner: data.owner,
        passport_number: data.passport_number,
        promo_code: data.promo_code,
        registration_number: data.registration_number,
        registration_plate: data.registration_plate,
        start_date: data.start_date,
        transport_category: data.transport_category,
        vin: data.vin,
      });
    }
  }, [isPending]);

  useEffect(() => {
    if (policyType === EPolicyTypes.OSAGO && data) {
      setPolicyNumber(data.osaga_number);
      console.log(data);
    }
  }, [policyType, isPending, isSuccess]);

  return (
    <div className={className}>
      {data && policyData ? (
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

            <OsagoPolicyInfoFields className={styles.fields} data={policyData} />
          </Substrate>

          {policyStatus === EPolicyStatus.AWAITING_PAYMENT && (
            <AwaitingPayment
              ammount={+data.for_payment}
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
