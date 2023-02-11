import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "./authServices";

const initialState = {
  accessToken: null,
  isError: false,
  isSuccess: false,
  messsage: "",
};

export const authorization = createAsyncThunk(
  "auth/authorization",
  async (user, thunkAPI) => {
    try {
      return await authServices.authorization();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.accessToken = null;
      state.isError = false;
      state.isSuccess = false;
      state.messsage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorization.rejected, (state, action) => {
        state.isError = true;
        state.messsage = action.payload;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.accessToken = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducers;
