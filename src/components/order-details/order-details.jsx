import style from './order-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import orderDetailImg from '../../images/done.svg';

export default function OrderDetails(props) {

    const {onClose, orderInfo} = props;

    return (
        <div className={style.popup}  onClick={e => e.stopPropagation()}>
            <div className={style.close}>
                <CloseIcon type="primary" onClick={() => onClose()}/>
            </div>
            <p className={`${style.orderNum} text text_type_digits-large mt-30`}>034536</p>
            <p className='text text_type_main-small mt-8'>Идентификатор заказа</p>
            <img src={orderDetailImg} alt='Картинка знака Ok' className={`${style.orderImg} mt-15`} />
            <p className='text text_type_main-small mt-15'>Ваш заказ начали готовить</p>
            <p className={`${style.paragraph} text text_type_main-small mt-2`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
    orderInfo: PropTypes.any.isRequired
  };