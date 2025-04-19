"use client";

import React from "react";

import styles from "./PersonalData.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import { useGetCurrientUser } from "@/hooks/user/useGetCurrientUser";
import UserDataItem from "@/components/ui/UserDataItem/UserDataItem";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";

enum EUserData {
  id = "id",
  name = "Имя",
  surname = "Фамилия",
  patronymic = "Отчество",
  email = "Email",
  phone = "Номер телефона",
  date_of_birth = "Дата рождения",
}

const PersonalData = () => {
  const { userData } = useGetCurrientUser();

  return (
    <div>
      <CustomTitle tag="h1" isCentered>
        Личные данные
      </CustomTitle>

      <Substrate withShadow="light" className={styles.substrate}>
        <ul className={styles.dataList}>
          {userData !== undefined ? (
            <>
              <UserDataItem className={styles.dataItem} title="Фамилия" value={userData.surname} />
              <UserDataItem className={styles.dataItem} title="Имя" value={userData.name} />
              <UserDataItem
                className={styles.dataItem}
                title="Отчество"
                value={userData.patronymic}
              />
              <UserDataItem className={styles.dataItem} title="Email" value={userData.email} />
              <UserDataItem
                className={styles.dataItem}
                title="Номер телефона"
                value={userData.phone}
              />
              <UserDataItem
                className={styles.dataItem}
                title="Дата рождения"
                value={userData.date_of_birth}
              />
            </>
          ) : (
            ""
          )}
        </ul>

        <Link href={PAGES.EDIT_PERSONAL_DATA} className={styles.toggleEdit}>
          Изменить данные
        </Link>
      </Substrate>
    </div>
  );
};

export default PersonalData;
