import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: { loading: false } };

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.value.loading = true;
    },
    stopLoading: (state) => {
      state.value.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = globalSlice.actions;
export default globalSlice.reducer;
