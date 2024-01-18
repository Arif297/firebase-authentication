import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  isLoggedIn: boolean;
  currentUser: CurrentUser;
  status: string;
  access_token: string;
  error: string | null;
}

export interface CurrentUser {
  id?: number;
  email: string;
  joined_at: string;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  currentUser: {
    email: "",
    joined_at: "",
  },
  access_token: "",
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, { payload }: PayloadAction<CurrentUser>) => {
      const onlineFlag = true;
      state.currentUser = payload;
      state.isLoggedIn = onlineFlag;
    },
    setLogOut: (state) => {
      state.isLoggedIn = false;
      state.access_token = "";
      state.currentUser = initialState.currentUser;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {},
});

export const { logIn, setLogOut } = authSlice.actions;
export default authSlice.reducer;

export const authSelector = (state: RootState) => state.auth;
export const loggedInUserProfile = (state: RootState) => state.auth.currentUser;
