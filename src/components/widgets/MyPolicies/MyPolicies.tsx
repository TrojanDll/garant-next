"use client";
import React from "react";

import styles from "./MyPolicies.module.scss";

import MyPoliciesFilters from "@/components/features/MyPoliciesFilters/MyPoliciesFilters";
import Button from "@/components/ui/Button/Button";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { PAGES } from "@/config/pages-url.config";
import { useGetPoliciesByCurrientUser } from "@/hooks/policy/useGetPoliciesByCurrientUser";

const MyPolicies = () => {
  const { data, isError, isLoading, isSuccess } = useGetPoliciesByCurrientUser();

  return (
    <div>
      <CustomTitle isCentered className={styles.title}>
        Мои полисы
      </CustomTitle>
      <MyPoliciesFilters />
      {data
        ? data.OSAGO.map((item) => (
            <Button key={item.id} isLink href={`${PAGES.POLICY_INFO}/osago-${item.id}`}>
              {item.brand}
            </Button>
          ))
        : ""}
    </div>
  );
};

export default MyPolicies;
