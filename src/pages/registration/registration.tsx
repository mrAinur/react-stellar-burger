import { useAppDispatch } from "../..";
import style from "./registration.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { registrationUser } from "../../utils/workWithApi";
import { FormEventHandler } from "react";
import { useForm } from "../../hooks/useForm";

export default function Registration() {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch(registrationUser(values.email, values.password, values.name));
  };

  return (
    <section className={style.main}>
      <form className={style.loginForm} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={e => handleChange(e)}
          value={values.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mt-6"
        />
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
            Зарегистрироваться
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Уже зарегистрированы?
          <Link
            to="/login"
            className={`${style.paragraphLink} text text_type_main-default`}
          >
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}
