"use client";

import Button from "@/components/ui/Button/Button";
import { useGetPoliciesByCurrientUser } from "@/hooks/policy/useGetPoliciesByCurrientUser";
import React from "react";

const MyPolicies = () => {
  const { data, isError, isLoading, isSuccess } = useGetPoliciesByCurrientUser();

  return (
    <div>
      {data ? data.OSAGO.map((item) => <Button key={item.id}>{item.brand}</Button>) : ""}
      {/* {data ? data.OSAGO[0].fio : ""} */}
    </div>
  );
};

export default MyPolicies;
