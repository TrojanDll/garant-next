"use client";
import React from "react";

import styles from "./MyPolicies.module.scss";

import MyPoliciesFilters from "@/components/features/MyPoliciesFilters/MyPoliciesFilters";
import Button from "@/components/ui/Button/Button";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { PAGES } from "@/config/pages-url.config";
import { useGetPoliciesByCurrientUser } from "@/hooks/policy/useGetPoliciesByCurrientUser";
import MyPoliciesList from "@/components/entities/MyPoliciesList/MyPoliciesList";
import Text from "@/components/ui/Text/Text";
import Loader from "@/components/ui/Loader/Loader";

const MyPolicies = () => {
  const { data, isError, isLoading, isSuccess } = useGetPoliciesByCurrientUser();

  return (
    <div>
      <CustomTitle isCentered className={styles.title}>
        Мои полисы
      </CustomTitle>

      <MyPoliciesFilters />
      
      <div className={styles.listWrapper}>
        {data ? (
          data.NS.length !== 0 || data.OSAGO.length !== 0 ? (
            <MyPoliciesList filteredPolicies={data} />
          ) : (
            <Text className={styles.noDataText}>У вас еще нет полисов</Text>
          )
        ) : (
          <Loader className={styles.loader} />
        )}
      </div>
      <Button isLink href={PAGES.OSAGO_APPLY} className={styles.buyPolicyButton}>
        Купить полис
      </Button>
    </div>
  );
};

export default MyPolicies;
