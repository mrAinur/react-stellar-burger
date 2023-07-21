import React from "react";
import style from "./ingredients-box-scroll.module.css";
import Ingredient from "../ingredient/ingredient";
import { ingredientsTypes } from "../../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { activeNuv } from "../services/burger-ingredients";
import { Link, useLocation } from "react-router-dom";

export default function IngredientsBoxScroll(props) {
  const dispatch = useDispatch();
  const { data, load, scrollPosition } = useSelector(state => ({
    data: state.ingredients.ingredients,
    load: state.ingredients.load,
    scrollPosition: state.ingredients.activeTab,
  }));

  const location = useLocation();

  // Реализация скролла в меню ингредиентов
  const menuScroll = React.useRef();
  const [sectionBunRef, setSectionBunInView] = useInView({
    threshold: 0.8,
    root: document.querySelector("#viewport"),
  });
  const [sectionSauceRef, setSectionSauceInView] = useInView({
    threshold: 0.8,
    root: document.querySelector("#viewport"),
  });
  const [sectionMainRef, setSectionMainInView] = useInView({
    threshold: 0.45,
    root: document.querySelector("#viewport"),
  });

  React.useEffect(() => {
    setSectionBunInView
      ? dispatch(activeNuv("bun"))
      : setSectionSauceInView
      ? dispatch(activeNuv("sauce"))
      : dispatch(activeNuv("main"));
  }, [setSectionBunInView, setSectionSauceInView, setSectionMainInView]);

  const bunScroll = React.useRef();
  const mainScroll = React.useRef();
  const sauceCroll = React.useRef();

  React.useEffect(() => {
    const settingsScroll = (item = bunScroll.current) => {
      item &&
        item.scrollIntoView({
          behavior: "smooth",
        });
    };
    switch (scrollPosition) {
      case ingredientsTypes.bun:
        settingsScroll(bunScroll.current);
        break;
      case ingredientsTypes.sauce:
        settingsScroll(sauceCroll.current);
        break;
      case ingredientsTypes.main:
        settingsScroll(mainScroll.current);
        break;
      default:
        console.log(`Неверное значение => ${scrollPosition}`);
    }
  }, [scrollPosition]);

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
  const getCard = items => {
    return items.map(item => {
      return (
        <Link
          to={`/ingredients/${item._id}`}
          state={{ background: location }}
          className={style.link}
          key={item._id}
        >
          <Ingredient card={item} />
        </Link>
      );
    });
  };

  return (
    <div id="viewport" className={style.scrollBox} ref={menuScroll}>
      <p
        ref={bunScroll}
        className="text text_type_main-default pt-10 mb-6 scrollSection"
      >
        Булки
      </p>
      <ul className={`${style.cards}`} ref={sectionBunRef}>
        {!load && getCard(bun)}
      </ul>
      <p
        ref={sauceCroll}
        className="text text_type_main-default pt-10 mb-6 scrollSection"
      >
        Соусы
      </p>
      <ul className={`${style.cards}`} ref={sectionSauceRef}>
        {!load && getCard(sauce)}
      </ul>
      <p
        ref={mainScroll}
        className="text text_type_main-default pt-10 mb-6 scrollSection"
      >
        Начинки
      </p>
      <ul className={`${style.cards}`} ref={sectionMainRef}>
        {!load && getCard(main)}
      </ul>
    </div>
  );
}
