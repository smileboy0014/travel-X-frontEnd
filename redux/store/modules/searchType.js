import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "RANKING" };

const searchType = createSlice({
  name: "searchType",
  initialState,

  reducers: {
    setSearchType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchType } = searchType.actions; // 액션 생성함수

export default searchType.reducer; // 리듀서
