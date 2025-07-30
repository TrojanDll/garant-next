"use client";

import React, { useEffect } from "react";

import styles from "./Cars.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CarsListItem from "@/components/features/CarsListItem/CarsListItem";
import { useGetCurrientUserCars } from "@/hooks/cars/useGetCurrientUserCars";
import Button from "@/components/ui/Button/Button";
import Loader from "@/components/ui/Loader/Loader";
import { PAGES } from "@/config/pages-url.config";
import useCurrientCar from "@/stores/Cars/currientCar";

const Cars = () => {
  const { carsData } = useGetCurrientUserCars();
  const setCar = useCurrientCar((state) => state.setCar);

  const handleClick = (index: number) => {
    console.log(index);

    if (carsData) {
      setCar(carsData[index]);
    }
  };

  return (
    <div>
      <CustomTitle tag="h1" isCentered>
        Сохраненные авто
      </CustomTitle>

      {carsData ? (
        <>
          <ul className={styles.itemsWrapper}>
            {carsData.map((item, i) => (
              <li key={item.id} className={styles.carItem}>
                <CarsListItem
                  id={Number(item.id)}
                  brand={item.brand}
                  model={item.model}
                  registration_plate={item.registration_plate}
                  onClick={() => handleClick(i)}
                />
              </li>
            ))}
          </ul>
          <Button isLink href={PAGES.CARS_NEW} className={styles.addNewButton}>
            + Добавить авто
          </Button>
        </>
      ) : (
        <Loader className={styles.loader} />
      )}
    </div>
  );
};

export default Cars;
