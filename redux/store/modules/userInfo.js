import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    id: null,
    accessToken: null,
    name: '',
    email: '',
    publisher: ''
  }
};
const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.info = action.payload;
    }
  },
});

export const { setUserInfo } = userInfo.actions;

export default userInfo.reducer; // 리듀서
