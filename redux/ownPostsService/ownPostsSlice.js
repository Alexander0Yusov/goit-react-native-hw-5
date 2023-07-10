import { createSlice } from "@reduxjs/toolkit";
import { getOwnPostsThunk } from "./thunks";

import {
  handlerPending,
  handlerRejected,
  handlerFulfilledGet,
} from "./ownPostsHandlers";

const ownPostsSlice = createSlice({
  name: "ownPosts",
  initialState: {
    ownPosts: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    //=====GET
    [getOwnPostsThunk.pending]: handlerPending,
    [getOwnPostsThunk.fulfilled]: handlerFulfilledGet,
    [getOwnPostsThunk.rejected]: handlerRejected,
  },
});

export const ownPostsReducer = ownPostsSlice.reducer;
