import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import teamApi from "../api/teamApi";

const initialState = {
  value: {
    teamSeq: "",
    teamName: "",
    projectType: "",
    teamGit: "",
    selectedFileName: "",
    // selectedFileType: "directory",
    selectedFileType: "",
    selectedFilePath: "",
  },
};

export const getTeamDetail = createAsyncThunk(
  "team/getTeamDetail",
  async (teamSeq, { rejectWithValue }) => {
    try {
      const response = await teamApi.getTeamDetail(teamSeq);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.status);
    }
  }
);

export const delegateLeader = createAsyncThunk(
  "team/delegateLeader",
  async (delegateData, { rejectWithValue }) => {
    try {
      const response = await teamApi.delegateLeader(delegateData);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.status);
    }
  }
);

export const modifyProjectType = createAsyncThunk(
  "team/modifyProjectType",
  async ({ teamSeq, modifiedData }, { rejectWithValue }) => {
    try {
      const response = await teamApi.modifyProjectType(teamSeq, modifiedData);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.status);
    }
  }
);

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    selectFile: (state, action) => {
      const { name, type, path } = action.payload;
      state.value.selectedFileName = name;
      state.value.selectedFileType = type;
      state.value.selectedFilePath = path;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeamDetail.fulfilled, (state, action) => {
      const { teamSeq, teamName, projectType, teamGit } = action.payload;
      state.value.teamSeq = teamSeq;
      state.value.teamName = teamName;
      state.value.projectType = projectType;
      state.value.teamGit = teamGit;
    });
  },
});

export const { selectFile } = teamSlice.actions;
export default teamSlice.reducer;
