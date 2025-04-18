"use client";

import React, { useEffect, useState } from "react";

import ButtonGroup, { TButtonGroupRequest } from "@/components/ui/ButtonGroup/ButtonGroup";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import useAuthType from "@/stores/Auth/authType.store";

import styles from "./Auth.module.scss";
import Registration from "@/components/features/Registration/Registration";
import Login from "@/components/features/Login/Login";

const buttonGroupValues = ["Вход", "Регистрация"];

const Auth = () => {
  const authType = useAuthType((state) => state.authType);
  const setAuthType = useAuthType((state) => state.setAuthType);

  const [defaultActiveTabIndex, setDefaultActiveTabIndex] = useState(0);

  const handleButtonGroupChange = (value: TButtonGroupRequest) => {
    if (value.index === 0) {
      setAuthType("login");
    } else {
      setAuthType("registration");
    }
  };

  useEffect(() => {
    setDefaultActiveTabIndex(authType === "login" ? 0 : 1);
  }, []);

  return (
    <ContentContainer>
      <div className={styles.buttonGroupWrapper}>
        <ButtonGroup
          active={authType === "login" ? 0 : 1}
          defaultActiveIndex={defaultActiveTabIndex}
          items={buttonGroupValues}
          isEquals={false}
          onButtonClick={handleButtonGroupChange}
        />
      </div>

      {authType === "login" ? <Login /> : <Registration />}
    </ContentContainer>
  );
};

export default Auth;
