import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: 0 };
const scrollYSlice = createSlice({
  name: "scrollY",
  initialState,
  reducers: {
    scrollY: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { scrollY } = scrollYSlice.actions; // 액션 생성함수
export default scrollYSlice.reducer; // 리듀서
