const apiLink = "https://norma.nomoreparties.space/api/ingredients";

export function getInfo() {
    return fetch(apiLink, {
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