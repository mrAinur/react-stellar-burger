import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import style from './burger-constructor.module.css';

export default function BurgerConstructor() {

  const location = useLocation()

  return (
    <Link to="/" className={`${style.button} mr-2 mb-4 mt-4 `}>
      <BurgerIcon type={location.pathname === "/" ? "primary" : "secondary"} />
      <p className={`${location.pathname === "/" ? style.paragraph : "text_color_inactive"} text text_type_main-default ml-2`}>Конструктор</p>
    </Link>
  )
}
