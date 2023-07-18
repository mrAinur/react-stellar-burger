import { useDispatch, useSelector } from 'react-redux';
import style from './profile.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { setUserInfo, cancelSetUserInfo } from './services/profile';
import { Link, useLocation } from 'react-router-dom';
import { editUser, logoutUser } from '../../utils/workWithApi';
import { Outlet } from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch();

  const location = useLocation();

  const { name, email, password } = useSelector(state => state.user.setUserData);

  const onChange = e => {
    dispatch(setUserInfo({ name: e.target.name, value: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editUser(name, email, password))
  }

  const cancel = () => dispatch(cancelSetUserInfo())

  return (
    <section className={style.main}>
      <article className={style.menu}>
        <div className={style.links}>
          <Link to={"/profile"} className={`${style.link} text text_type_main-medium text_color_inactive ${location.pathname === "/profile" ? style.linkActive : ""}`}>Профиль</Link>
          <Link to={"/profile/orders"} className={`${style.link} text text_type_main-medium text_color_inactive ${location.pathname === "/profile/orders" ? style.linkActive : ""}`}>История заказов</Link>
          <Link to={"/profile"} className={`${style.link} text text_type_main-medium text_color_inactive `} onClick={() => dispatch(logoutUser())}>Выход</Link>
        </div>
        {location.pathname === "/profile" && <p className={style.paragraph}>В этом разделе вы можете изменить свои персональные данные</p>}
        {location.pathname === "/profile/orders" && <p className={style.paragraph}>В этом разделе вы можете просмотреть свою историю заказов</p>}
      </article>
      {location.pathname === "/profile" && <article className={style.loginForm}>
        <form className={style.form} onSubmit={handleSubmit}>
          <EmailInput
            onChange={onChange}
            value={name}
            name={'name'}
            placeholder="Имя"
            isIcon={true}
          />
          <EmailInput
            onChange={onChange}
            value={email}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
            extraClass="mt-6"
          />
          <PasswordInput
            onChange={onChange}
            value={password}
            name={'password'}
            extraClass="mt-6"
          />
          <div className={`${style.buttons} mt-6`}>
            <p className={`${style.paragraphLink} text text_type_main-default`} onClick={cancel}>
              Отмена
            </p>
            <div className={style.button}>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          </div>
        </form>
      </article>}
      {location.pathname === "/profile/orders" && <Outlet />}
    </section>
  )
}
