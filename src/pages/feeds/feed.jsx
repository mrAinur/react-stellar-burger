import { useDispatch, useSelector } from "react-redux";
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

export default function Feed() {
  const dispatch = useDispatch();

  const location = useLocation();

  const feeds = useSelector(state => state.feed.feeds);

  const getOrderInfo = items => {
    return items.map(item => {
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
  }, [dispatch]);

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
