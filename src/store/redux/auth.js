import { createSlice } from "@reduxjs/toolkit";
import { checkSignIn } from "./auth-actions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    error: "",
  },
  reducers: {
    login(state) {
      state.error = "";
      state.isLoggedIn = true;
    },
    logout(state) {
      state.error = "";
      state.isLoggedIn = false;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
