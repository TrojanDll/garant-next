"use client";

import React, { useEffect } from "react";

import styles from "./NsConfirm.module.scss";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import useCurrientNsPolicy from "@/stores/Policy/currientNsPolicy";
import NsData from "@/components/features/NsData/NsData";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";
import CountedPrice from "@/components/features/CountedPrice/CountedPrice";
import { useCreateNsPolicy } from "@/hooks/policy/useCreateNsPolicy";
import toast from "react-hot-toast";
import { useNavigation } from "@/hooks/navigation/useNavigation";

const NsConfirm = () => {
  const currientNsPolicy = useCurrientNsPolicy((state) => state.policy);
  const currientNsPolicyCalculation = useCurrientNsPolicy(
    (state) => state.calculationData
  );
  const setCurrientNsPolicy = useCurrientNsPolicy((state) => state.setPolicy);
  const setCurrientNsPolicyCalculation = useCurrientNsPolicy(
    (state) => state.setCalculationData
  );

  const { navigateToPolicies } = useNavigation();

  const { data, isError, isPending, isSuccess, mutate } = useCreateNsPolicy();

  function handleCreateNsClick() {
    if (currientNsPolicy) {
      mutate(currientNsPolicy);
    }
  }

  useEffect(() => {
    if (!isPending) {
      toast.dismiss();
    } else {
      toast.loading("Загрузка");
    }

    if (isSuccess) {
      toast.dismiss();
      toast.success("Полис создан");

      setCurrientNsPolicyCalculation(undefined);
      setCurrientNsPolicy(undefined);

      setTimeout(() => {
        toast.dismiss();
        navigateToPolicies();
      }, 1200);
    }
  }, [isPending]);

  return (
    <section>
      <ContentContainer className={styles.container}>
        <CustomTitle tag="h1" isCentered className={styles.title}>
          Проверьте правильность данных
        </CustomTitle>

        <Substrate withShadow="light" className={styles.substrate}>
          {currientNsPolicy && <NsData policy={currientNsPolicy} />}

          <Link href={PAGES.NS_APPLY} className={styles.editLink}>
            Изменить
          </Link>
        </Substrate>

        {currientNsPolicyCalculation && (
          <CountedPrice
            className={styles.countedPrice}
            finalCost={currientNsPolicyCalculation.to_be_paid}
            preliminaryCost={currientNsPolicyCalculation.base_tariff}
            discount={currientNsPolicyCalculation.discount}
            isIsolated
            onClick={handleCreateNsClick}
            type="ns"
          />
        )}
      </ContentContainer>
    </section>
  );
};

export default NsConfirm;
