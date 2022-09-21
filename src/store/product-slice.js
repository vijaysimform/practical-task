import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products?limit=30");
    const data = await response.json();
    return data.products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: {},
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const tmpProducts = [];
        action.payload.forEach((product) => {
          tmpProducts.push(product);
        });
        state.products = tmpProducts;
        state.status = "idle";
      });
  },
});

export default productSlice;
