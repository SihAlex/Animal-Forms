import { createSlice } from "@reduxjs/toolkit";

/**
 * TODO item object structure:
 *
 * {
 *   id: "i#", // # - number of the item
 *   title: "",
 *   content: "",
 * }
 */

const todoSlice = createSlice({
  name: "todo",
  initialState: { todoList: [] },
  reducers: {
    addItem(state, action) {
      const aItem = action.payload;
      if (action.payload) {
        state.todoList.push(aItem);
      }
    },
    removeItem(state, action) {
      const rItem = action.payload;
      if (action.payload) {
        state.todoList = state.todoList.filter((item) => item.id !== rItem.id);
      }
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice;
