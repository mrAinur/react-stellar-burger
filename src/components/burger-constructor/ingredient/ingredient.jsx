import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { ingredientPropType } from '../../../utils/prop-types'

export default function Ingredient(props) {

    const { onOpen, card } = props

    return (
        <li className={style.card} onClick={() => onOpen(card)}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={card.image} alt="Изображение ингредиента" className={style.img} />
            <div className={`${style.cost} mt-1`}>
                <p className="text text_type_main-default mr-2">{card.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.name}text text_type_main-default mt-1`}>{card.name}</p>
        </li>
    )
}

Ingredient.propTypes = {
    card: ingredientPropType.isRequired,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};