import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: 0 };
const childCounter = createSlice({
  name: "childCounter",
  initialState,
  reducers: {
    increment: (state) => {
      if (state.value >= 0) {
        state.value += 1;
      }
    },
    decrement: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
    reset: (state) => {
      state.value = 1;
    },
  },
});
export const { increment, decrement, reset } = childCounter.actions; // 액션 생성함수
export default childCounter.reducer; // 리듀서
