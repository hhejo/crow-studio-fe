import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: { isLoading: false } };

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.value.isLoading = true;
    },
    endLoading: (state) => {
      state.value.isLoading = false;
    },
  },
});

export const { startLoading, endLoading } = globalSlice.actions;
export default globalSlice.reducer;
