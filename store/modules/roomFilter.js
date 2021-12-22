import { createSlice } from "@reduxjs/toolkit";

const roomFilterSlice = createSlice({
  name: "roomFilter",
  initialState: {
    filter: [],
  },
  reducers: {
    sendConfirm: (state, action) => {
      return { ...state, filter: [...action.payload] };
    },
  },
});

export const { sendConfirm } = roomFilterSlice.actions; // 액션 생성함수

export default roomFilterSlice.reducer; // 리듀서
