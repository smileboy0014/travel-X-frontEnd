import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: '/'
};
const redirectUri = createSlice({
  name: "redirectUri",
  initialState,
  reducers: {
    setRedirectUri: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { setRedirectUri } = redirectUri.actions; 

export default redirectUri.reducer; // 리듀서
