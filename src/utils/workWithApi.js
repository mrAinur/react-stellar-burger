import { clearRegistration } from "../pages/registration/services/registration";
import { getUserInfo, reset } from "../pages/profile/services/profile";
import { getNewUser, getLoginUser, getLogoutUser, forgotPassword, resetPassword, getUserInfoApi, editUserInfoApi } from "./getAPI";
import { clearLoginInfo } from "../pages/login/services/login";
import { clearPasswordWithEmail } from "../pages/reset-password/services/reset-password";
import { checkedUser } from "../pages/login/services/login";
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
            .catch(rej => console.error(`Ошибка ${rej.status}`))
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
            .catch(rej => console.error(`Ошибка ${rej.status}`))
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        return getLogoutUser().then(res => {
            localStorage.removeItem(accessToken)
            localStorage.removeItem(refreshToken)
            dispatch(reset())
        })
            .catch(rej => console.error(`Ошибка ${rej.status}`))
    };
};

export const getResetEmail = (email) => {
    return forgotPassword(email).then(res => {
        localStorage.setItem("emailSent", "true")
    })
        .catch(rej => console.error(`Ошибка ${rej.status}`))
};

export const resetUserPassword = (password, token) => {
    return (dispatch) => {
        return resetPassword(password, token).then(res => {
            dispatch(clearPasswordWithEmail())
            localStorage.removeItem("emailSent")
        })
            .catch(rej => console.error(`Ошибка ${rej.status}`))
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
            .catch(rej => console.error(`Ошибка ${rej.status}`))
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