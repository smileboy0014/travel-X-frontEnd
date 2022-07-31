import { createSlice } from "@reduxjs/toolkit";

const initialState = {state:false};
const spinnerOn = createSlice({
  name: "spinnerOn",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.state = action.payload;
    },
  }
});

export const { setState } = spinnerOn.actions;

export default spinnerOn.reducer; // 리듀서
