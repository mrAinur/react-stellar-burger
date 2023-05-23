import React from 'react';
import NavButtons from './nav-buttons/nav-buttons';
import style from './burger-constructor.module.css';
import IngredientsBoxScroll from './ingredients-box-scroll/ingredients-box-scroll';
import {ingredientsTypes} from './../../utils/constants';


export default function BurgerConstructor(props) {

  const [scroll, setScroll] = React.useState(ingredientsTypes.bun);

  return (
    <article>
      <h2 className="text text_type_main-large mt-10 ml-3">Соберите бургер</h2>
      <nav className="mt-5">
        <NavButtons scrollPosition={setScroll} />
      </nav>
      <IngredientsBoxScroll scrollPosition={scroll} />
    </article>
  )
}
