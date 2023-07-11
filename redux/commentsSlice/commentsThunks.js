import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCommentsById, postComment } from "./commentsOperations";

export const getCommentsThunk = createAsyncThunk(
  "comments/getComments",
  async (data, thunkAPI) => {
    try {
      return await getCommentsById(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postCommentThunk = createAsyncThunk(
  "comments/postComment",
  async (data, thunkAPI) => {
    try {
      return await postComment(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
