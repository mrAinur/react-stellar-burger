import React from 'react';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

export default function Modal(props) {

    const { children, onClose } = props;

    React.useEffect(() => {
        function closePopup(e) {
            if (e.key === "Escape") {
                onClose()
            }
        }
        document.addEventListener("keydown", closePopup);
        return () => {
            document.removeEventListener("keydown", closePopup);
        }
    }, [])

    return ReactDOM.createPortal(
        (
            <div className={style.popupOpen} onClick={() => onClose()}>
                {children}
                <ModalOverlay />
            </div>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};