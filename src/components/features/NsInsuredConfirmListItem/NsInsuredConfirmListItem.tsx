import React from "react";

import styles from "./NsInsuredConfirmListItem.module.scss";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CarInfoItem from "@/components/entities/CarInfoItem/CarInfoItem";

interface IProps {
  fio?: string;
  gender?: string;
  date_of_birth?: string;
  passport_number?: string;
  index: number;
  className?: string;
}

const NsInsuredConfirmListItem = ({
  date_of_birth,
  fio,
  gender,
  passport_number,
  index,
  className,
}: IProps) => {
  return (
    <div className={`${styles.root} ${className}`}>
      <CustomTitle tag="h2">Застрахованный №{index}</CustomTitle>

      <div className={styles.fieldsWrapper}>
        <CarInfoItem className={styles.fileldItem} name="ФИО" value={fio} />
        <CarInfoItem className={styles.fileldItem} name="Пол" value={gender} />
        <CarInfoItem
          className={styles.fileldItem}
          name="Дата рождения"
          value={date_of_birth}
        />
        <CarInfoItem
          className={styles.fileldItem}
          name="Серия и номер паспорта"
          value={passport_number}
        />
      </div>
    </div>
  );
};

export default NsInsuredConfirmListItem;
