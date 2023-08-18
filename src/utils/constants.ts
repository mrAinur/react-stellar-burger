const wssFeedsURL: string = "wss://norma.nomoreparties.space/orders/all";
const wssOrdersURL: string = "wss://norma.nomoreparties.space/orders";
const baseURL: string = "https://norma.nomoreparties.space/api/";

enum ingredientsTypes {
  bun = "bun",
  sauce = "sauce",
  main = "main",
}

const accessToken: string = "accessToken";

const refreshToken: string = "refreshToken";

const token: string | undefined = localStorage
  .getItem(accessToken)
  ?.replace("Bearer ", "");

export {
  ingredientsTypes,
  accessToken,
  refreshToken,
  wssFeedsURL,
  wssOrdersURL,
  baseURL,
  token,
};
