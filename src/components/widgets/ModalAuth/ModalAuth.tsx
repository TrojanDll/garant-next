"use client";

import Modal from "@/components/ui/Modal/Modal";
import styles from "./ModalAuth.module.scss";
import { useEffect, useState } from "react";

interface IProps {
  className?: string;
  handleCloseAuth: () => void;
}

export function ModalAuth({ className, handleCloseAuth }: IProps) {
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
        Hello
      </Modal>
    </div>
  );
}
