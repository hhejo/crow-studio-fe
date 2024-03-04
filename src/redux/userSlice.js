import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userApi from "../api/userApi";

// 초기 상태값
const initialState = {
  value: {
    isLoggedIn: false,
    mySeq: "",
    myEmail: "",
    myNickname: "",
    myImageURL: "",
    myGitUsername: "",
    myGitToken: "",
  },
};

// JWT에 해당하는 유저 정보 조희
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getUser();
      return response.data;
    } catch (err) {
      if (!err.reponse) {
        throw err;
      }
      return rejectWithValue(err.response.status);
    }
  }
);

// 닉네임 변경
export const updateNickname = createAsyncThunk(
  "user/updateNickname",
  async (updatedNicknameData, { rejectWithValue }) => {
    try {
      const response = await userApi.updateNickname(updatedNicknameData);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.status);
    }
  }
);

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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access-token");
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        const {
          userId,
          userNickname,
          userProfile,
          userSeq,
          userGitUsername,
          userGitToken,
        } = action.payload;
        state.value = {
          isLoggedIn: true,
          myEmail: userId,
          myNickname: userNickname,
          myImageURL: userProfile,
          mySeq: userSeq,
          myGitUsername: userGitUsername,
          myGitToken: userGitToken,
        };
      })
      .addCase(getUser.rejected, (state) => {
        state.value = initialState.value;
      })
      .addCase(updateNickname.fulfilled, (state, action) => {
        state.value.myNickname = action.payload.userNickname;
      })
      .addCase(updateGitAuth.fulfilled, (state, action) => {
        state.value.myGitUsername = action.payload.userGitUsername;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
