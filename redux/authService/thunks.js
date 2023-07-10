// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getUser, login, logout, signUp } from './authOperations';
// import { pushToken } from 'redux/axiosHerokuInstance';

// export const signUpThunk = createAsyncThunk(
//   'auth/signUp',
//   async (data, thunkAPI) => {
//     try {
//       return await signUp(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const loginThunk = createAsyncThunk(
//   'auth/login',
//   async (data, thunkAPI) => {
//     try {
//       return await login(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const logoutThunk = createAsyncThunk(
//   'auth/logout',
//   async (_, thunkAPI) => {
//     try {
//       return await logout();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const getUserThunk = createAsyncThunk(
//   'auth/getUser',
//   async (_, thunkAPI) => {
//     const token = thunkAPI.getState().authCombine.token;
//     if (!token) {
//       return;
//       // return thunkAPI.rejectWithValue('No valid token'); вариант
//     }

//     pushToken(token);
//     console.log('token ', token);
//     try {
//       const res = await getUser();
//       return res;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerDB,
  loginDB,
  signOut_,
  updatePortrait,
} from "./authOperations";

export const signUpThunk = createAsyncThunk(
  "auth/signUp",
  async (data, thunkAPI) => {
    try {
      return await registerDB(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return await loginDB(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signOutThunk = createAsyncThunk(
  "auth/signOut",
  async (_, thunkAPI) => {
    try {
      return await signOut_();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "auth/update",
  async (data, thunkAPI) => {
    try {
      return await updatePortrait(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
