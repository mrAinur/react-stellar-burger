import { getInfo } from "../../../../utils/getAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetIngredients, Ingredient } from "../../../../utils/types";

type State = {
  load: boolean;
  loadError: boolean;
  ingredients: Ingredient[];
  activeTab: "bun" | "sauce" | "main";
};

const initialState: State = {
  load: true,
  loadError: false,
  ingredients: [],
  activeTab: "bun",
};

export const getIngredientsInfo = createAsyncThunk("info/getInfo", async () => {
  const ingredients = await getInfo<GetIngredients>();
  return ingredients.data;
});

const getIngredients = createSlice({
  name: "getIngredients",
  initialState,
  reducers: {
    activeNuv: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getIngredientsInfo.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.load = false;
    });
  },
});

export const getIngredientsData = getIngredients.reducer;
export const { activeNuv } = getIngredients.actions;
