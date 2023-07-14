import { useDispatch } from 'react-redux';
import style from './modal-overlay.module.css';
import PropTypes from "prop-types";
import { clearOrderNumber } from '../../pages/constructore/burger-constructor/services/burger-ingredients';

export default function ModalOverlay({children, onClose}) {

    const dispatch = useDispatch();

    const onClick = () => {
        onClose();
        dispatch(clearOrderNumber());
    };

    return (
        <div className={style.overlay} onClick={onClick}>
            {children}
        </div>
    )
}
ModalOverlay.propTypes = {
    children: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};