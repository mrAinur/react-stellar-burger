import style from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { ingredientPropType } from '../../utils/prop-types';

export default function IngredientDetails({ info }) {

    return (
        <>
            <div className={`${style.head} mt-10`}>
                <p className={`${style.title} text text_type_main-large`}>Детали ингредиента</p>
            </div>
            <img className={style.img} src={info.image_large} alt='Картинка ингредиента бургера' />
            <p className={`${style.info} text text_type_main-small mt-4`}>{info.name}</p>
            <ul className={`${style.details} mt-8 mb-15`}>
                <li className={style.callories}>
                    <p className='text text_type_main-default'>Каллории,ккал</p>
                    <p className='text text_type_digits-default mt-2'>{info.calories}</p>
                </li>
                <li className={style.callories}>
                    <p className='text text_type_main-default'>Белки, г</p>
                    <p className='text text_type_digits-default mt-2'>{info.proteins}</p>
                </li>
                <li className={style.callories}>
                    <p className='text text_type_main-default'>Жиры, г</p>
                    <p className='text text_type_digits-default mt-2'>{info.fat}</p>
                </li>
                <li className={style.callories}>
                    <p className='text text_type_main-default'>Углеводы, г</p>
                    <p className='text text_type_digits-default mt-2'>{info.carbohydrates}</p>
                </li>
            </ul>
        </>
    )
}

IngredientDetails.propTypes = {
    info: ingredientPropType.isRequired
};