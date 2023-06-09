import style from './order-details.module.css';
import orderDetailImg from '../../images/done.svg';
import { useSelector } from 'react-redux';

export default function OrderDetails() {

    const orderNumber = useSelector(state => state.order.orderNumber)

    return (
        <>
            <p className={`${style.orderNum} text text_type_digits-large mt-30`}>{orderNumber}</p>
            <p className='text text_type_main-small mt-8'>Идентификатор заказа</p>
            <img src={orderDetailImg} alt='Картинка знака Ok' className={`${style.orderImg} mt-15`} />
            <p className='text text_type_main-small mt-15'>Ваш заказ начали готовить</p>
            <p className={`${style.paragraph} text text_type_main-small mt-2 mb-20`}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}