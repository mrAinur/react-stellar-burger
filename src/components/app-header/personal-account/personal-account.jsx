import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './personal-account.module.css'

export default function PersonalAccount() {

  return (
    <a className={style.button} href="#">
      <ProfileIcon type="secondary" />
      <p className={`${style.paragraph} text text_type_main-default ml-2`}>Личный кабинет</p>
    </a>
  )

}
