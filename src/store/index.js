import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import notificationSlice from "./notification-slice";
import productSlice from "./product-slice";

const store = configureStore({
    reducer: { product: productSlice.reducer, notification: notificationSlice.reducer, cart: cartSlice.reducer }
});

export default store;