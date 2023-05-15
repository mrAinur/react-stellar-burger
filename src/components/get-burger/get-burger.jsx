import style from './get-burger.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";


export default function GetBurger(props) {
  return (
    <section className={style.GetBurgerContent}>
      <BurgerConstructor data={props.data}/>
      <BurgerIngredients data={props.data}/>
    </section>
  )
}

GetBurger.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
};