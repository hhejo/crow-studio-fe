import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase";

// 초기 상태값
const initialState = {
  value: {
    loggedIn: false,
    uid: "",
    docId: "",
    email: "",
    nickname: "",
    imageURL: "",
    gitUsername: "",
    gitToken: "",
  },
};

// 로그인 된 현재 사용자 정보를 Redux에 설정
export const setCurrentUser = createAsyncThunk(
  "user/setCurrentUser",
  async (user, { rejectWithValue }) => {
    try {
      const { uid, docId, email } = user;
      const { displayName: nickname, photoURL: imageURL } = user;
      return { uid, docId, email, nickname, imageURL };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      auth.signOut();
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentUser.fulfilled, (state, action) => {
        const { uid, docId, email, nickname, imageURL } = action.payload;
        state.value = { loggedIn: true, uid, docId, email, nickname, imageURL };
      })
      .addCase(setCurrentUser.rejected, (state, action) => {
        state.value = initialState.value;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
