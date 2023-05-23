import style from './get-burger.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


export default function GetBurger(props) {

  return (
    <section className={style.GetBurgerContent}>
      <DndProvider backend={HTML5Backend}>
        <BurgerConstructor />
        <BurgerIngredients />
      </DndProvider>
    </section >
  )
}