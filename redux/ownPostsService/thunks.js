import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOwnPosts, countCommentsEachPost } from "./ownPostsOperations";

export const getOwnPostsThunk = createAsyncThunk(
  "ownPosts/getOwnPosts",
  async (uid, thunkAPI) => {
    try {
      const countCommentsData = await countCommentsEachPost();
      const data = await getOwnPosts(uid);
      return { data, countCommentsData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
