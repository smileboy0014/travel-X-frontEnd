import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: 1 };
const adultCounter = createSlice({
  name: "adultCounter",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = 1;
    },
  },
});
export const { setCount, reset } = adultCounter.actions; // 액션 생성함수
export default adultCounter.reducer; // 리듀서
