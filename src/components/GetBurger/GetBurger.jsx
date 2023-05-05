import style from './GetBurger.module.css'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { data } from '../../utils/data';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";


export default function GetBurger(props) {
  return (
    <section className={style.GetBurgerContent}>
      <BurgerConstructor data={data} />
      <BurgerIngredients data={data} />
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
};