import React from 'react';
import style from './get-burger.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructore';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getInfo } from '../../utils/getAPI';
import { IngredientsInfo, ConstructorInfo } from '../context/context';


export default function GetBurger(props) {

  const constructorInfo = {
    bun: [],
    main: [],
    allProducts: [],
    fullPrice: 0,
    orderNumber: null
}

  const [ingredients, setIngredients] = React.useState([]);

  const getIngredients = async () => {
    await getInfo()
      .then(res => {
        setIngredients(res.data)
      })
      .catch(rej => console.log(`Ошбика ${rej.status}`))
  }

  React.useEffect(() => {
    getIngredients();
  }, [])


  return (ingredients.length &&
    <IngredientsInfo.Provider value={ingredients}>
      <ConstructorInfo.Provider value={constructorInfo}>
        <section className={style.GetBurgerContent}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </section >
      </ConstructorInfo.Provider>
    </IngredientsInfo.Provider>
  )
}