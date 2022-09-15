import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: {},
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const fetchAllProducts = () => {
  return async (dispatch) => {
    const fetchProductsData = async () => {
      const response = await fetch("https://dummyjson.com/products?limit=30");
      const data = await response.json();
      return data.products;
    };
    const productsData = await fetchProductsData();
    if (productsData != null) {
      dispatch(productActions.setProducts(productsData));
    }
  };
};

export const productActions = productSlice.actions;

export default productSlice;
