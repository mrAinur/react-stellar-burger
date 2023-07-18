import { useSelector } from 'react-redux';
import style from './order-numbers-info.module.css';
import { v4 as uuidv4 } from 'uuid';

export default function OrderNumbersInfo() {

    const data = useSelector(state => state.feed.feeds)

    const getReadyOrders = (items, status) => {
        let i = 10
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
                    <ul className={style.readyOrdersList}>{getReadyOrders(data.orders, "ready")}</ul>
                </div>
                <div className={style.ordersBox}>
                    <h3 className="text text_type_main-medium">В работе:</h3>
                    <ul className={style.readyOrdersList}>{getReadyOrders(data.orders, "inWork")}</ul>
                </div>
            </div>
            <h3 className="text text_type_main-medium mt-15">Выполнено за все время:</h3>
            <p className={`${style.total} text text_type_digits-large`}>{data.total}</p>
            <h3 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h3>
            <p className={`${style.total} text text_type_digits-large`}>{data.totalToday}</p>
        </div>
    )
}