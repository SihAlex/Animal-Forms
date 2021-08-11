import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo-list";
import memeSlice from "./meme-api";
import todoListControlsSlice from "./todo-list-controls";

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    meme: memeSlice.reducer,
    todoControls: todoListControlsSlice.reducer,
  },
});

export default store;
