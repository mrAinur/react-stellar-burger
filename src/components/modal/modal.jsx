import React from "react";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { clearOrderNumber } from "../../pages/constructore/burger-constructor/services/burger-ingredients";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ children, onClose }) {
  const dispatch = useDispatch();

  const clearOrderNum = () => {
    if (children.type.name === "OrderDetails") {
      dispatch(clearOrderNumber());
    }
  };

  React.useEffect(() => {
    function closePopup(e) {
      if (e.key === "Escape") {
        onClose();
      }
      clearOrderNum();
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
              clearOrderNum();
            }}
          />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
};
