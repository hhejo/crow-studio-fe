import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user-slice";
import teamReducer from "./teamSlice";
import globalReducer from "./globalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    team: teamReducer,
    global: globalReducer,
  },
});
