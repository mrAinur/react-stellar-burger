import React from 'react';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("react-modals");

export default function Modal({ children, closeModal }) {

    React.useEffect(() => {
        function closePopup(e) {
            if (e.key === "Escape") {
                closeModal()
            }
        }
        document.addEventListener("keydown", closePopup);
        return () => {
            document.removeEventListener("keydown", closePopup);
        }
    }, [])

    return ReactDOM.createPortal(
        (
            <div className={style.popupOpen} onClick={() => closeModal()}>
                <div className={style.popup} onClick={e => e.stopPropagation()}>
                    <div className={style.close}>
                        <CloseIcon type="primary" onClick={() => closeModal()} />
                    </div>
                    {children}
                </div>
                <ModalOverlay />
            </div>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.object.isRequired
};