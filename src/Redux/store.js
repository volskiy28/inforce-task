import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./shopSlice";

export const store = configureStore({
  reducer: {
    shop: itemsReducer,
  },
});
