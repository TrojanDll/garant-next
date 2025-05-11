"use client";
import React from "react";

import styles from "./MyPolicies.module.scss";

import MyPoliciesFilters from "@/components/features/MyPoliciesFilters/MyPoliciesFilters";
import Button from "@/components/ui/Button/Button";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { PAGES } from "@/config/pages-url.config";
import { useGetPoliciesByCurrientUser } from "@/hooks/policy/useGetPoliciesByCurrientUser";
import MyPoliciesList from "@/components/entities/MyPoliciesList/MyPoliciesList";

const MyPolicies = () => {
  const { data, isError, isLoading, isSuccess } = useGetPoliciesByCurrientUser();

  return (
    <div>
      <CustomTitle isCentered className={styles.title}>
        Мои полисы
      </CustomTitle>

      <MyPoliciesFilters />
      {data && <MyPoliciesList filteredPolicies={data} />}
    </div>
  );
};

export default MyPolicies;
