import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "" };

const reviewSearchType = createSlice({
  name: "reviewSearchType",
  initialState,

  reducers: {
    setReviewSearchType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setReviewSearchType } = reviewSearchType.actions; // 액션 생성함수

export default reviewSearchType.reducer; // 리듀서
