import { createSlice } from "@reduxjs/toolkit";
import { retrieveStoredToken } from "./auth-actions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: "",
    token: retrieveStoredToken() ? retrieveStoredToken().token : "",
    expires: retrieveStoredToken() ? retrieveStoredToken().expires : "",
  },
  reducers: {
    login(state, action) {
      if (!action.payload.error) {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("expirationTime", action.payload.expires);
        state.error = "";
      }
    },
    logout(state, action) {
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      state.error = "";
      if (action.payload) {
        clearTimeout(action.payload);
      }
    },
    setError(state, action) {
      state.error = action.payload;
    },
    getExpirationTime(state) {
      return state.expires;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
