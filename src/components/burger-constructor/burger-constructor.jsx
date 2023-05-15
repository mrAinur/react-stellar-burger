import React from 'react';
import PropTypes from "prop-types";
import NavButtons from './nav-buttons/nav-buttons';
import style from './burger-constructor.module.css';
import IngredientsBoxScroll from './ingredients-box-scroll/ingredients-box-scroll';
import { ingredientPropType } from '../../utils/prop-types';
import {ingredientsTypes} from './../../utils/constants';


export default function BurgerConstructor(props) {

  const [scroll, setScroll] = React.useState(ingredientsTypes.bun);

  return (
    <article>
      <h2 className="text text_type_main-large mt-10 ml-3">Соберите бургер</h2>
      <nav className="mt-5">
        <NavButtons scrollPosition={setScroll} />
      </nav>
      <IngredientsBoxScroll data={props.data} scrollPosition={scroll} />
    </article>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
};