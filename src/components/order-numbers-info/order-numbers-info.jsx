import style from './order-numbers-info.module.css';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from "prop-types";

export default function OrderNumbersInfo({ data }) {

    const getReadyOrders = (items, status) => {
        let i = 30
        if (status === "ready") {
            return items.map(item => {
                i--
                if (item.status === "done" && i >= 0) {
                    return <li key={uuidv4()} className={`${style.readyOrders} text text_type_digits-default`}>{item.number}</li>
                }
                return null
            })
        } else if (status === "inWork") {
            return items.map(item => {
                i--
                if (item.status === "pending" && i >= 0) {
                    return <li key={uuidv4()} className={`text text_type_digits-default`}>{item.number}</li>
                }
                return null
            })
        }
    }

    return (
        <div className={style.main}>
            <div className={style.orders}>
                <div className={style.ordersBox}>
                    <h3 className="text text_type_main-medium">Готовы:</h3>
                    <ul className={style.readyOrdersList}>{getReadyOrders(data, "ready")}</ul>
                </div>
                <div className={style.ordersBox}>
                    <h3 className="text text_type_main-medium">В работе:</h3>
                    <ul className={style.readyOrdersList}>{getReadyOrders(data, "inWork")}</ul>
                </div>
            </div>
        </div>
    )
}

OrderNumbersInfo.propTypes = {
    data: PropTypes.array.isRequired
};