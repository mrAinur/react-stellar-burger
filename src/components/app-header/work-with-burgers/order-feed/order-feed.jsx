import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import style from './order-feed.module.css';

export default function OrderFeed() {

    const location = useLocation()

    return (
        <Link to="/feed" className={`${style.button} mt-4 mb-4`}>
            <ListIcon type={location.pathname === "/feed" ? "primary" : "secondary"} />
            <p className={`${location.pathname === "/feed" ? style.paragraph : "text_color_inactive"} text text_type_main-default ml-2`}>Лента заказов</p>
        </Link>
    )

}
