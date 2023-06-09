import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrder } from '../../../utils/getAPI';

const initialState = {
  bun: [],
  main: [],
  fullPrice: 0,
  orderNumber: null
}

export const getOrderInfo = createAsyncThunk("info/getOrderInfo", async (item) => {
  const orderInfo = await getOrder(item);
  return orderInfo.order.number
})

const ingredientsOrder = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = [{...action.payload.bun, id: action.payload.id}]
      state.fullPrice = state.bun.reduce((total, product) => {
        if (state.bun.length) { return total += product.price * 2 } else return total
      }, 0) + state.main.reduce((total, product) => total += product.price, 0)
    },
    addMain: (state, action) => {
      state.main = [...state.main, {...action.payload.ingredient, id: action.payload.id}]
      state.fullPrice = state.bun.reduce((total, product) => {
        if (state.bun.length) { return total += product.price * 2 } else return total
      }, 0) + state.main.reduce((total, product) => total += product.price, 0)
    },
    deleteIngredient: (state, action) => {
      state.main = state.main.filter(item => item.id !== action.payload)
      state.fullPrice = state.bun.reduce((total, product) => {
        if (state.bun.length) { return total += product.price * 2 } else return total
      }, 0) + state.main.reduce((total, product) => total += product.price, 0)
    },
    replaceIngredient: (state, action) => {
      const dragItem = [...state.main][action.payload.dragIndex]
      const hoverItem = [...state.main][action.payload.hoverIndex]
      const updateArr = [...state.main]
      updateArr[action.payload.dragIndex] = hoverItem
      updateArr[action.payload.hoverIndex] = dragItem
      state.main = updateArr
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderInfo.fulfilled, (state, action) => {
      state.orderNumber = action.payload
      state.bun = []
      state.main = []
      state.fullPrice = 0
    })
  }
})

export const getOrderData = ingredientsOrder.reducer;
export const { addBun, addMain, deleteIngredient, replaceIngredient } = ingredientsOrder.actions;