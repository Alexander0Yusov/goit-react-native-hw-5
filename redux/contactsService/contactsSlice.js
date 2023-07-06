import { createSlice } from '@reduxjs/toolkit';
import {
  getContactsThunk,
  postContactThunk,
  patchContactThunk,
  deleteContactThunk,
} from './thunks';

import {
  handlerPending,
  handlerRejected,
  handlerFulfilledGet,
  handlerFulfilledPost,
  handlerFulfilledPatch,
  handlerFulfilledDelete,
} from './contactsHandlers';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    //=====GET
    [getContactsThunk.pending]: handlerPending,
    [getContactsThunk.fulfilled]: handlerFulfilledGet,
    [getContactsThunk.rejected]: handlerRejected,
    //=====POST
    [postContactThunk.pending]: handlerPending,
    [postContactThunk.fulfilled]: handlerFulfilledPost,
    [postContactThunk.rejected]: handlerRejected,
    //=====PUT
    [patchContactThunk.pending]: handlerPending,
    [patchContactThunk.fulfilled]: handlerFulfilledPatch,
    [patchContactThunk.rejected]: handlerRejected,
    //=====DELETE
    [deleteContactThunk.pending]: handlerPending,
    [deleteContactThunk.fulfilled]: handlerFulfilledDelete,
    [deleteContactThunk.rejected]: handlerRejected,
  },
});

export const contactsReducer = contactsSlice.reducer;
