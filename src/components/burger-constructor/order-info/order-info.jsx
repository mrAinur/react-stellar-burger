import style from './order-info.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderInfo } from '../services/burger-ingredients';
import React, { useContext } from 'react';
import { ConstructorInfo } from '../../context/context';
import { getOrder } from '../../../utils/getAPI';


export default function OrderInfo({ onOpen, ingredientsId, price, dispatch }) {

    // const dispatch = useDispatch();

    // const { price, ingredientsId } = useSelector(state => ({ 
    //     price: state.order.fullPrice,
    //     ingredientsId: state.order.allProducts.map(item => item._id)
    // }));

    // const getOrder = () => {
    //     dispatch(getOrderInfo(ingredientsId))
    //     onOpen()
    // }

    const makeOrder = async () => {
        await getOrder(ingredientsId)
        .then(res => dispatch({
            type: "orderNum",
            payload: res
        }))
        onOpen()
    }

    return (
        <div className={`${style.orderInfo} mt-10 mr-4`}>
            <div className={`${style.paragraph} mr-10`}>
                <p className="text text_type_digits-medium">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={makeOrder}>
                Оформить заказ
            </Button>
        </div>
    )
}

OrderInfo.propTypes = {
    onOpen: PropTypes.func.isRequired,
    ingredientsId: PropTypes.array,
    price: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};