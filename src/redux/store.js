import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import favoriteSlice from "./slice/favouriteSlice";
import registerReducer from "./slice/registerSlice";
import loginReducer from "./slice/registerSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorites: favoriteSlice,
    register: registerReducer,
    login: loginReducer,
  },
});
