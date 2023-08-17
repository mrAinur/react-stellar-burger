import style from "./order-num.module.css";
import orderDetailImg from "../../images/done.svg";
import { useAppSelector } from "../..";
import { SpinnerRoundOutlined } from "spinners-react";

export default function OrderNum() {
  const orderNumber = useAppSelector(state => state.order.orderNumber);

  if (orderNumber === null) {
    return (
      <div className={style.loader}>
        <SpinnerRoundOutlined color="4a00c2" size={90} />
      </div>
    );
  }

  return (
    <>
      <p className={`${style.orderNum} text text_type_digits-large mt-30`}>
        {orderNumber}
      </p>
      <p className="text text_type_main-small mt-8">Идентификатор заказа</p>
      <img
        src={orderDetailImg}
        alt="Картинка знака Ok"
        className={`${style.orderImg} mt-15`}
      />
      <p className="text text_type_main-small mt-15">
        Ваш заказ начали готовить
      </p>
      <p className={`${style.paragraph} text text_type_main-small mt-2 mb-20`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}
