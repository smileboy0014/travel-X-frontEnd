import { createSlice } from "@reduxjs/toolkit";

const detailResult = createSlice({
  name: "detailResult",
  initialState: {
    data: [],
  },
  reducers: {
    saveData: (state, action) => {
      return { ...state, data: [action.payload] };
    },
  },
});

export const { saveData } = detailResult.actions; // 액션 생성함수
export default detailResult.reducer; // 리듀서
