"use client";

import Button from "@/components/ui/Button/Button";
import { PAGES } from "@/config/pages-url.config";
import { useGetPoliciesByCurrientUser } from "@/hooks/policy/useGetPoliciesByCurrientUser";
import React from "react";

const MyPolicies = () => {
  const { data, isError, isLoading, isSuccess } = useGetPoliciesByCurrientUser();

  return (
    <div>
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
