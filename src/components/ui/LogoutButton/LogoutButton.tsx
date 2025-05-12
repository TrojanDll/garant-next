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
    let isMounted = true;

    if (isPending) {
      toast.loading("Загрузка");
    } else {
      toast.dismiss();
    }

    if (isError && isMounted) {
      toast.dismiss();
      toast.error("Ошибка");
    } else if (isSuccess && isMounted) {
      toast.dismiss();
      toast.success("Вы вышли из системы");

      navigateToAuth();
    }

    return () => {
      isMounted = false;
    };
  }, [isPending, isSuccess, isError]);

  return (
    <button
      onClick={handleLogout}
      type="button"
      className={`${styles.button} ${className}`}
    >
      <SvgSelector id={ESvgName.LOGOUT} className={styles.svg} />
      Выйти
    </button>
  );
};

export default LogoutButton;
