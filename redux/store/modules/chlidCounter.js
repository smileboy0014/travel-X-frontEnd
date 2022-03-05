import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: 0 };
const childCounter = createSlice({
  name: "childCounter",
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
export const { setCount, reset } = childCounter.actions; // 액션 생성함수
export default childCounter.reducer; // 리듀서
