import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    auth: false,
    id: null,
    accessToken: null,
    nickName: '',
    email: '',
    pub: ''
  }
};
const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      Object.keys(action.payload).map(key => {
        state.info[key] = action.payload[key];
      });
    }
  },
});

export const { setUserInfo } = userInfo.actions;

export default userInfo.reducer; // 리듀서
