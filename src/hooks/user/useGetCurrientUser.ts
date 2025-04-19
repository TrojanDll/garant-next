import { userService } from "@/services/user.service";
import { ICurrientUserResponse } from "@/types/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export type TLoginErrors = "" | "incorrect" | "unsubmited_email";

export function useGetCurrientUser() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["userData"],
    queryFn: () => userService.getCurrientUserData(),
  });

  return {
    isSuccess,
    isError,
    userData: data?.data.data,
    isLoading,
  };
}
