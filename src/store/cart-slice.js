import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk("cart/fetchData", async () => {
  const response = await fetch("https://dummyjson.com/carts/1");
  const data = await response.json();
  return data;
});

export const updateCart = createAsyncThunk("cart/updateCart", async (cart) => {
  const response = await fetch("https://dummyjson.com/carts/1", {
    method: "PUT",
    body: JSON.stringify(cart),
  });
  await response.json();
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    total: 0,
    changed: false,
    notification: null,
    status: "idle",
  },
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.products || [];
        state.totalQuantity = action.payload.totalQuantity;
        state.total = action.payload.total;
        state.status = "idle";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.items = [];
        state.totalQuantity = 0;
        state.total = 0;
        state.status = "idle";
        state.notification = "Fetching cart data failed.";
      })
      .addCase(updateCart.rejected, (state, action) => {
        console.log("test");
        state.notification = "Sending cart data failed.";
      });
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
