import React, { ReactNode } from "react";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals")!;

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: Props) {
  React.useEffect(() => {
    function closePopup(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", closePopup);
    return () => {
      document.removeEventListener("keydown", closePopup);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={style.popup} onClick={e => e.stopPropagation()}>
        <div className={style.close}>
          <CloseIcon
            type="primary"
            onClick={() => {
              onClose();
            }}
          />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot,
  );
}
