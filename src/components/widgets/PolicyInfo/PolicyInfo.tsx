"use client";

import React, { useEffect, useState } from "react";

import styles from "./PolicyInfo.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import {
  EPolicyStatus,
  EPolicyTypes,
  ICreateOsagoPolicyRequest,
  INsPolicy,
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
import { useGetNsPolicyById } from "@/hooks/policy/useGetNsPolicyById";
import { getPaymentStatus } from "@/helpers/Policy/getPaymentStatus";
import NsData from "@/components/features/NsData/NsData";

interface IProps {
  className?: string;
}

const PolicyInfo = ({ className }: IProps) => {
  const params = useParams();
  const [policyType, setPolicyType] = useState(EPolicyTypes.OSAGO);
  const [policyStatus, setPolicyStatus] = useState(EPolicyStatus.AWAITING_PAYMENT);
  const [policyNumber, setPolicyNumber] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [policyData, setPolicyData] = useState<ICreateOsagoPolicyRequest>();
  // const [nsPolicyData, setNsPolicyData] = useState<INsPolicy>();

  const { data, isError, isPending, isSuccess, mutate } = useGetOsagoPolicyById();
  const {
    data: nsPolicyFetchedData,
    isError: isNsError,
    isPending: isNsPending,
    isSuccess: isNsSuccess,
    mutate: nsMutate,
  } = useGetNsPolicyById();

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
        mutate({ osago_id: id });
      } else if (type === "ns") {
        setPolicyType(EPolicyTypes.NS);
        nsMutate({ ns_id: id });
      }
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      setPolicyStatus(getPaymentStatus(data.payment_status));

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

    if (isNsSuccess && nsPolicyFetchedData) {
      setPolicyStatus(getPaymentStatus(nsPolicyFetchedData.status));
    }
  }, [isPending, isNsPending]);

  useEffect(() => {
    if (policyType === EPolicyTypes.OSAGO && data) {
      setPolicyNumber(data.osaga_number);
      setPrice(data.for_payment);
    }

    if (policyType === EPolicyTypes.NS && nsPolicyFetchedData) {
      setPolicyNumber(nsPolicyFetchedData.NS_number);
      setPrice(+nsPolicyFetchedData.amount_to_be_paid);
    }
  }, [policyType, isPending, isSuccess, isNsPending, isNsSuccess]);

  return (
    <div className={className}>
      {(data && policyData) || nsPolicyFetchedData ? (
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

            {data && (
              <OsagoPolicyInfoFields className={styles.fields} data={policyData} />
            )}

            {nsPolicyFetchedData && (
              <div className={styles.nsDataWrapper}>
                <NsData
                  policy={{
                    duration_of_stay: nsPolicyFetchedData.duration_of_stay,
                    insured: nsPolicyFetchedData.get_peoples,
                    promocode: nsPolicyFetchedData.promocode,
                    start_date: nsPolicyFetchedData.start_date,
                  }}
                />
              </div>
            )}
          </Substrate>

          {policyStatus === EPolicyStatus.AWAITING_PAYMENT && (
            <AwaitingPayment amount={price} className={styles.awaitingPayment} />
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
