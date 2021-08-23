import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: +localStorage.getItem("isLoggedIn") || false,
    error: "",
  },
  reducers: {
    login(state) {
      state.error = "";
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", 1);
    },
    logout(state) {
      state.error = "";
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", 0);
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
