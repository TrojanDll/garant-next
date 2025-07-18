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
import { useParams, useSearchParams } from "next/navigation";
import Loader from "@/components/ui/Loader/Loader";
import OsagoPolicyInfoFields from "@/components/features/OsagoPolicyInfoFields/OsagoPolicyInfoFields";
import { useGetNsPolicyById } from "@/hooks/policy/useGetNsPolicyById";
import { getPaymentStatus } from "@/helpers/Policy/getPaymentStatus";
import NsData from "@/components/features/NsData/NsData";
import { useFetchAndDownloadOsagoPDFById } from "@/hooks/pdf/useFetchAndDownloadOsagoPDFById";
import toast from "react-hot-toast";
import { useNsFetchAndDownloadPDFById } from "@/hooks/pdf/useNsFetchAndDownloadPDFByID";
import echo from "@/api/socket";
import { useGetCurrientUser } from "@/hooks/user/useGetCurrientUser";
import useCurrientUser from "@/stores/user/currientUser";

interface IProps {
  className?: string;
}

const PolicyInfo = ({ className }: IProps) => {
  const params = useSearchParams();
  const [policyType, setPolicyType] = useState(EPolicyTypes.OSAGO);
  const [policyStatus, setPolicyStatus] = useState<EPolicyStatus | null>(null);
  const [policyNumber, setPolicyNumber] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [policyData, setPolicyData] = useState<ICreateOsagoPolicyRequest>();
  const [currientPolicyId, setCurrientPolicyId] = useState<string | null>(null);
  const [paymentParam, setPaymentParam] = useState<string | null>(null);
  const [isIntervalSetted, setIsIntervalSetted] = useState<boolean>(false);

  const { data, isError, isPending, isSuccess, mutate } =
    useGetOsagoPolicyById();

  const {
    data: nsPolicyFetchedData,
    isPending: isNsPending,
    isSuccess: isNsSuccess,
    mutate: nsMutate,
  } = useGetNsPolicyById();

  const {
    mutate: fetchAndDownloadOsagoPdfById,
    isPending: isPdfPending,
    isError: isPdfError,
    isSuccess: isPdfSuccess,
  } = useFetchAndDownloadOsagoPDFById();

  const {
    mutate: nsFetchAndDownloadOsagoPdfById,
    isPending: isNsPdfPending,
    isError: isNsPdfError,
    isSuccess: isNsPdfSuccess,
  } = useNsFetchAndDownloadPDFById();

  function handleDownloadPolicy() {
    if (data) {
      fetchAndDownloadOsagoPdfById({ osago_id: data.id });
    } else if (nsPolicyFetchedData) {
      nsFetchAndDownloadOsagoPdfById({ ns_id: nsPolicyFetchedData.id });
    }
  }

  useEffect(() => {
    if (isPdfPending || isNsPdfPending) {
      toast.loading("Формируем PDF");
    } else {
      toast.dismiss();
    }

    if (isPdfSuccess) {
      toast.success("Готово");
    } else if (isPdfError) {
      toast.error("Ошибка при создании PDF");
    }

    if (isNsPdfSuccess) {
      toast.success("Готово");
    } else if (isNsPdfError) {
      toast.error("Ошибка при создании PDF");
    }
  }, [isPdfPending, isNsPdfPending]);

  useEffect(() => {
    const paymentParam = params.get("payment");
    const typeParam = params.get("type");
    const idParam = params.get("id");

    setPaymentParam(paymentParam);
    setCurrientPolicyId(idParam);

    if (idParam) {
      if (typeParam === "osago") {
        setPolicyType(EPolicyTypes.OSAGO);
        mutate({ osago_id: Number(idParam) });
      } else if (typeParam === "ns") {
        setPolicyType(EPolicyTypes.NS);
        nsMutate({ ns_id: Number(idParam) });
      }
    }
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    console.log("useEffect");
    console.log(policyStatus);
    if (policyStatus === EPolicyStatus.AWAITING_PAYMENT) {
      if (!isIntervalSetted) {
        console.log(policyStatus);
        intervalId = setInterval(() => {
          console.log("interval setted");
          if (policyType === EPolicyTypes.OSAGO) {
            console.log(data);
            mutate({ osago_id: Number(data?.id) });
          } else {
            nsMutate({ ns_id: Number(nsPolicyFetchedData?.id) });
          }
        }, 15000);
      } else {
        setIsIntervalSetted(true);
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [data, nsPolicyFetchedData, policyStatus]);

  useEffect(() => {
    if (isSuccess && data) {
      setPolicyStatus(getPaymentStatus(data.payment_status));

      setPolicyData({
        brand: data?.brand,
        car_model: data?.model,
        car_year: data?.year,
        duration_of_stay: data?.duration_of_stay,
        fio: data?.fio,
        owner: data?.owner,
        passport_number: data?.passport_number,
        promo_code: data?.promo_code,
        registration_number: data?.registration_number,
        registration_plate: data?.registration_plate,
        start_date: data?.start_date,
        transport_category: data?.transport_category,
        vin: data?.vin,
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

  function isDownloadButtonVisible(): boolean {
    return (
      policyStatus === EPolicyStatus.ACTIVE ||
      policyStatus === EPolicyStatus.ARCHIVE ||
      policyStatus === EPolicyStatus.EXPIRED
      // true
    );
  }

  function getPaymentUrl(): string {
    if (
      !data?.payment.payment_url &&
      !nsPolicyFetchedData?.payment.payment_url
    ) {
      toast.error(
        "Ошибка. Ссылки на оплату нет или истёк срок жизни. Создайте новый полис"
      );
    }

    return nsPolicyFetchedData
      ? nsPolicyFetchedData.payment.payment_url
      : data
      ? data.payment.payment_url
      : "";
  }

  return (
    <div className={className}>
      {(data && policyData) || nsPolicyFetchedData ? (
        <ContentContainer className={styles.container}>
          <Substrate className={styles.substrate} withShadow="light">
            <div className={styles.header}>
              <PolicyNumber
                policyNumber={policyNumber}
                policyType={policyType}
              />
              <PolicyStatus
                className={styles.status}
                status={
                  paymentParam === "success"
                    ? EPolicyStatus.ACTIVE
                    : policyStatus
                    ? policyStatus
                    : EPolicyStatus.AWAITING_PAYMENT
                }
              />
            </div>

            {isDownloadButtonVisible() && (
              <Button
                onClickEvent={handleDownloadPolicy}
                style="outlined"
                variant="small"
                className={styles.downloadButton}
                contentClassName={styles.downloadButtonContent}
              >
                <SvgSelector id={ESvgName.PDF} className={styles.pdfSvg} />
                Скачать полис
              </Button>
            )}

            {data && (
              <OsagoPolicyInfoFields
                className={styles.fields}
                data={policyData}
              />
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
            <AwaitingPayment
              amount={price}
              className={styles.awaitingPayment}
              policyId={currientPolicyId}
              policyType={policyType}
              paymentUrl={getPaymentUrl()}
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
