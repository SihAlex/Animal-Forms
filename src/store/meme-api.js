import { createSlice } from "@reduxjs/toolkit";

const memeSlice = createSlice({
  name: "meme",
  initialState: { title: "", url: "", error: "" },
  reducers: {
    updateMeme(state, action) {
      if (action.payload) {
        const { title, url } = action.payload;
        state.title = title;
        state.url = url;
      }
    },
    error(state, action) {
      if (action.payload) {
        state.error = action.payload;
      }
    },
  },
});

export const memeActions = memeSlice.actions;
export default memeSlice;
