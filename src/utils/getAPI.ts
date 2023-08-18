import { accessToken, baseURL, refreshToken } from "./constants";
import { Options, RefreshData } from "./types";

function checkResponse<T>(res: Response): Promise<T> {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

function request<T>(url: string, options: Options) {
  return fetch(url, options).then(res => checkResponse<T>(res));
}

export function getInfo<T>() {
  return request<T>(`${baseURL}ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getOrder<T>(item: string[]) {
  return request<T>(`${baseURL}orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: item,
    }),
    headers: {
      authorization: localStorage.getItem(accessToken)!,
      "Content-Type": "application/json",
    },
  });
}

export function getNewUser<T>(email: string, password: string, name: string) {
  return request<T>(`${baseURL}auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getLoginUser<T>(email: string, password: string) {
  return request<T>(`${baseURL}auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getLogoutUser<T>() {
  return request<T>(`${baseURL}auth/logout`, {
    method: "POST",
    body: JSON.stringify({
      token: `${localStorage.refreshToken}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function forgotPassword<T>(email: string) {
  return request<T>(`${baseURL}password-reset`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function resetPassword<T>(password: string, token: string) {
  return request<T>(`${baseURL}password-reset/reset`, {
    method: "POST",
    body: JSON.stringify({
      password,
      token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
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
  return request<T>(`${baseURL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem(refreshToken),
    }),
  });
}

export async function fetchWithRefresh<T>(url: string, options: Options) {
  try {
    const res = await request<T>(url, options);
    return res;
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = (await refreshUserInfoApi<T>()) as RefreshData;
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem(accessToken, refreshData.accessToken);
      localStorage.setItem(refreshToken, refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await request<T>(url, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
}

export function getOldOrder<T>(item: string) {
  return request<T>(`${baseURL}orders/${item}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
}
