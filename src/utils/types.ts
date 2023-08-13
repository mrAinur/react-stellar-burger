export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  id?: string;
};

export type Order = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type ServerMessage = {
  orders: Order[];
  success: boolean;
  total: number;
  totalToday: number;
};

export type Options = {
  method: string;
  body?: string;
  headers: {
    authorization?: string;
    "Content-Type": string;
  };
};

export type RefreshData = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type OrderDetailsWithoutBackgroundAnswer = {
  orders: Order[];
  success: boolean;
};

export type GetOrderNum = {
  name: string;
  order: {
    createdAt: string;
    ingredients: Ingredient[];
    name: string;
    number: number;
    owner: {
      [key: string]: string;
    };
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
  };
  success: boolean;
};

export type GetIngredients = {
  data: Ingredient[];
  success: boolean;
};

export type LoginAndRegistrationUser = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: {
    [key: string]: string;
  };
};

export type EditAndCheckUser = {
  success: boolean;
  user: {
    [key: string]: string;
  };
};
