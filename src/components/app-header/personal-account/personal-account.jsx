import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import style from './personal-account.module.css';

export default function PersonalAccount() {

  const location = useLocation();

  return (
    <Link to="/profile" className={style.button} >
      <ProfileIcon type={location.pathname === "/profile" || location.pathname === "/profile/orders" || location.pathname === "/profile/exit" ? "primary" : "secondary"} />
      <p className={`${location.pathname === "/profile" || location.pathname === "/profile/orders" || location.pathname === "/profile/exit" ? style.paragraph : "text_color_inactive"} text text_type_main-default ml-2`}>Личный кабинет</p>
    </Link>
  )
}
