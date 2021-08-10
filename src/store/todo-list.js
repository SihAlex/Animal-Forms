import { createSlice } from "@reduxjs/toolkit";

/**
 * TODO item object structure:
 *
 * {
 *   id: "i#", // # - number of the item
 *   title: "",
 *   content: "",
 *   completed: false,
 * }
 */

const updateLocalStorage = (todoList) => {
  localStorage.setItem("todo", JSON.stringify(todoList));
};

const generateId = (todoList) => {
  let generatedIdNumber = 0;
  while (
    todoList.find((item) => item.id === `i${generatedIdNumber}`) !== undefined
  ) {
    generatedIdNumber++;
    if (generatedIdNumber > 999) {
      return "iLimitReached";
    }
  }
  return `i${generatedIdNumber}`;
};

const todoSlice = createSlice({
  name: "todo",
  initialState: { todoList: JSON.parse(localStorage.getItem("todo")) || [] },
  reducers: {
    addItem(state, action) {
      if (action.payload) {
        const aItem = action.payload;

        aItem.id = generateId(state.todoList);

        if (aItem.id === "iLimitReached") {
          return;
        }
        state.todoList.push(aItem);
        updateLocalStorage(state.todoList);
      }
    },
    removeItem(state, action) {
      if (action.payload) {
        const rItemId = action.payload;
        state.todoList = state.todoList.filter((item) => item.id !== rItemId);
        updateLocalStorage(state.todoList);
      }
    },
    check(state, action) {
      if (action.payload) {
        const completedEntryId = action.payload;
        const completedEntryIndex = state.todoList.findIndex(
          (item) => item.id === completedEntryId
        );
        if (state.todoList[completedEntryIndex]) {
          state.todoList[completedEntryIndex].completed = true;
        }
        updateLocalStorage(state.todoList);
      }
    },
    uncheck(state, action) {
      if (action.payload) {
        const completedEntryId = action.payload;
        const completedEntryIndex = state.todoList.findIndex(
          (item) => item.id === completedEntryId
        );
        if (state.todoList[completedEntryIndex]) {
          state.todoList[completedEntryIndex].completed = false;
        }
        updateLocalStorage(state.todoList);
      }
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice;
