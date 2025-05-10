"use client";

import React, { useState } from "react";

import styles from "./OsagoConfirm.module.scss";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import OsagoPolicyInfoFields from "@/components/features/OsagoPolicyInfoFields/OsagoPolicyInfoFields";
import useCurrientOsagoPolicy from "@/stores/Policy/currientOsagoPolicy";
import Substrate from "@/components/ui/Substrate/Substrate";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";
import CountedPrice from "@/components/features/CountedPrice/CountedPrice";

const OsagoConfirm = () => {
  const policy = useCurrientOsagoPolicy((state) => state.policy);
  const policyCalculation = useCurrientOsagoPolicy((state) => state.calculationData);

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
            discount={+policyCalculation?.discount}
            finalCost={+policyCalculation?.tarif}
            preliminaryCost={+policyCalculation?.base_tarif}
            className={styles.priceWrapper}
          />
        )}
      </ContentContainer>
    </section>
  );
};

export default OsagoConfirm;
