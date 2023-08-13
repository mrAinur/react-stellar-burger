import { useAppSelector } from "../../types";
import { Order } from "../../utils/types";
import style from "./order-numbers-info.module.css";

export default function OrderNumbersInfo() {
  const data = useAppSelector(state => state.feed.feeds);

  const getReadyOrders = (items: Order[]) => {
    return items.map((item, index) => {
      if (item.status === "done" && index <= 9) {
        return (
          <li
            key={item._id}
            className={`${style.readyOrders} text text_type_digits-default`}
          >
            {item.number}
          </li>
        );
      }
      return null;
    });
  };

  const getInWorkOrders = (items: Order[]) => {
    return items.map((item, index) => {
      if (item.status === "pending" && index <= 9) {
        return (
          <li key={item._id} className={`text text_type_digits-default`}>
            {item.number}
          </li>
        );
      }
      return null;
    });
  };

  return (
    <div className={style.main}>
      <div className={style.orders}>
        <div className={style.ordersBox}>
          <h3 className="text text_type_main-medium">Готовы:</h3>
          <ul className={style.readyOrdersList}>
            {getReadyOrders(data.orders)}
          </ul>
        </div>
        <div className={style.ordersBox}>
          <h3 className="text text_type_main-medium">В работе:</h3>
          <ul className={style.readyOrdersList}>
            {getInWorkOrders(data.orders)}
          </ul>
        </div>
      </div>
      <h3 className="text text_type_main-medium mt-15">
        Выполнено за все время:
      </h3>
      <p className={`${style.total} text text_type_digits-large`}>
        {data.total}
      </p>
      <h3 className="text text_type_main-medium mt-15">
        Выполнено за сегодня:
      </h3>
      <p className={`${style.total} text text_type_digits-large`}>
        {data.totalToday}
      </p>
    </div>
  );
}
