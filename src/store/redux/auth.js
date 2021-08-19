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
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.error = "";
      }
    },
    logout(state, action) {
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("refreshToken");
      state.error = "";
      if (action.payload) {
        clearTimeout(action.payload);
      }
    },
    refreshStoredToken(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;

      localStorage.setItem("expirationTime", action.payload.expires);
      state.expires = action.payload.expires;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
