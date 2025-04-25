"use client";

import React, { useEffect, useState } from "react";

import styles from "./CarInfo.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import CarInfoItem from "@/components/entities/CarInfoItem/CarInfoItem";
import { useParams } from "next/navigation";
import { useGetCarInfoById } from "@/hooks/cars/useGetCarInfoById";
import Loader from "@/components/ui/Loader/Loader";
import { personTypes } from "@/types/user.types";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";
import Button from "@/components/ui/Button/Button";

const fieldNames: string[] = [
  "Транспортное средство",
  "Год выпуска ТС",
  "Тип ТС",
  "Регистрационный знак",
  "Номер регистрации ТС",
  "VIN",
  "Собственник ТС",
  "Серия и номер паспорта",
];

const CarInfo = () => {
  const params = useParams();
  const { data, isError, isPending, isSuccess, mutate } = useGetCarInfoById();

  useEffect(() => {
    let slug: string = "";

    if (typeof params.slug === "string") {
      slug = params.slug;
    } else if (Array.isArray(params.slug)) {
      slug = params.slug[0];
    }

    slug = decodeURIComponent(slug);

    mutate(slug);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isPending]);

  return (
    <div>
      <CustomTitle tag="h1" isCentered>
        Сохраненные авто
      </CustomTitle>

      {isPending ? (
        <Loader className={styles.loader} />
      ) : (
        <Substrate withShadow="light" className={styles.substrate}>
          <div className={styles.wrapper}>
            <CustomTitle tag="h2" className={styles.title}>
              Транспортное средство
            </CustomTitle>

            <div className={styles.content}>
              <CarInfoItem
                className={styles.contentItem}
                name="Транспортное средство"
                value="Mercedes-Benz CLS"
              />
              <CarInfoItem
                className={styles.contentItem}
                name="Транспортное средство"
                value="Mercedes-Benz CLS"
              />

              {data && (
                <>
                  <CarInfoItem key={data.id} name="Транспортное средство" value={data.brand} />
                  <CarInfoItem key={data.id} name="Год выпуска ТС" value={data.year} />
                  <CarInfoItem key={data.id} name="Тип ТС" value={data.transport_category} />
                  <CarInfoItem
                    key={data.id}
                    name="Регистрационный знак"
                    value={data.registration_plate}
                  />
                  <CarInfoItem
                    key={data.id}
                    name="Номер регистрации ТС"
                    value={data.registration_number}
                  />
                  <CarInfoItem key={data.id} name="VIN" value={data.vin} />
                </>
              )}
            </div>

            <CustomTitle tag="h2" className={styles.title}>
              Собственник ТС
            </CustomTitle>

            <div className={styles.content}>
              {data && (
                <>
                  <CarInfoItem key={data.id} name="Собственник ТС" value={data.fio} />
                  <CarInfoItem
                    key={data.id}
                    name="Серия и номер паспорта"
                    value={data.passport_number}
                  />
                </>
              )}
            </div>

            <Link href={`${PAGES.CARS_EDIT}/${data ? data.id : ""}`} className={styles.editLink}>
              Изменить
            </Link>
          </div>

          <Button className={styles.buyPolicyButton}>Купить полис</Button>
        </Substrate>
      )}
    </div>
  );
};

export default CarInfo;
