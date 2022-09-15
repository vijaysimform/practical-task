import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    total: 0,
    changed: false,
    notification: null,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          total: newItem.price,
          title: newItem.title,
        });
        state.total = state.total + newItem.price;
        state.notification = "Item has been added to your shopping cart.";
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + newItem.price;
        state.total = state.total + newItem.price;
        state.notification = "Item has been updated to your shopping cart.";
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        const existingItemPrice = existingItem.total;
        state.items = state.items.filter((item) => item.id !== id);
        state.total = state.total - existingItemPrice;
        state.notification = "Item has been removed from your shopping cart.";
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
        state.total = state.total - existingItem.price;
        state.notification = "Item has been updated to your shopping cart.";
      }
    },
    deleteItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.changed = true;
      const existingItemPrice = existingItem.total;
      const existingItemQty = existingItem.quantity;
      state.items = state.items.filter((item) => item.id !== id);
      state.total = state.total - existingItemPrice;
      state.totalQuantity = state.totalQuantity - existingItemQty;
      state.notification = "Item has been removed from your shopping cart.";
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
