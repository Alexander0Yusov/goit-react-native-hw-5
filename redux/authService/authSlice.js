import { createSlice, isAnyOf } from "@reduxjs/toolkit";

// import { loginThunk, logoutThunk, getUserThunk, signUpThunk } from './thunks';
// import {
//   pendingHandler,
//   rejectedHandler,
//   loginFulfilledHandler,
//   logoutFulfilledHandler,
//   getUserFulfilledHandler,
// } from './authHandlers';

// const initialState = {
//   token: '',
//   isLoading: false,
//   error: null,
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(signUpThunk.fulfilled, loginFulfilledHandler)
//       .addCase(loginThunk.fulfilled, loginFulfilledHandler)
//       .addCase(logoutThunk.fulfilled, logoutFulfilledHandler)
//       .addCase(getUserThunk.fulfilled, getUserFulfilledHandler)
//       .addMatcher(
//         isAnyOf(
//           signUpThunk.pending,
//           loginThunk.pending,
//           logoutThunk.pending,
//           getUserThunk.pending
//         ),
//         pendingHandler
//       )
//       .addMatcher(
//         isAnyOf(
//           signUpThunk.rejected,
//           loginThunk.rejected,
//           logoutThunk.rejected,
//           getUserThunk.rejected
//         ),
//         rejectedHandler
//       );
//   },
// });

// export const authReducer = authSlice.reducer;

// // export const filterReducer = filterSlice.reducer;
// export const { setError } = authSlice.actions;

import { loginThunk, signUpThunk, signOutThunk } from "./thunks";

import {
  pendingHandler,
  rejectedHandler,
  loginFulfilledHandler,
  signOutFulfilledHandler,

  //   getUserFulfilledHandler,
} from "./authHandlers";

const initialState = {
  uid: "",
  displayName: "",
  email: "",
  photoURL: "",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPhotoURL: (state, action) => {
      state.photoURL = action.payload;
    },
    setUser: (state, action) => {
      const { uid, displayName, email, photoURL } = action.payload;
      state = { ...state, uid, displayName, email, photoURL };
      console.log("action.payload static", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.fulfilled, loginFulfilledHandler)
      .addCase(loginThunk.fulfilled, loginFulfilledHandler)
      .addCase(signOutThunk.fulfilled, signOutFulfilledHandler)

      .addMatcher(
        isAnyOf(signUpThunk.pending, loginThunk.pending, signOutThunk.pending),
        pendingHandler
      )
      .addMatcher(
        isAnyOf(
          signUpThunk.rejected,
          loginThunk.rejected,
          signOutThunk.rejected
        ),
        rejectedHandler
      );
  },
});

export const authReducer = authSlice.reducer;

// export const filterReducer = filterSlice.reducer;
export const { setError } = authSlice.actions;
export const { setPhotoURL } = authSlice.actions;
export const { setUser } = authSlice.actions;
