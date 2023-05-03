import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './OrderFeed.module.css'

export default function OrderFeed() {

    return (
        <a className={`${style.button} mb-4 mt-4`} href="#">
            <ListIcon type="secondary" />
            <p className={`${style.paragraph} text text_type_main-default ml-2`}>Лента заказов</p>
        </a>
    )

}
