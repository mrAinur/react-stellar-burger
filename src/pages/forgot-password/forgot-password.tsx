import style from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { getResetEmail } from "../../utils/workWithApi";
import { FormEventHandler } from "react";
import { useForm } from "../../hooks/useForm";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({ email: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    await getResetEmail(values.email);
    navigate("/reset-password");
  };

  return (
    <section className={style.main}>
      <form className={style.loginForm} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          onChange={e => handleChange(e)}
          value={values.email}
          name={"email"}
          isIcon={false}
          placeholder="Укажите email"
          extraClass="mt-6"
        />
        <div className={`${style.button} mt-6`}>
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вспомнили пароль?
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
