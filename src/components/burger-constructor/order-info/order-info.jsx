import style from './order-info.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderInfo } from '../services/burger-ingredients';


export default function OrderInfo({ openModal }) {

    const dispatch = useDispatch();

    const { price, bun, main} = useSelector(state => ({
        price: state.order.fullPrice,
        bun: state.order.bun,
        main: state.order.main
    }));
    const ingredientsId = main.concat(bun).map(item => item._id)
    const getOrder = () => {
        dispatch(getOrderInfo(ingredientsId))
        openModal()
    }

    return (
        <div className={`${style.orderInfo} mt-10 mr-4`}>
            <div className={`${style.paragraph} mr-10`}>
                <p className="text text_type_digits-medium">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={getOrder}>
                Оформить заказ
            </Button>
        </div>
    )
}

OrderInfo.propTypes = {
    openModal: PropTypes.func.isRequired
};