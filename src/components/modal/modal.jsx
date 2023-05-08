import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

export default function Modal(props) {

    const { children, onClose } = props;

    const closePopup = () => {
        document.removeEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closePopup()
            }
        })
        onClose()
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closePopup()
        }
    })

    return ReactDOM.createPortal(
        (
            <div className={style.popupOpen} onClick={closePopup}>
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