import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import OrderFeed from "./OrderFeed/OrderFeed";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BoxForButtons.module.css'


export default function BoxForButtons(props) {
    return (
        <div className={style.LogoAndButtons}>
            <div className={style.buttons}>
                <BurgerConstructor />
                <OrderFeed />
            </div>
            <Logo />
        </div>
    )
}