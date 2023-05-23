import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrder, getInfo } from '../../../utils/getAPI';


const initialState = {
  load: true,
  ingredients: [],
  bun: [],
  main: [],
  allProducts: [],
  fullPrice: 0,
  orderNumber: null
}

export const getIngredientsInfo = createAsyncThunk("products/getInfo", async () => {
  const ingredients = await getInfo();
  return ingredients.data
})

export const getOrderInfo = createAsyncThunk("info/getOrderInfo", async (item) => {
  const orderInfo = await getOrder(item);
  return orderInfo.order.number
})

const ingredientsOrder = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload
      state.allProducts.unshift(state.bun)
      state.fullPrice = state.allProducts.reduce((total, product) => total += product.price * 2, 0)
    },
    addMain: (state, action) => {
      state.main.unshift(action.payload)
      state.allProducts.unshift(action.payload)
      state.fullPrice = state.allProducts.reduce((total, product) => total += product.price, 0)
    },
    deleteIngredient: (state, action) => {
      state.main = state.main.filter(item => item.id !== action.payload.id)
    },
    replaceIngredient: (state, action) => {

    },
    extraReducers: (builder) => {
      builder.addCase(getIngredientsInfo.fulfilled, (state, action) => {
        state.ingredients = action.payload
        state.load = false
      })
      builder.addCase(getOrderInfo.fulfilled, (state, action) => {
        state.orderNumber = action.payloud
      })
    }
  }
})

export const getIngredientsData = ingredientsOrder.reducer;
export const { addBun, addMain, deleteIngredient } = ingredientsOrder.actions;