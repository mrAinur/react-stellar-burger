import style from './OrderInfo.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';


export default function OrderInfo() {
    return (
        <div className={`${style.orderInfo} mt-10 mr-4`}>
            <div className={`${style.paragraph} mr-10`}>
                <p className="text text_type_digits-medium">610</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
    )
}
