const apiLinkMenu = "https://norma.nomoreparties.space/api/ingredients";
const getOrderInfo = "https://norma.nomoreparties.space/api/orders";

export function getInfo() {
    return fetch(apiLinkMenu, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (res.ok) {
                return res = res.json()
            } else {
                return Promise.reject(`Ошибка ${res.status}`);
            }
        })
        .catch((rej) => {
            console.log(`Ошибка ${rej.status}`);
        });
}

export function getOrder(item) {
    return fetch(getOrderInfo, {
        method: "POST",
        body: JSON.stringify({
            "ingredients": item
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (res.ok) {
            return res = res.json()
        } else {
            return Promise.reject(`Ошибка ${res.status}`);
        }
    })
    .catch((rej) => {
        console.log(`Ошибка ${rej.status}`);
    });
}