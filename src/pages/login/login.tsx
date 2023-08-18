import { useAppDispatch } from "../..";
import style from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { loginUser } from "../../utils/workWithApi";
import { FormEventHandler } from "react";
import { useForm } from "../../hooks/useForm";

export default function Login() {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({ email: "", password: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch(loginUser(values.email, values.password));
  };

  return (
    <section className={style.main}>
      <form className={style.loginForm} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput
          onChange={e => handleChange(e)}
          value={values.email}
          name={"email"}
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={e => handleChange(e)}
          value={values.password}
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
