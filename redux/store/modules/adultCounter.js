import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: 1 };
const adultCounter = createSlice({
  name: "adultCounter",
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
      state.value = 0;
    },
  },
});
export const { increment, decrement, reset } = adultCounter.actions; // 액션 생성함수
export default adultCounter.reducer; // 리듀서
