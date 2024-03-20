import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import globalReducer from "./global-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    global: globalReducer,
  },
});
