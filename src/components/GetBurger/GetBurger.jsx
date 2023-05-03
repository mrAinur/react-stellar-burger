import style from './GetBurger.module.css'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { data } from '../../utils/data';


export default function GetBurger() {
  return (
        <section className={style.GetBurgerContent}>
          <BurgerConstructor data={data} />
          <BurgerIngredients data={data}/>
        </section>
  )
}
