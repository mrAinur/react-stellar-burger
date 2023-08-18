import BurgerConstructor from "./burger-constructor/burger-constructor";
import OrderFeed from "./order-feed/order-feed";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./box-for-buttons.module.css";
import { Link } from "react-router-dom";

export default function BoxForButtons() {
  return (
    <div className={style.LogoAndButtons}>
      <div className={style.buttons}>
        <BurgerConstructor />
        <OrderFeed />
      </div>
      <Link to="/">
        <Logo />
      </Link>
    </div>
  );
}
