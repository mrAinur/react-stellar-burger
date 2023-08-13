import { clearRegistration } from "../pages/registration/services/registration";
import { getUserInfo, reset } from "../pages/profile/services/profile";
import {
  getNewUser,
  getLoginUser,
  getLogoutUser,
  forgotPassword,
  resetPassword,
  getUserInfoApi,
  editUserInfoApi,
} from "./getAPI";
import { clearLoginInfo } from "../pages/login/services/login";
import { clearPasswordWithEmail } from "../pages/reset-password/services/reset-password";
import { checkedUser } from "../pages/login/services/login";
import { accessToken, refreshToken } from "./constants";
import { Dispatch } from "redux";
import { EditAndCheckUser, LoginAndRegistrationUser } from "./types";

export const registrationUser = (
  email: string,
  password: string,
  name: string,
) => {
  return (dispatch: Dispatch) => {
    return getNewUser<LoginAndRegistrationUser>(email, password, name)
      .then(res => {
        localStorage.setItem(accessToken, res.accessToken);
        localStorage.setItem(refreshToken, res.refreshToken);
        dispatch(getUserInfo(res.user));
        dispatch(clearRegistration());
      })
      .catch(rej => console.error(`Ошибка ${rej.status}`));
  };
};

export const loginUser = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    return getLoginUser<LoginAndRegistrationUser>(email, password)
      .then(res => {
        localStorage.setItem(accessToken, res.accessToken);
        localStorage.setItem(refreshToken, res.refreshToken);
        dispatch(getUserInfo(res.user));
        dispatch(clearLoginInfo());
      })
      .catch(rej => console.error(`Ошибка ${rej.status}`));
  };
};

export const logoutUser = () => {
  return (dispatch: Dispatch) => {
    return getLogoutUser()
      .then(res => {
        localStorage.removeItem(accessToken);
        localStorage.removeItem(refreshToken);
        dispatch(reset());
      })
      .catch(rej => console.error(`Ошибка ${rej.status}`));
  };
};

export const getResetEmail = (email: string) => {
  return forgotPassword(email)
    .then(res => {
      localStorage.setItem("emailSent", "true");
    })
    .catch(rej => console.error(`Ошибка ${rej.status}`));
};

export const resetUserPassword = (password: string, token: string) => {
  return (dispatch: Dispatch) => {
    return resetPassword(password, token)
      .then(res => {
        dispatch(clearPasswordWithEmail());
        localStorage.removeItem("emailSent");
      })
      .catch(rej => console.error(`Ошибка ${rej.status}`));
  };
};

export const getUser = () => {
  return (dispatch: Dispatch) => {
    return getUserInfoApi<EditAndCheckUser>().then(res => {
      dispatch(getUserInfo(res.user));
      dispatch(clearLoginInfo());
    });
  };
};

export const editUser = (name: string, email: string, password: string) => {
  return (dispatch: Dispatch) => {
    return editUserInfoApi<EditAndCheckUser>(name, email, password)
      .then(res => {
        dispatch(getUserInfo(res.user));
        dispatch(clearLoginInfo());
      })
      .catch(rej => console.error(`Ошибка ${rej.status}`));
  };
};

export const checkUserAuth = () => {
  return (dispatch: any) => {
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
