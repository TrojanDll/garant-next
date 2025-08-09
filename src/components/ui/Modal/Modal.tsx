import styles from "./Modal.module.scss";
import type { PropsWithChildren } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import SvgSelector from "../SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import Substrate from "../Substrate/Substrate";

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Modal({
  isOpen,
  setIsOpen,
  children,
}: PropsWithChildren<IProps>) {
  return (
    <Dialog.Root open={isOpen} defaultOpen>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => setIsOpen(false)}
          className={styles.overlay}
        />
        <Dialog.Content className={styles.content}>
          <Dialog.Title />
          <Substrate className={styles.substrate}>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              <SvgSelector id={ESvgName.CLOSE} />
            </button>

            {children}
          </Substrate>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
