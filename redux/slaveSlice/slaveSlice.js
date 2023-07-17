import { createSlice } from "@reduxjs/toolkit";

export const slaveSlice = createSlice({
  name: "slave",

  initialState: {
    trigger: "",
    screenName: "",
  },

  reducers: {
    setTrigger: (state, action) => {
      state.trigger = action.payload;
    },
    setScreenName: (state, action) => {
      state.screenName = action.payload;
    },
  },
});

export const slaveReducer = slaveSlice.reducer;
export const { setTrigger } = slaveSlice.actions;
export const { setScreenName } = slaveSlice.actions;
