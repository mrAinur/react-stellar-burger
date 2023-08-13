import { useAppDispatch, useAppSelector } from "../../types";
import style from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { changeLoginInfo } from "./services/login";
import { loginUser } from "../../utils/workWithApi";
import { ChangeEvent, FormEvent, FormEventHandler } from "react";

export default function Login() {
  const dispatch = useAppDispatch();

  const { email, password } = useAppSelector(state => state.login.login);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeLoginInfo({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <section className={style.main}>
      <form className={style.loginForm} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput
          onChange={onChange}
          value={email}
          name={"email"}
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={onChange}
          value={password}
          name={"password"}
          extraClass="mt-6"
        />
        <div className={`${style.button} mt-6`}>
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вы — новый пользователь?
          <Link
            to="/registration"
            className={`${style.paragraphLink} text text_type_main-default`}
          >
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль?
          <Link
            to="/forgot-password"
            className={`${style.paragraphLink} text text_type_main-default`}
          >
            Восстановить пароль
          </Link>
        </p>
      </form>
    </section>
  );
}
