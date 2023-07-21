import { accessToken, baseURL, refreshToken } from "./constants";

function checkResponse(res) {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export function getInfo() {
  return fetch(`${baseURL}ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => checkResponse(res));
}

export function getOrder(item) {
  return fetch(`${baseURL}orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: item,
    }),
    headers: {
      authorization: localStorage.getItem(accessToken),
      "Content-Type": "application/json",
    },
  }).then(res => checkResponse(res));
}

export function getNewUser(email, password, name) {
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
  }).then(res => checkResponse(res));
}

export function getLoginUser(email, password) {
  return fetch(`${baseURL}auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => checkResponse(res));
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

export function forgotPassword(email) {
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

export function resetPassword(password, token) {
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

export function getUserInfoApi() {
  return fetchWithRefresh(`${baseURL}auth/user`, {
    method: "GET",
    headers: {
      authorization: localStorage.getItem(accessToken),
      "Content-Type": "application/json",
    },
  });
}

export function editUserInfoApi(name, email, password) {
  return fetchWithRefresh(`${baseURL}auth/user`, {
    method: "PATCH",
    headers: {
      authorization: localStorage.getItem(accessToken),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export function refreshUserInfoApi() {
  return fetch(`${baseURL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem(refreshToken),
    }),
  }).then(res => checkResponse(res));
}

export async function fetchWithRefresh(url, options) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshUserInfoApi();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem(accessToken, refreshData.accessToken);
      localStorage.setItem(refreshToken, refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

export function getOldOrder(item) {
  return fetch(`${baseURL}orders/${item}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then(res => checkResponse(res));
}
