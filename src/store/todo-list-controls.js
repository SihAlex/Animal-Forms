import { createSlice } from "@reduxjs/toolkit";

const todoListControlsSlice = createSlice({
  name: "todo-controls",
  initialState: {
    showConfirmation:
      localStorage.getItem("showConfirmation") === "false" ? false : true,
  },
  reducers: {
    setShowConfirmation(state, action) {
      if (action.payload === false || action.payload === true) {
        state.showConfirmation = action.payload;
        localStorage.setItem("showConfirmation", action.payload);
      }
    },
  },
});

export const todoListControlsActions = todoListControlsSlice.actions;
export default todoListControlsSlice;
