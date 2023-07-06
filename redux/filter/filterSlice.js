import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',

  initialState: {
    filter: '',
    selectedUser: null,
  },

  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { setFilter } = filterSlice.actions;
export const { setSelectedUser } = filterSlice.actions;
