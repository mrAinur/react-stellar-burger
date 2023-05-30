import React from 'react';
import style from './ingredients-box-scroll.module.css';
import Ingredient from '../ingredient/ingredient';
import PropTypes from "prop-types";
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import { ingredientsTypes } from './../../../utils/constants';
import { useSelector } from 'react-redux';

export default function IngredientsBoxScroll(props) {
    const { data, load } = useSelector(state => ({
        data: state.ingredients.ingredients,
        load: state.ingredients.load
    }))

    /*Реализация работы модальных окон */
    const [ingredientPopupInfo, setIngredientPopupInfo] = React.useState(null);

    const onClose = () => {
        setIngredientPopupInfo(null)
    }

    const onOpen = (item) => {
        setIngredientPopupInfo(item)
    }

    // Реализация скролла в меню ингредиентов
    const menuScroll = React.useRef();
    const bunScroll = React.useRef();
    const mainScroll = React.useRef();
    const sauceCroll = React.useRef();
    const observer = new IntersectionObserver((entries) => {
        console.log(entries)
    }, {
        threshold: 0.8
    })
    const getMenuScroll = (item) => {
        item.querySelectorAll(".scrollSection").forEach(e => observer.observe(e)); 
    }
    

    React.useEffect(() => {
        const settingsScroll = (item = bunScroll.current) => {
            item && item.scrollIntoView({
                behavior: "smooth"
            })
        };
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
        return data.filter(item => item.type === ingredientsTypes.bun);
    }, [data]);

    const main = React.useMemo(() => {
        return data.filter(item => item.type === ingredientsTypes.main);
    }, [data]);

    const sauce = React.useMemo(() => {
        return data.filter(item => item.type === ingredientsTypes.sauce);
    }, [data]);

    // Отрисовываем каждый ингредиент
    const getCard = (items) => {
        return items.map(item => {
            return <Ingredient card={item} key={item._id} onClose={onClose} onOpen={onOpen} />
        })
    };

    return (
        <>
            {!load && (<div className={style.scrollBox} ref={menuScroll}>
                <p ref={bunScroll} className="text text_type_main-default pt-10 mb-6 scrollSection">Булки</p>
                <ul className={`${style.cards}`}>
                    {getCard(bun)}
                </ul>
                <p ref={sauceCroll} className="text text_type_main-default pt-10 mb-6 scrollSection">Соусы</p>
                <ul className={`${style.cards}`}>
                    {getCard(sauce)}
                </ul>
                <p ref={mainScroll} className="text text_type_main-default pt-10 mb-6 scrollSection">Начинки</p>
                <ul className={`${style.cards}`}>
                    {getCard(main)}
                </ul>
            </div>
            )}
            {ingredientPopupInfo &&
                (<Modal onClose={onClose}>
                    <IngredientDetails info={ingredientPopupInfo} onClose={onClose} />
                </Modal>)
            }
        </>
    )
}

IngredientsBoxScroll.propTypes = {
    scrollPosition: PropTypes.string.isRequired
};