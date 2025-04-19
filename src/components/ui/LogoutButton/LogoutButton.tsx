"use client";

import React, { useEffect } from "react";

import styles from "./LogoutButton.module.scss";
import SvgSelector from "../SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import { useLogout } from "@/hooks/auth/useLogout";
import toast from "react-hot-toast";
import { useNavigation } from "@/hooks/navigation/useNavigation";

interface IProps {
  className?: string;
}

const LogoutButton = ({ className }: IProps) => {
  const { isError, isPending, isSuccess, mutate } = useLogout();
  const { navigateToAuth } = useNavigation();

  const handleLogout = () => {
    mutate();
  };

  useEffect(() => {
    if (isPending) {
      toast.loading("Загрузка");
    }

    if (isError) {
      toast.dismiss();
      toast.error("Ошибка");
    } else if (isSuccess) {
      toast.dismiss();
      toast.success("Вы вышли из системы");

      navigateToAuth();
    }
  }, [isPending]);

  return (
    <button onClick={handleLogout} type="button" className={`${styles.button} ${className}`}>
      <SvgSelector id={ESvgName.LOGOUT} />
      Выйти
    </button>
  );
};

export default LogoutButton;
