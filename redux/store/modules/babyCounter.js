import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: 0 };
const babyCounter = createSlice({
  name: "babyCounter",
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
export const { setCount, reset } = babyCounter.actions; // 액션 생성함수
export default babyCounter.reducer; // 리듀서
