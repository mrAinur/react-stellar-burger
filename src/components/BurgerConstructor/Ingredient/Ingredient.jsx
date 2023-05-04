import style from './Ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { ingredientPropType } from '../../../utils/prop-types'

export default function Ingredient(props) {

    return (
        <li className={style.card}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={props.card.image} alt="Изображение ингредиента" className={style.img} />
            <div className={`${style.cost} mt-1`}>
                <p className="text text_type_main-default mr-2">{props.card.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.name}text text_type_main-default mt-1`}>{props.card.name}</p>
        </li>
    )
}

Ingredient.propTypes = {
    card: ingredientPropType.isRequired
};