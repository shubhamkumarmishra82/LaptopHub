import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import productReducer from "./ProductSlice";
import cartReducer from "./cartSlice";
const store = configureStore({
  reducer : {
    auth : loginReducer,
    product : productReducer,
      cart: cartReducer
  }
})
export default store;