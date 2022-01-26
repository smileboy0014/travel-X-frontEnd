import { createSlice } from "@reduxjs/toolkit";

const searchResult = createSlice({
  name: "searchResult",
  initialState: {
    data: [],
  },
  reducers: {
    saveData: (state, action) => {
      return { ...state, data: [action.payload] };
    },
  },
});

export const { saveData } = searchResult.actions; // 액션 생성함수
export default searchResult.reducer; // 리듀서
