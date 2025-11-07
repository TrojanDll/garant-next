"use client";

import React, { useEffect, useState } from "react";

import styles from "./OsagoConfirm.module.scss";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import OsagoPolicyInfoFields from "@/components/features/OsagoPolicyInfoFields/OsagoPolicyInfoFields";
import useCurrientOsagoPolicy from "@/stores/Policy/currientOsagoPolicy";
import Substrate from "@/components/ui/Substrate/Substrate";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";
import CountedPrice from "@/components/features/CountedPrice/CountedPrice";
import { useCreateOsagoPolicy } from "@/hooks/policy/useCreateOsagoPolicy";
import toast from "react-hot-toast";
import useCurrientOsagoPolicyCalculation from "@/stores/Policy/currientOsagoPolicyCalculation";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import useCurrientCar from "@/stores/Cars/currientCar";
import { useRouter } from "next/navigation";

const OsagoConfirm = () => {
  const [isSubmited, setIsSubmited] = useState(false);

  const policy = useCurrientOsagoPolicy((state) => state.policy);
  const policyCalculation = useCurrientOsagoPolicyCalculation(
    (state) => state.calculationData
  );
  const setPolicyCalculation = useCurrientOsagoPolicyCalculation(
    (state) => state.setCalculationData
  );
  const setPolicy = useCurrientOsagoPolicy((state) => state.setPolicy);
  const setCurrientCar = useCurrientCar((state) => state.setCar);

  const { navigateToPolicies } = useNavigation();

  const { data, isError, isPending, isSuccess, mutate } =
    useCreateOsagoPolicy();

  function handleCreateOsagoClick() {
    if (!isSubmited) {
      setIsSubmited(true);

      console.log("handleCreateOsagoClick");

      console.log(policy);
      if (policy) {
        mutate(policy);
      }
    }
  }

  const { reloadPage } = useNavigation();

  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      toast.dismiss();
    }

    if (isPending) {
      toast.loading("Создаём ссылку для оплаты");
    }

    if (isError || (!data?.data.payment.payment_url && data)) {
      toast.error("Ошибка при создании ссылки");
    }

    if (data?.data.payment.payment_url) {
      // toast.success("Ссылка создана");
      // toast.success("Сайт в разработке. Оплата будет доступна с 13 июля");
      console.log(data);
      window.location.href = `${data?.data.payment.payment_url}`;
      // console.log(data?.data.link);

      // window.open(data?.data.payment.payment_url);
      // router.push(`${PAGES.POLICY_INFO}?type=osago&id=${data.data.id}`);
    }

    if (data) {
      setPolicyCalculation(undefined);
      setPolicy(undefined);
      setCurrientCar(undefined);
      setIsSubmited(false);
    }
  }, [isPending]);

  // useEffect(() => {
  //   let isMounted = true;
  //   let timeoutId: NodeJS.Timeout;

  //   if (!isPending) {
  //     toast.dismiss();
  //   } else {
  //     toast.loading("Загрузка");
  //   }

  //   if (isSuccess && isMounted) {
  //     toast.dismiss();
  //     toast.success("Полис создан");

  //     setPolicyCalculation(undefined);
  //     setPolicy(undefined);
  //     setCurrientCar(undefined);

  //     timeoutId = setTimeout(() => {
  //       toast.dismiss();
  //       navigateToPolicies();
  //     }, 1200);
  //   }

  //   return () => {
  //     isMounted = false;

  //     clearTimeout(timeoutId);
  //   };
  // }, [isPending, isSuccess]);

  useEffect(() => {
    reloadPage();
    console.log("reloaded");
  }, []);

  return (
    <section>
      <ContentContainer className={styles.container}>
        <CustomTitle tag="h1" isCentered>
          Проверьте правильность данных
        </CustomTitle>

        <Substrate withShadow="light" className={styles.substrate}>
          {policy ? (
            <OsagoPolicyInfoFields data={policy} />
          ) : (
            "Ошибка. Данные полиса не найдены"
          )}

          <Link href={PAGES.OSAGO_APPLY} className={styles.editLink}>
            Изменить
          </Link>
        </Substrate>

        {policyCalculation && (
          <CountedPrice
            isIsolated={true}
            discount={
              Number(policyCalculation.base_tarif) -
              Number(policyCalculation.tarif)
            }
            finalCost={+policyCalculation?.tarif}
            preliminaryCost={+policyCalculation?.base_tarif}
            className={styles.priceWrapper}
            onClick={handleCreateOsagoClick}
            type="osago"
          />
        )}
      </ContentContainer>
    </section>
  );
};

export default OsagoConfirm;
