import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: "",
    token: localStorage.getItem("token") || "",
  },
  reducers: {
    login(state, action) {
      if (!action.payload.error) {
        state.isLoggedIn = true;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
        state.error = "";
      }
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
      state.error = "";
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
