import { createSlice } from "@reduxjs/toolkit";

export const triggerSlice = createSlice({
  name: "trigger",

  initialState: {
    trigger: "",
  },

  reducers: {
    setTrigger: (state, action) => {
      state.trigger = action.payload;
    },
  },
});

export const triggerReducer = triggerSlice.reducer;
export const { setTrigger } = triggerSlice.actions;
