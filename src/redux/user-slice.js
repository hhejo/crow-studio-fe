import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import userApi from "../api/userApi";

// 초기 상태값
const initialState = {
  value: {
    isLoggedIn: false,
    accessToken: "",
    uid: "",
    docId: "",
    email: "",
    nickname: "",
    imageURL: "",
    gitUsername: "",
    gitToken: "",
  },
};

// setCurrentUser: 로그인 된 현재 사용자 정보를 Redux에 설정
export const setCurrentUser = createAsyncThunk(
  "user/setCurrentUser",
  async (user, { rejectWithValue }) => {
    try {
      const { accessToken, uid, docId, email } = user;
      const { displayName: nickname, photoURL: imageURL } = user;
      return { accessToken, uid, docId, email, nickname, imageURL };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// 닉네임 변경
// export const updateNickname = createAsyncThunk(
//   "user/updateNickname",
//   async (updatedNicknameData, { rejectWithValue }) => {
//     try {
//       const response = await userApi.updateNickname(updatedNicknameData);
//       return response.data;
//     } catch (err) {
//       if (!err.response) {
//         throw err;
//       }
//       return rejectWithValue(err.response.status);
//     }
//   }
// );

// 유저 검색
export const searchUser = createAsyncThunk(
  "user/searchUser",
  async (searchUserData, { rejectWithValue }) => {
    try {
      const response = await userApi.searchUser(searchUserData);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.status);
    }
  }
);

// 깃 업데이트
export const updateGitAuth = createAsyncThunk(
  "user/updateGitAuth",
  async (credentialsData, { rejectWithValue }) => {
    try {
      const response = await userApi.updateGitAuth(credentialsData);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.status);
    }
  }
);

// userSlice
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
        const { accessToken, uid, docId, email, nickname, imageURL } =
          action.payload;
        state.value = {
          isLoggedIn: true,
          accessToken,
          uid,
          docId,
          email,
          nickname,
          imageURL,
        };
      })
      .addCase(setCurrentUser.rejected, (state, action) => {
        state.value = initialState.value;
      })
      // .addCase(updateNickname.fulfilled, (state, action) => {
      //   state.value.myNickname = action.payload.userNickname;
      // })
      .addCase(updateGitAuth.fulfilled, (state, action) => {
        state.value.myGitUsername = action.payload.userGitUsername;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
