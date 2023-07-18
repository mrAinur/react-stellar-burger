import { useSelector } from 'react-redux';
import style from './order-details.module.css';
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { getOldOrder } from '../../utils/getAPI';

export default function OrderDetails({ status }) {

    const [data, setData] = useState(null);

    const location = useLocation();

    const ingredients = useSelector(state => state.ingredients.ingredients)

    const dataPrivate = useSelector(state => state.ordersHistory.orders)

    const dataPublic = useSelector(state => state.feed.feeds.orders)

    const background = location.state && location.state.background;

    const getStatus = () => {
        switch (data.status) {
            case "created":
                return <p className={`${style.default} text text_type_main-default mt-2`}>Создан</p>;
            case "pending":
                return <p className={`${style.default} text text_type_main-default mt-2`}>Готовится</p>;
            case "done":
                return <p className={`${style.ready} text text_type_main-default mt-2`}>Выполнен</p>;
            case "cancel":
                return <p className={`${style.cancel} text text_type_main-default mt-2`}>Отменён</p>;
            default: console.log(`Ошибка данных статуса заказа ${data.status}`)
        }
    }

    const getIngredients = items => {
        const arr = [];
        return items.map(item => {
            let num = 0;
            items.map(ingredient => {
                if (ingredient === item) {
                    num++
                }
                return ingredient
            })
            if (!arr.includes(item)) {
                arr.push(item)
                return <li className={style.ingredientBox} key={uuidv4()}>
                    <img src={ingredients.find(src => src._id === item).image_mobile} alt={item.name} className={style.img} />
                    <p className={`${style.name} text text_type_main-default`}>{ingredients.find(src => src._id === item).name}</p>
                    <div className={style.price}>
                        <p className={`${style.num} text text_type_digits-default`}>{num} x {ingredients.find(src => src._id === item).price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
            } else {
                return null
            }
        })
    }

    const getPtice = items => {
        return items.reduce((total, product) => total += ingredients.find(src => src._id === product).price, 0)
    }

    useEffect(() => {

        if (status === "private") {
            setData(dataPrivate.find(item => String(item.number) === location.pathname.replace("/profile/orders/", "")))
        } else if (status === "public") {
            setData(dataPublic.find(item => String(item.number) === location.pathname.replace("/feed/", "")))
        }

        if (data === null && background === null) {
            const getOrder = async () => {
                const info = await getOldOrder((status === "private") ? (location.pathname.replace("/profile/orders/", "")) : (location.pathname.replace("/feed/", "")))
                setData(info.orders[0])
            }
            getOrder();
        }
    }, [dataPrivate, dataPublic])

    return (
        (data !== undefined && data !== null) ?
            (<div className={background !== null ? style.main : style.mainTop}>
                <p className={`${background !== null ? style.number : style.numberTop} text text_type_digits-default`}>#{data.number}</p>
                <h3 className="text text_type_main-medium mt-5">{data.name}</h3>
                {status === "private" ? getStatus() : null}
                <p className={`${style.composition} text_type_main-medium mt-14`}>Состав:</p>
                <ul className={style.ingredients}>{getIngredients(data.ingredients)}</ul>
                <div className={style.date}>
                    <p className="text text_type_main-default text_color_inactive ">
                        <FormattedDate date={new Date(data.updatedAt)} /> i-GMT+3
                    </p>
                    <div className={style.fullPrice}>
                        <p className="text text_type_digits-default mr-2">{getPtice(data.ingredients)}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>) :
            (<div>Загрузка ингредиента</div>)
    )
}

OrderDetails.propTypes = {
    status: PropTypes.string.isRequired
};