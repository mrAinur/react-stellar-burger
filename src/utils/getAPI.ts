import { accessToken, baseURL, refreshToken } from "./constants";
import { Options, RefreshData } from "./types";

function checkResponse<T>(res: Response): Promise<T> {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export function getInfo<T>() {
  return fetch(`${baseURL}ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => checkResponse<T>(res));
}

export function getOrder<T>(item: string[]) {
  return fetch(`${baseURL}orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: item,
    }),
    headers: {
      authorization: localStorage.getItem(accessToken)!,
      "Content-Type": "application/json",
    },
  }).then(res => checkResponse<T>(res));
}

export function getNewUser<T>(email: string, password: string, name: string) {
  return fetch(`${baseURL}auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => checkResponse<T>(res));
}

export function getLoginUser<T>(email: string, password: string) {
  return fetch(`${baseURL}auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => checkResponse<T>(res));
}

export function getLogoutUser() {
  return fetch(`${baseURL}auth/logout`, {
    method: "POST",
    body: JSON.stringify({
      token: `${localStorage.refreshToken}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => checkResponse(res));
}

export function forgotPassword(email: string) {
  return fetch(`${baseURL}password-reset`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => checkResponse(res));
}

export function resetPassword(password: string, token: string) {
  return fetch(`${baseURL}password-reset/reset`, {
    method: "POST",
    body: JSON.stringify({
      password,
      token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => checkResponse(res));
}

export function getUserInfoApi<T>() {
  return fetchWithRefresh<T>(`${baseURL}auth/user`, {
    method: "GET",
    headers: {
      authorization: localStorage.getItem(accessToken)!,
      "Content-Type": "application/json",
    },
  });
}

export function editUserInfoApi<T>(
  name: string,
  email: string,
  password: string,
) {
  return fetchWithRefresh<T>(`${baseURL}auth/user`, {
    method: "PATCH",
    headers: {
      authorization: localStorage.getItem(accessToken)!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export function refreshUserInfoApi<T>() {
  return fetch(`${baseURL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem(refreshToken),
    }),
  }).then(res => checkResponse<T>(res));
}

export async function fetchWithRefresh<T>(url: string, options: Options) {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = (await refreshUserInfoApi<T>()) as RefreshData;
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem(accessToken, refreshData.accessToken);
      localStorage.setItem(refreshToken, refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
}

export function getOldOrder<T>(item: string) {
  return fetch(`${baseURL}orders/${item}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then(res => checkResponse<T>(res));
}
