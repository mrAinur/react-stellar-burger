import { clearRegistration } from "../components/pages/registration/services/registration";
import { getUserInfo, reset } from "../components/pages/profile/services/profile";
import { getNewUser, getLoginUser, getLogoutUser, forgotPassword, resetPassword, getUserInfoApi, editUserInfoApi } from "./getAPI";
import { clearLoginInfo } from "../components/pages/login/services/login";
import { clearPasswordWithEmail } from "../components/pages/reset-password/services/reset-password";
import { checkedUser } from "../components/pages/login/services/login";
import { accessToken, refreshToken } from "./constants";


export const registrationUser = (email, password, name) => {
    return (dispatch) => {
        return getNewUser(email, password, name)
            .then(res => {
                localStorage.setItem(accessToken, res.accessToken)
                localStorage.setItem(refreshToken, res.refreshToken)
                dispatch(getUserInfo(res.user))
                dispatch(clearRegistration())
            })
            .catch("Ошибка регистрации пользователя")
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        return getLoginUser(email, password).then(res => {
            localStorage.setItem(accessToken, res.accessToken)
            localStorage.setItem(refreshToken, res.refreshToken)
            dispatch(getUserInfo(res.user))
            dispatch(clearLoginInfo())
        })
            .catch("Ошибка авторизации пользователя")
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        return getLogoutUser().then(res => {
            localStorage.removeItem(accessToken)
            localStorage.removeItem(refreshToken)
            dispatch(reset())
        })
            .catch("Ошибка выхода пользователя")
    };
};

export const getResetEmail = (email) => {
    return forgotPassword(email).then(res => {
        localStorage.setItem("emailSent", "true")
    })
        .catch("Ошибка отправки сообщения с кодом для восстановления пароля")
};

export const resetUserPassword = (password, token) => {
    return (dispatch) => {
        return resetPassword(password, token).then(res => {
            dispatch(clearPasswordWithEmail())
            localStorage.removeItem("emailSent")
        })
            .catch("Ошибка изменения пароля")
    };
};

export const getUser = () => {
    return (dispatch) => {
        return getUserInfoApi().then((res) => {
            dispatch(getUserInfo(res.user))
            dispatch(clearLoginInfo())
        });
    };
};

export const editUser = (name, email, password) => {
    return (dispatch) => {
        return editUserInfoApi(name, email, password).then(res => {
            dispatch(getUserInfo(res.user))
            dispatch(clearLoginInfo())
        })
            .catch("Ошибка изменения данных пользователя")
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem(accessToken)) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem(accessToken);
                    localStorage.removeItem(refreshToken);
                    dispatch(reset());
                })
                .finally(() => dispatch(checkedUser()));
        } else {
            dispatch(checkedUser());
        }
    };
};