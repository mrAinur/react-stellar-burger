import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';


export default function BurgerConstructor() {

  return (
    <a className={`${style.button} mr-2 mb-4 mt-4 `} href="#">
      <BurgerIcon type="primary" />
      <p className={`${style.paragraph} text text_type_main-default ml-2`}>Конструктор</p>
    </a>
  )

}
