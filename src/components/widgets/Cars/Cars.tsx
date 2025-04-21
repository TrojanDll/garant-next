import React from "react";

import styles from "./Cars.module.scss";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import CarsListItem from "@/components/features/CarsListItem/CarsListItem";

const Cars = () => {
  return (
    <div>
      <CustomTitle tag="h1" isCentered>
        Сохраненные авто
      </CustomTitle>

      <ul className={styles.itemsWrapper}>
        <li>
          <CarsListItem brand="Mercedes" model="CLS 550" registration_plate="А123АА777" />
        </li>
      </ul>
    </div>
  );
};

export default Cars;
