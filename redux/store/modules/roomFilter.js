import { createSlice } from "@reduxjs/toolkit";

const initState = {
  rent: [],
  hotel: []
};

const roomFilterSlice = createSlice({
  name: "roomFilter",
  initialState: {
    filter: {
      rent: [],
      hotel: []
    },
  },
  reducers: {
    sendConfirm: (state, action) => {
      return { state, ...action.payload };
    },
    initValue: (state, action) => {
      return { state, ...initState };
    }
  },
});

export const { sendConfirm, initValue } = roomFilterSlice.actions; // 액션 생성함수

export default roomFilterSlice.reducer; // 리듀서
