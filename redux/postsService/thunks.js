import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  postPost,
  deleteContact,
  patchContact,
  getPosts,
  countCommentsEachPost,
} from "./postsOperations";

export const getPostsThunk = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const countCommentsData = await countCommentsEachPost();
      const data = await getPosts();
      return { data, countCommentsData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postPostThunk = createAsyncThunk(
  "posts/postPost",
  async (item, thunkAPI) => {
    try {
      return await postPost(item);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const patchContactThunk = createAsyncThunk(
//   "contacts/patchContact",
//   async ({ id, ...item }, thunkAPI) => {
//     try {
//       return await patchContact(id, item);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteContactThunk = createAsyncThunk(
//   "contacts/deleteContact",
//   async (id, thunkAPI) => {
//     try {
//       return await deleteContact(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
