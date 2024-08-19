import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
};

export const LocalCartSlice = createSlice({
  name: "LocalCart",
  initialState,
  reducers: {
    setCartList: (state, { payload }) => {
      state.cartList = payload;
    },
    addToList: (state, { payload: item }) => {
      const existingItemIndex = state.cartList.findIndex(
        (i) => i.id === item.id
      );

      if (existingItemIndex !== -1) {
        state.cartList[existingItemIndex].amount += 1;
      } else {
        state.cartList.push({ ...item, amount: 1 });
      }
    },
    changeAmount: (state, { payload }) => {
      const existingItem = state.cartList.find((i) => i.id === payload?.id);

      if (existingItem > 1) {
        state.cartList;
      }
    },
    removeFromList: (state, { payload: id }) => {
      state.cartList = state.cartList.filter((item) => item.id !== id);
    },
    incrementCart: (state, { payload: id }) => {
      const existingItemIndex = state.cartList.findIndex(
        (item) => item.id === id
      );

      if (existingItemIndex !== -1) {
        state.cartList[existingItemIndex].amount += 1;
      }
    },
    decrementCart: (state, { payload: id }) => {
      const existingItemIndex = state.cartList.findIndex(
        (item) => item.id === id
      );

      if (existingItemIndex !== -1) {
        // Уменьшаем количество, но если amount становится 0, удаляем элемент
        if (state.cartList[existingItemIndex].amount > 1) {
          state.cartList[existingItemIndex].amount -= 1;
        } else {
          state.cartList = state.cartList.filter((item) => item.id !== id);
        }
      }
    },
  },
});

export const {
  setCartList,
  addToList,
  removeFromList,
  incrementCart,
  decrementCart,
} = LocalCartSlice.actions;

export default LocalCartSlice.reducer;
