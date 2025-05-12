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
import { ICreateNsPolicyRequest } from "@/types/policy.types";
import { formatDataToCreateNsPolicy } from "@/helpers/NsApply/formatDataToCreateNsPolicy.helper";

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
      const formatedData: ICreateNsPolicyRequest =
        formatDataToCreateNsPolicy(currientNsPolicy);

      mutate(formatedData);
    }
  }

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    if (!isPending) {
      toast.dismiss();
    } else {
      toast.loading("Загрузка");
    }

    if (isSuccess && isMounted) {
      toast.dismiss();
      toast.success("Полис создан");

      timeoutId = setTimeout(() => {
        toast.dismiss();
        setCurrientNsPolicyCalculation(undefined);
        setCurrientNsPolicy(undefined);
        navigateToPolicies();
      }, 1000);
    }
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isPending, isSuccess, isError]);

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
