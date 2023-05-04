import React from 'react';
import PropTypes from "prop-types";
import NavButtons from './NavButtons/NavButtons';
import style from './BurgerConstructor.module.css';
import IngredientsBoxScroll from './IngredientsBoxScroll/IngredientsBoxScroll';
import { ingredientPropType } from '../../utils/prop-types';

export default function BurgerConstructor(props) {

  const [scroll, setScroll] = React.useState('bun');

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
  data: PropTypes.arrayOf(ingredientPropType).isRequired
};