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

  return (
    <div>
      <CustomTitle tag="h1" isCentered>
        Сохраненные авто
      </CustomTitle>

      {isPending ? (
        <Loader className={styles.loader} />
      ) : data ? (
        <Substrate withShadow="light" className={styles.substrate}>
          <div className={styles.wrapper}>
            <CustomTitle tag="h2" className={styles.title}>
              Транспортное средство
            </CustomTitle>

            <div className={styles.content}>
              {data && (
                <>
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Транспортное средство"
                    value={data.brand}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Год выпуска ТС"
                    value={data.year}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Тип ТС"
                    value={data.transport_category}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Регистрационный знак"
                    value={data.registration_plate}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Номер регистрации ТС"
                    value={data.registration_number}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name="VIN"
                    value={data.vin}
                  />
                </>
              )}
            </div>

            <CustomTitle tag="h2" className={styles.title}>
              Собственник ТС
            </CustomTitle>

            <div className={styles.content}>
              {data && (
                <>
                  <CarInfoItem
                    className={styles.contentItem}
                    name="Собственник ТС"
                    value={data.fio}
                  />
                  <CarInfoItem
                    className={styles.contentItem}
                    name={
                      data.owner === personTypes[0] ? "Серия и номер паспорта" : "ИНН"
                    }
                    value={data.passport_number}
                  />
                </>
              )}
            </div>

            <Link
              href={`${PAGES.CARS_EDIT}/${data ? data.id : ""}`}
              className={styles.editLink}
            >
              Изменить
            </Link>
          </div>

          <Button isLink href={PAGES.OSAGO_APPLY} className={styles.buyPolicyButton}>
            Купить полис
          </Button>
        </Substrate>
      ) : (
        <CustomTitle tag="h3" isCentered className={styles.errorMessage}>
          У вас нет такого транспорта
        </CustomTitle>
      )}
    </div>
  );
};

export default CarInfo;
