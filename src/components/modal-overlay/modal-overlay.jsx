import style from './modal-overlay.module.css';
import PropTypes from "prop-types";

export default function ModalOverlay({children, closeModal}) {
    return (
        <div className={style.overlay} onClick={closeModal}>
            {children}
        </div>
    )
}
ModalOverlay.propTypes = {
    children: PropTypes.object.isRequired
};