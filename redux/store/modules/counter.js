import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: 0 };
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});
export const { increment, decrement, reset } = counterSlice.actions; // 액션 생성함수
export default counterSlice.reducer; // 리듀서
