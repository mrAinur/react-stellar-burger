import React from 'react';
import style from './ingredients-box-scroll.module.css';
import Ingredient from '../ingredient/ingredient';
import PropTypes from "prop-types";
import { ingredientPropType } from '../../../utils/prop-types';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import {ingredientsTypes} from './../../../utils/constants';

export default function IngredientsBoxScroll(props) {

    /*Реализация работы модальных окон */
    const [ingredientPopupInfo, setIngredientPopupInfo] = React.useState(null);

    const onClose = () => {
        setIngredientPopupInfo(null)
    }

    const onOpen = (item) => {
        setIngredientPopupInfo(item)
    }    

    // Реализация скролла в меню ингредиентов
    const bunScroll = React.useRef();
    const mainScroll = React.useRef();
    const sauceCroll = React.useRef();

    const settingsScroll = (item) => {
        item.scrollIntoView({
            behavior: "smooth"
        })
    };

    React.useEffect(() => {
        switch (props.scrollPosition) {
            case ingredientsTypes.bun: settingsScroll(bunScroll.current);
                break;
            case ingredientsTypes.sauce: settingsScroll(sauceCroll.current);
                break;
            case ingredientsTypes.main: settingsScroll(mainScroll.current);
                break;
            default: console.log(`Неверное значение => ${props.scrollPosition}`);
        }
    }, [props.scrollPosition]);

    // Фильтруем объект и получаем отдельно ингредиенты в соответствии с их типом
    const bun = React.useMemo(() => {
        return props.data.filter(item => item.type === ingredientsTypes.bun);
    }, [props.data]);

    const main = React.useMemo(() => {
        return props.data.filter(item => item.type === ingredientsTypes.main);
    }, [props.data]);

    const sauce = React.useMemo(() => {
        return props.data.filter(item => item.type === ingredientsTypes.sauce);
    }, [props.data]);

    // Отрисовываем каждый ингредиент
    const getCard = (items) => {
        return items.map(item => {
            return <Ingredient card={item} key={item._id} onClose={onClose} onOpen={onOpen} />
        })
    };

    return (
        <>
            <div className={style.scrollBox}>
                <p ref={bunScroll} className="text text_type_main-default pt-10 mb-6">Булки</p>
                <ul className={`${style.cards}`}>
                    {getCard(bun)}
                </ul>
                <p ref={sauceCroll} className="text text_type_main-default pt-10 mb-6">Соусы</p>
                <ul className={`${style.cards}`}>
                    {getCard(sauce)}
                </ul>
                <p ref={mainScroll} className="text text_type_main-default pt-10 mb-6">Начинки</p>
                <ul className={`${style.cards}`}>
                    {getCard(main)}
                </ul>
            </div>
            {ingredientPopupInfo &&
                (<Modal onClose={onClose}>
                    <IngredientDetails info={ingredientPopupInfo} onClose={onClose}/>
                </Modal>)
            }
        </>
    )
}

IngredientsBoxScroll.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    scrollPosition: PropTypes.string.isRequired
};