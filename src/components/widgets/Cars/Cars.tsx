"use client";

import React from "react";

import styles from "./Cars.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CarsListItem from "@/components/features/CarsListItem/CarsListItem";
import { useGetCurrientUserCars } from "@/hooks/cars/useGetCurrientUserCars";
import Button from "@/components/ui/Button/Button";
import Loader from "@/components/ui/Loader/Loader";
import { PAGES } from "@/config/pages-url.config";

const Cars = () => {
  const { carsData, isError, isLoading, isSuccess } = useGetCurrientUserCars();

  return (
    <div>
      <CustomTitle tag="h1" isCentered>
        Сохраненные авто
      </CustomTitle>
      
      {carsData ? (
        <>
          <ul className={styles.itemsWrapper}>
            {carsData.map((item) => (
              <li key={item.id} className={styles.carItem}>
                <CarsListItem
                  id={Number(item.id)}
                  brand={item.brand}
                  model={item.model}
                  registration_plate={item.registration_plate}
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
