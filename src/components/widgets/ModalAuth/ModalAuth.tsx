"use client";

import Modal from "@/components/ui/Modal/Modal";
import styles from "./ModalAuth.module.scss";
import { useEffect, useState } from "react";
import Registration from "@/components/features/Registration/Registration";
import Login from "@/components/features/Login/Login";

interface IProps {
  className?: string;
  handleCloseAuth: () => void;
  handleSuccessAuth: () => void;
}

export function ModalAuth({
  className,
  handleCloseAuth,
  handleSuccessAuth,
}: IProps) {
  const [authType, setAuthType] = useState<"login" | "registration">(
    "registration"
  );
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
    useState<boolean>(true);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isRegistrationModalOpen === false && isCodeModalOpen === false) {
      handleCloseAuth();
    }
  }, [isRegistrationModalOpen, isCodeModalOpen]);

  function handleSuccessRegistration() {
    handleSuccessAuth();
  }

  function handleSuccessLogin() {
    handleSuccessAuth();
  }

  return (
    <div className={`${className} ${styles.root}`}>
      <Modal
        isOpen={isRegistrationModalOpen}
        setIsOpen={setIsRegistrationModalOpen}
      >
        {authType === "registration" ? (
          <Registration
            handleReturnButton={() => setAuthType("login")}
            variant="modal"
            handleSuccessRegistration={handleSuccessRegistration}
          />
        ) : (
          <Login
            variant="modal"
            handleReturnButton={() => setAuthType("registration")}
            handleSuccessLogin={handleSuccessLogin}
          />
        )}
      </Modal>
    </div>
  );
}
