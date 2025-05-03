import React from "react";

import styles from "./OsagoPolicyInfoFields.module.scss";

import { IOsagoPolicy } from "@/types/policy.types";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CarInfoItem from "@/components/entities/CarInfoItem/CarInfoItem";
import { personTypes } from "@/types/user.types";
import { getDaysBetweenDates } from "@/helpers/getDaysBetweenDates";

interface IProps {
  data: IOsagoPolicy;
}

const OsagoPolicyInfoFields = ({ data }: IProps) => {
  return (
    <div>
      <CustomTitle tag="h2" className={styles.title}>
        Транспортное средство
      </CustomTitle>

      <div className={styles.content}>
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
        <CarInfoItem className={styles.contentItem} name="VIN" value={data.vin} />
      </div>

      <CustomTitle tag="h2" className={styles.title}>
        Собственник ТС
      </CustomTitle>

      <div className={styles.content}>
        <CarInfoItem
          className={styles.contentItem}
          name="Собственник ТС"
          value={data.fio}
        />
        <CarInfoItem
          className={styles.contentItem}
          name={data.owner === personTypes[1] ? "ИНН" : "Серия и номер паспорта"}
          value={data.passport_number}
        />
      </div>

      <div className={styles.content}>
        {data && (
          <>
            <div className={`${styles.contentItem} ${styles.contentItemLarge}`}>
              <h3 className={styles.contentItemLargeTitle}>Срок действия</h3>
              <div className={styles.contentItemLargeWrapper}>
                {data.finish_date && (
                  <span className={styles.contentItemTitle}>
                    {getDaysBetweenDates(data.start_date, data.finish_date)} суток
                  </span>
                )}
                <span className={styles.contentItemValue}>
                  с {data.start_date} {data.finish_date && `по ${data.finish_date}`}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OsagoPolicyInfoFields;
