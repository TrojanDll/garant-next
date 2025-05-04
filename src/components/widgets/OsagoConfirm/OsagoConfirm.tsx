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

interface IAmounts {
  discount: number;
  finalCost: number;
  preliminaryCost: number;
}

const OsagoConfirm = () => {
  const policy = useCurrientOsagoPolicy((state) => state.policy);
  // const [amounts, setAmounts] = useState<IAmounts>();

  // function countAmount() {
  //   let amounts: IAmounts = {
  //     discount: 0,
  //     finalCost: 0,
  //     preliminaryCost: 0,
  //   };

  //   if (policy) {

  //     amounts.finalCost = +policy.amount_to_be_paid;
  //     amounts.discount = +policy.
  //     amounts.preliminaryCost = +policy.amount_to_be_paid / (1 - +policy.discount_amount)
  //   }
  // }

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

        {policy && (
          <CountedPrice
            isIsolated={true}
            discount={+policy?.discount_amount}
            finalCost={+policy?.amount_to_be_paid - +policy?.discount_amount}
            preliminaryCost={+policy?.amount_to_be_paid}
            className={styles.priceWrapper}
          />
        )}
      </ContentContainer>
    </section>
  );
};

export default OsagoConfirm;
