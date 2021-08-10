import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo-list";
import memeSlice from "./meme-api";

const store = configureStore({
  reducer: { todo: todoSlice.reducer, meme: memeSlice.reducer },
});

export default store;
