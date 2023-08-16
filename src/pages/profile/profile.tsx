import { useAppDispatch, useAppSelector } from "../..";
import style from "./profile.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { cancelSetUserInfo } from "./services/profile";
import { Link, useLocation } from "react-router-dom";
import { editUser, logoutUser } from "../../utils/workWithApi";
import { Outlet } from "react-router-dom";
import { ChangeEvent, FormEventHandler } from "react";
import { useForm } from "../../hooks/useForm";

export default function Profile() {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const { name, email, password } = useAppSelector(
    state => state.user.setUserData,
  );

  const { values, handleChange, setValues } = useForm({
    name,
    email,
    password,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch(editUser(values.name, values.email, values.password));
  };

  const cancel = () => {
    dispatch(cancelSetUserInfo());
    setValues({ name, email, password });
  };

  return (
    <section className={style.main}>
      <article className={style.menu}>
        <div className={style.links}>
          <Link
            to={"/profile"}
            className={`${
              style.link
            } text text_type_main-medium text_color_inactive ${
              location.pathname === "/profile" ? style.linkActive : ""
            }`}
          >
            Профиль
          </Link>
          <Link
            to={"/profile/orders"}
            className={`${
              style.link
            } text text_type_main-medium text_color_inactive ${
              location.pathname === "/profile/orders" ? style.linkActive : ""
            }`}
          >
            История заказов
          </Link>
          <Link
            to={"/profile"}
            className={`${style.link} text text_type_main-medium text_color_inactive `}
            onClick={() => dispatch(logoutUser())}
          >
            Выход
          </Link>
        </div>
        {location.pathname === "/profile" && (
          <p className={style.paragraph}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        )}
        {location.pathname === "/profile/orders" && (
          <p className={style.paragraph}>
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        )}
      </article>
      {location.pathname === "/profile" && (
        <article className={style.loginForm}>
          <form className={style.form} onSubmit={handleSubmit}>
            <EmailInput
              onChange={onChange}
              value={values.name}
              name={"name"}
              placeholder="Имя"
              isIcon={true}
            />
            <EmailInput
              onChange={onChange}
              value={values.email}
              name={"email"}
              placeholder="Логин"
              isIcon={true}
              extraClass="mt-6"
            />
            <PasswordInput
              onChange={onChange}
              value={values.password}
              name={"password"}
              extraClass="mt-6"
            />
            <div className={`${style.buttons} mt-6`}>
              <p
                className={`${style.paragraphLink} text text_type_main-default`}
                onClick={cancel}
              >
                Отмена
              </p>
              <div className={style.button}>
                <Button htmlType="submit" type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            </div>
          </form>
        </article>
      )}
      {location.pathname === "/profile/orders" && <Outlet />}
    </section>
  );
}
