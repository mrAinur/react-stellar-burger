import style from "./ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../../../..";
import { Ingredient as data } from "../../../../utils/types";

type Props = {
  card: data;
};

export default function Ingredient({ card }: Props) {
  const numBun = useAppSelector(state => state.order.bun).reduce(
    (total, item) => {
      if (item._id === card._id) {
        total = 2;
      }
      return total;
    },
    0,
  );
  const numMain = useAppSelector(state => state.order.main).reduce(
    (total, item) => {
      if (item._id === card._id) {
        total++;
      }
      return total;
    },
    0,
  );

  const [, cardRef] = useDrag({
    type: "ingredient",
    item: { card },
  });

  return (
    <li className={style.card} ref={cardRef}>
      {card.type === "bun" ? (
        <Counter count={numBun} size="default" extraClass="m-1" />
      ) : (
        <Counter count={numMain} size="default" extraClass="m-1" />
      )}
      <img src={card.image} alt={card.name} className={style.img} />
      <div className={`${style.cost} mt-1`}>
        <p className={`${style.price} text text_type_main-default mr-2`}>
          {card.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${style.name}text text_type_main-default mt-1`}>
        {card.name}
      </p>
    </li>
  );
}
