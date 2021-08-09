import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo-list";

const store = configureStore({
  reducer: { todo: todoSlice },
});

export default store;
