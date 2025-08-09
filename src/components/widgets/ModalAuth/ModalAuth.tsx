"use client";

import Modal from "@/components/ui/Modal/Modal";
import styles from "./ModalAuth.module.scss";

interface IProps {
  className?: string;
}

export function ModalAuth({ className }: IProps) {

  return <div className={`${className} ${styles.root}`}>
    {/* <Modal isOpen setIsOpen={}>

    </Modal> */}
  </div>;
}
