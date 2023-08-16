import { useAppDispatch, useAppSelector } from "../..";
import style from "./feed.module.css";
import { useEffect } from "react";
import {
  wsFeedConnect,
  wsFeedDisconnect,
} from "./services/actions/feedActions";
import { wssFeedsURL } from "../../utils/constants";
import OrderInfoRectangle from "../../components/order-info-rectangle/order-info-rectangle";
import OrderNumbersInfo from "../../components/order-numbers-info/order-numbers-info";
import { Link, useLocation } from "react-router-dom";

type Order = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export default function Feed() {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const feeds = useAppSelector(state => state.feed.feeds);

  const getOrderInfo = (items: Order[]) => {
    return items.map((item: Order) => {
      return (
        <Link
          to={`/feed/${item.number}`}
          state={{ background: location }}
          className={style.link}
          key={item._id}
        >
          <OrderInfoRectangle data={item} element={"public"} />
        </Link>
      );
    });
  };

  useEffect(() => {
    dispatch(wsFeedConnect(wssFeedsURL));
    return () => {
      dispatch(wsFeedDisconnect());
    };
  }, []);

  if (!feeds) {
    return <div>Загрузка</div>;
  }

  return (
    <section className={style.main}>
      <h2 className={`${style.title} text text_type_main-medium mt-10`}>
        Лента заказов
      </h2>
      <ul className={style.orders}>{getOrderInfo(feeds.orders)}</ul>
      <OrderNumbersInfo />
    </section>
  );
}
