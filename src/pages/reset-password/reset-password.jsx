import { useDispatch, useSelector } from 'react-redux';
import style from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { resetPasswordWithEmail } from './services/reset-password';
import { resetUserPassword } from '../../utils/workWithApi';

export default function ResetPassword() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { password, token } = useSelector(state => state.resetPassword.reset)

    const onChange = e => dispatch(resetPasswordWithEmail({ name: e.target.name, value: e.target.value }))

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(resetUserPassword(password, token))
        navigate("/")
    }

    return (
        localStorage.getItem("emailSent") === "true" ?
        <section className={style.main}>
            <form className={style.loginForm} onSubmit={handleSubmit}>
                <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                <PasswordInput
                    onChange={onChange}
                    value={password}
                    name={'password'}
                    placeholder='Введите новый пароль'
                    extraClass="mt-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    value={token}
                    name={'token'}
                    error={false}
                    size={'default'}
                    extraClass="mt-6"
                />
                <div className={`${style.button} mt-6`}>
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
                <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль?
                    <Link to="/login" className={`${style.paragraphLink} text text_type_main-default`}>Войти</Link>
                </p>
            </form>
        </section> : <Navigate to="/"/>
    )
}
