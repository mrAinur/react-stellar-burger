import { useAppDispatch, useAppSelector } from "../../types";
import style from "./registration.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { changeRegistrationData } from "./services/registration";
import { Link } from "react-router-dom";
import { registrationUser } from "../../utils/workWithApi";
import { ChangeEvent, FormEvent, FormEventHandler } from "react";

export default function Registration() {
  const dispatch = useAppDispatch();

  const { name, email, password } = useAppSelector(state => state.registration);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeRegistrationData({ name: e.target.name, value: e.target.value }),
    );
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    dispatch(registrationUser(email, password, name));
  };

  return (
    <section className={style.main}>
      <form className={style.loginForm} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mt-6"
        />
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
