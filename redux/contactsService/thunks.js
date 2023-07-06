import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getContacts,
  postContact,
  deleteContact,
  patchContact,
} from './contactsOperations';

export const getContactsThunk = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkAPI) => {
    try {
      return await getContacts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postContactThunk = createAsyncThunk(
  'contacts/postContact',
  async (item, thunkAPI) => {
    try {
      return await postContact(item);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchContactThunk = createAsyncThunk(
  'contacts/patchContact',
  async ({ id, ...item }, thunkAPI) => {
    try {
      return await patchContact(id, item);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      return await deleteContact(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
