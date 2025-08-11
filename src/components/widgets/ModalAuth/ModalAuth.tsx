"use client";

import Modal from "@/components/ui/Modal/Modal";
import styles from "./ModalAuth.module.scss";
import { useEffect, useState } from "react";
import Registration from "@/components/features/Registration/Registration";
import Login from "@/components/features/Login/Login";
import { ILoginForm, IRegistrationForm } from "@/types/auth.types";

interface IProps {
  className?: string;
  handleCloseAuth: () => void;
  handleSuccessAuth: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function ModalAuth({
  className,
  handleCloseAuth,
  handleSuccessAuth,
  isOpen,
  setIsOpen,
}: IProps) {
  const [authType, setAuthType] = useState<"login" | "registration">(
    "registration"
  );
  const [registrationFields, setRegistrationFields] = useState<
    IRegistrationForm | undefined
  >();

  const [loginFields, setLoginFields] = useState<ILoginForm | undefined>();

  function handleSuccessRegistration() {
    handleSuccessAuth();
  }

  function handleSuccessLogin() {
    handleSuccessAuth();
  }

  function handleRegistrationFieldsChange(data: IRegistrationForm) {
    if (JSON.stringify(data) !== JSON.stringify(registrationFields)) {
      setRegistrationFields(data);
    }
  }

  function handleLoginFieldsChange(data: ILoginForm) {
    if (JSON.stringify(data) !== JSON.stringify(loginFields)) {
      setLoginFields(data);
    }
  }

  return (
    <div className={`${className} ${styles.root}`}>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {authType === "registration" ? (
          <Registration
            handleReturnButton={() => setAuthType("login")}
            variant="modal"
            handleSuccessRegistration={handleSuccessRegistration}
            handleInputChange={handleRegistrationFieldsChange}
            defaultData={registrationFields}
          />
        ) : (
          <Login
            variant="modal"
            handleReturnButton={() => setAuthType("registration")}
            handleSuccessLogin={handleSuccessLogin}
            handleInputChange={handleLoginFieldsChange}
            defaultData={loginFields}
          />
        )}
      </Modal>
    </div>
  );
}
