import { useDispatch, useSelector } from "react-redux";
import style from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { setEmail } from "../reset-password/services/reset-password";
import { getResetEmail } from "../../utils/workWithApi";

export default function ForgotPassword() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const email = useSelector(state => state.resetPassword.email);

  const handleSubmit = async e => {
    e.preventDefault();
    await getResetEmail(email);
    navigate("/reset-password");
  };

  return (
    <section className={style.main}>
      <form className={style.loginForm} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          onChange={e => dispatch(setEmail(e.target.value))}
          value={email}
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
