import { useAppDispatch, useAppSelector } from "../..";
import style from "./orders.module.css";
import { useEffect } from "react";
import {
  wsOrdersConnect,
  wsOrdersDisconnect,
} from "./services/actions/ordersActions";
import { wssOrdersURL, accessToken } from "../../utils/constants";
import OrderInfoRectangle from "../../components/order-info-rectangle/order-info-rectangle";
import { Link, useLocation } from "react-router-dom";
import { Order } from "../../utils/types";

export default function Orders() {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const data = useAppSelector(state => state.ordersHistory.orders)
    ?.slice()
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  const token: string | undefined = localStorage
    .getItem(accessToken)
    ?.replace("Bearer ", "");

  const getOrderInfo = (items: Order[]) => {
    return items.map((item: Order) => {
      return (
        <Link
          to={`/profile/orders/${item.number}`}
          state={{ background: location }}
          className={style.link}
          key={item._id}
        >
          <OrderInfoRectangle data={item} element={"private"} />
        </Link>
      );
    });
  };

  useEffect(() => {
    dispatch(wsOrdersConnect(`${wssOrdersURL}?token=${token}`));
    return () => {
      dispatch(wsOrdersDisconnect());
    };
  }, []);

  return data ? (
    <ul className={style.main}>{getOrderInfo(data)}</ul>
  ) : (
    <div>Загрузка</div>
  );
}
