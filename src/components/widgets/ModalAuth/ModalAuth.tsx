"use client";

import Modal from "@/components/ui/Modal/Modal";
import styles from "./ModalAuth.module.scss";
import { useEffect, useState } from "react";
import Registration from "@/components/features/Registration/Registration";
import Login from "@/components/features/Login/Login";

interface IProps {
  className?: string;
  handleCloseAuth: () => void;
}

export function ModalAuth({ className, handleCloseAuth }: IProps) {
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
            handleSuccessRegistration={handleCloseAuth}
          />
        ) : (
          <Login
            variant="modal"
            handleReturnButton={() => setAuthType("registration")}
            handleSuccessLogin={handleCloseAuth}
          />
        )}
      </Modal>
    </div>
  );
}
