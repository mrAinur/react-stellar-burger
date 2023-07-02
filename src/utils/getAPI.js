import { accessToken } from "./constants";

const baseURL = "https://norma.nomoreparties.space/api/"

/*Совет очень полезный, спасибо! У меня сейчас просто крайне мало времени, но я это сделаю в следующем месяце */

// function request(url, options) {
//     // принимает два аргумента: урл и объект опций, как и `fetch`
//     return fetch(url, options).then(checkResponse)
//   }

function checkResponse(res) {
    if (res.ok) {
        return res = res.json()
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

export function getInfo() {
    return fetch(`${baseURL}ingredients`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => checkResponse(res))
}

export function getOrder(item) {
    return fetch(`${baseURL}orders`, {
        method: "POST",
        body: JSON.stringify({
            "ingredients": item
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => checkResponse(res))
}

export function getNewUser(email, password, name) {
    return fetch(`${baseURL}auth/register`, {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password,
            "name": name
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => checkResponse(res))
}

export function getLoginUser(email, password) {
    return fetch(`${baseURL}auth/login`, {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => checkResponse(res))
}

export function getLogoutUser() {
    return fetch(`${baseURL}auth/logout`, {
        method: "POST",
        body: JSON.stringify({
            "token": `${localStorage.refreshToken}`
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => checkResponse(res))
}

export function forgotPassword(email) {
    return fetch(`${baseURL}password-reset`, {
        method: "POST",
        body: JSON.stringify({
            email
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => checkResponse(res))
}

export function resetPassword(password, token) {
    return fetch(`${baseURL}password-reset/reset`, {
        method: "POST",
        body: JSON.stringify({
            password,
            token
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => checkResponse(res))
}

export function getUserInfoApi() {
    return fetch(`${baseURL}auth/user`, {
        method: "GET",
        headers: {
            authorization: localStorage.getItem(accessToken),
            "Content-Type": "application/json"            
        }
    })
    .then(res => checkResponse(res))
}