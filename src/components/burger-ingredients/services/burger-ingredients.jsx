import { getInfo } from '../../../utils/getAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  load: true,
  loadError: false,
  ingredients: []
}

export const getIngredientsInfo = createAsyncThunk("info/getInfo", async () => {
  const ingredients = await getInfo();
  return ingredients.data
})

const getIngredients = createSlice({
  name: 'getIngredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientsInfo.fulfilled, (state, action) => {
      state.ingredients = action.payload
      state.load = false
    })
  },
})

export const getIngredientsData = getIngredients.reducer;
export const { ingredientsLoad, ingredientsSuccess, ingredientsLoadError } = getIngredients.actions;

