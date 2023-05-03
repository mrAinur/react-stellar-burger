import React from 'react';
import style from './IngredientsBoxScroll.module.css';
import Ingredient from '../Ingredient/Ingredient';

export default function IngredientsBoxScroll(props) {

    // Реализация скролла в меню ингредиентов
    const bunScroll = React.useRef();
    const mainScroll = React.useRef();
    const sauceCroll = React.useRef();

    const settingsScroll = (item) => {
        item.scrollIntoView({
            behavior: "smooth"
        })
    }

    React.useEffect(() => {
        switch (props.scrollPosition) {
            case "one": settingsScroll(bunScroll.current);
                break;
            case "two": settingsScroll(sauceCroll.current);
                break;
            case "three": settingsScroll(mainScroll.current);
                break;
            default: console.log(`Неверное значение => ${props.scrollPosition}`);
        }
    }, [props.scrollPosition])

    // Фильтруем объект и получаем отдельно ингредиенты в соответствии с их типом
    const bun = props.data.filter(item => {
        if (item.type === "bun") {
            return true;
        }
    });
    const main = props.data.filter(item => {
        if (item.type === "main") {
            return true;
        }
    })
    const sauce = props.data.filter(item => {
        if (item.type === "sauce") {
            return true;
        }
    })

    // Отрисовываем каждый ингредиент
    const getCard = (items) => {
        return items.map(item => {
            return <Ingredient card={item} />
        })
    }

    return (
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
    )
}
