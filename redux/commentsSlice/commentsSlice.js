import { createSlice } from "@reduxjs/toolkit";
import { getCommentsThunk, postCommentThunk } from "./commentsThunks";

import {
  commentsHandlerPending,
  commentsHandlerRejected,
  commentsGetHandlerFulfilled,
  commentPostHandlerFulfilled,
} from "./commentsHandlers";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    //=====GET
    [getCommentsThunk.pending]: commentsHandlerPending,
    [getCommentsThunk.fulfilled]: commentsGetHandlerFulfilled,
    [getCommentsThunk.rejected]: commentsHandlerRejected,
    //=====POST
    [postCommentThunk.pending]: commentsHandlerPending,
    [postCommentThunk.fulfilled]: commentPostHandlerFulfilled,
    [postCommentThunk.rejected]: commentsHandlerRejected,
  },
});

export const commentsReducer = commentsSlice.reducer;
