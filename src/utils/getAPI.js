const baseURL = "https://norma.nomoreparties.space/api/"

/*Совет очень полезный, спасибо! У меня сейчас просто крайне мало времени, но я это сделаю в следующем месяце */

// function request(url, options) {
//     // принимает два аргумента: урл и объект опций, как и `fetch`
//     return fetch(url, options).then(checkResponse)
//   }

function checkResponse (res){
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