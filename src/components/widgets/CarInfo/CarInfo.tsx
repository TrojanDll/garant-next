import React from "react";

import styles from "./CarInfo.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import CarInfoItem from "@/components/entities/CarInfoItem/CarInfoItem";

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

  
  return (
    <div>
      <CustomTitle tag="h1" isCentered>
        Сохраненные авто
      </CustomTitle>

      <Substrate withShadow="light" className={styles.substrate}>
        <div className={styles.wrapper}>
          <CustomTitle tag="h2" className={styles.title}>
            Транспортное средство
          </CustomTitle>

          <div className={styles.content}>
            <CarInfoItem name="Транспортное средство" value="Mercedes-Benz CLS" />
          </div>
        </div>
      </Substrate>
    </div>
  );
};

export default CarInfo;
