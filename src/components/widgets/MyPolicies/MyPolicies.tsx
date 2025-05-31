"use client";

import React, { useEffect, useState } from "react";

import styles from "./MyPolicies.module.scss";

import MyPoliciesFilters from "@/components/features/MyPoliciesFilters/MyPoliciesFilters";
import Button from "@/components/ui/Button/Button";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import { PAGES } from "@/config/pages-url.config";
import { useGetPoliciesByCurrientUser } from "@/hooks/policy/useGetPoliciesByCurrientUser";
import MyPoliciesList from "@/components/entities/MyPoliciesList/MyPoliciesList";
import Text from "@/components/ui/Text/Text";
import Loader from "@/components/ui/Loader/Loader";
import usePolicyFilters from "@/stores/Policy/policyFilters.store";
import { EPolicyTypes, IAllPolicies } from "@/types/policy.types";
import { filterPolicies } from "@/helpers/Policy/filterPolicies";

const MyPolicies = () => {
  const { data, isError, isLoading, isSuccess } =
    useGetPoliciesByCurrientUser();

  const policyActivityStatusFilter = usePolicyFilters((state) => state.activityStatus);
  const policyTypeFilter = usePolicyFilters((state) => state.policyType);

  const [filteredPolicies, setFilteredPolicies] = useState<IAllPolicies | undefined>();

  useEffect(() => {
    async function filter() {
      if (data) {
        const filtered: IAllPolicies = await filterPolicies(
          data,
          policyTypeFilter,
          policyActivityStatusFilter
        );

        setFilteredPolicies(filtered);
      }
    }

    filter();
  }, [isLoading, policyActivityStatusFilter, policyTypeFilter]);

  return (
    <div>
      <CustomTitle isCentered className={styles.title}>
        Мои полисы
      </CustomTitle>

      <MyPoliciesFilters />

      <div className={styles.listWrapper}>
        {filteredPolicies ? (
          filteredPolicies.NS.length !== 0 || filteredPolicies.OSAGO.length !== 0 ? (
            <MyPoliciesList filteredPolicies={filteredPolicies} />
          ) : (
            <Text className={styles.noDataText}>Здесь пусто</Text>
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
