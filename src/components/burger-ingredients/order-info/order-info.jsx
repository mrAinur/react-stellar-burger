import style from './order-info.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";


export default function OrderInfo(props) {

    const { onOpen } = props;

    return (
        <div className={`${style.orderInfo} mt-10 mr-4`}>
            <div className={`${style.paragraph} mr-10`}>
                <p className="text text_type_digits-medium">610</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={() => onOpen()}>
                Оформить заказ
            </Button>
        </div>
    )
}

OrderInfo.propTypes = {
    onOpen: PropTypes.func.isRequired
};