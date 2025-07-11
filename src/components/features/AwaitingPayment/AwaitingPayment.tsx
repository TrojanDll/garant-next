import React, { useEffect } from "react";

import styles from "./AwaitingPayment.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";
import { useGetOsagoPaymentLink } from "@/hooks/payment/useGetOsagoPaymentLink";
import toast from "react-hot-toast";
import { EPolicyTypes } from "@/types/policy.types";

interface IProps {
  className?: string;
  amount: number;
  policyId: string | null;
  policyType: EPolicyTypes;
}

const AwaitingPayment = ({
  amount,
  className,
  policyId,
  policyType,
}: IProps) => {
  const { data, isError, isPending, mutate } = useGetOsagoPaymentLink();

  function handleClick() {
    if (policyId) {
      if (policyType === EPolicyTypes.OSAGO) {
        console.log({ osago_id: policyId });
        mutate({ osago_id: policyId });
      }
    }
    // window.location.href = "";
  }

  useEffect(() => {
    if (!isPending) {
      toast.dismiss();
    }

    if (isPending) {
      toast.loading("Создаём ссылку для оплаты");
    }

    if (isError || (!data?.data.status && data)) {
      toast.error("Ошибка при создании ссылки");
    }

    if (data?.data.status) {
      // toast.success("Ссылка создана");
      toast.success("Сайт в разработке. Оплата будет доступна с 13 июля");
      console.log(data);
      // window.location.href = "";
      if (data?.data.link) {
        // console.log(data?.data.link);
        // window.open(data?.data.link, "_blank", "noopener,noreferrer");
      }
    }
  }, [isPending]);

  return (
    <Substrate
      className={`${className} ${styles.substrate}`}
      withShadow="light"
    >
      <p className={styles.title}>Полис ожидает оплаты</p>
      <p className={styles.amount}>{amount}₽</p>
      <Button
        onClickEvent={handleClick}
        className={styles.button}
        variant="wide"
      >
        Оплатить
      </Button>
    </Substrate>
  );
};

export default AwaitingPayment;
