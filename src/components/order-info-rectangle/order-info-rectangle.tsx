import { useAppSelector } from "../..";
import style from "./order-info-rectangle.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Order } from "../../utils/types";

type Props = {
  data: Order;
  element: string;
};

export default function OrderInfoRectangle({ data, element }: Props) {
  const ingredients = useAppSelector(state => state.ingredients.ingredients);
  const getImg = (items: string[]) => {
    let i = 7;
    return items.map((item, index) => {
      i--;
      if (i > 1) {
        return (
          <li
            key={index}
            className={style.listItem}
            style={{ position: "relative", zIndex: `${i}` }}
          >
            <img
              src={ingredients.find(src => src._id === item)!.image_mobile}
              alt={ingredients.find(src => src._id === item)!.name}
              className={style.img}
            />
          </li>
        );
      } else if (i === 1) {
        return (
          <li
            className={style.lastImg}
            key={index}
            style={{ position: "relative", zIndex: `${i}` }}
          >
            <img
              src={ingredients.find(src => src._id === item)!.image_mobile}
              alt={ingredients.find(src => src._id === item)!.name}
              className={style.lastImgItem}
            />
            <p className={`${style.paragraph} text text_type_main-default`}>
              +{items.length - 5}
            </p>
          </li>
        );
      } else {
        return null;
      }
    });
  };

  const getStatus = () => {
    switch (data.status) {
      case "created":
        return (
          <p className={`${style.default} text text_type_main-default`}>
            Создан
          </p>
        );
      case "pending":
        return (
          <p className={`${style.default} text text_type_main-default`}>
            Готовится
          </p>
        );
      case "done":
        return (
          <p className={`${style.ready} text text_type_main-default`}>
            Выполнен
          </p>
        );
      case "cancel":
        return (
          <p className={`${style.cancel} text text_type_main-default`}>
            Отменён
          </p>
        );
      default:
        console.log(`Ошибка данных статуса заказа ${data.status}`);
    }
  };

  const getPrice = (items: string[]) => {
    return items.reduce(
      (total, item) =>
        (total += ingredients.find(price => price._id === item)!.price),
      0,
    );
  };

  return (
    <li className={style.main}>
      <div className={style.date}>
        <p className="text text_type_digits-default">#{data.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(data.updatedAt)} /> i-GMT+3
        </p>
      </div>
      <h2 className={`text text_type_main-medium ${style.title}`}>
        {data.name}
      </h2>
      {element === "private" ? getStatus() : null}
      <div className={style.ingredients}>
        <ul className={style.list}>{getImg(data.ingredients)}</ul>
        <div className={style.price}>
          <p className="text text_type_digits-default mr-2">
            {getPrice(data.ingredients)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}
