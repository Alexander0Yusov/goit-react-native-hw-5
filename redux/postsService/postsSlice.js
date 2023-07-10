import { createSlice } from "@reduxjs/toolkit";
import {
  getPostsThunk,
  postPostThunk,
  patchContactThunk,
  deleteContactThunk,
} from "./thunks";

import {
  handlerPending,
  handlerRejected,
  handlerFulfilledGet,
  handlerFulfilledPost,
  handlerFulfilledPatch,
  handlerFulfilledDelete,
} from "./postsHandlers";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    //=====GET
    [getPostsThunk.pending]: handlerPending,
    [getPostsThunk.fulfilled]: handlerFulfilledGet,
    [getPostsThunk.rejected]: handlerRejected,
    //=====POST
    [postPostThunk.pending]: handlerPending,
    [postPostThunk.fulfilled]: handlerFulfilledPost,
    [postPostThunk.rejected]: handlerRejected,
    //=====PUT
    // [patchContactThunk.pending]: handlerPending,
    // [patchContactThunk.fulfilled]: handlerFulfilledPatch,
    // [patchContactThunk.rejected]: handlerRejected,
    //=====DELETE
    // [deleteContactThunk.pending]: handlerPending,
    // [deleteContactThunk.fulfilled]: handlerFulfilledDelete,
    // [deleteContactThunk.rejected]: handlerRejected,
  },
});

export const postsReducer = postsSlice.reducer;
