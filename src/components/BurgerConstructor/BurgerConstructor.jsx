import React from 'react';
import NavButtons from './NavButtons/NavButtons';
import style from './BurgerConstructor.module.css';
import IngredientsBoxScroll from './IngredientsBoxScroll/IngredientsBoxScroll';

export default function BurgerConstructor(props) {

  const [scroll, setScroll] = React.useState('one');

  React.useEffect(() => {
    
  }, [scroll])

  return (
    <article>
      <h2 className="text text_type_main-large mt-10 ml-3">Соберите бургер</h2>
      <nav className="mt-5">
        <NavButtons scrollPosition={setScroll}/>
      </nav>
      <IngredientsBoxScroll data={props.data} scrollPosition={scroll}/>
    </article>
  )
}
