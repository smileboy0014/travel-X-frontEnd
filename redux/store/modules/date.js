import { createSlice } from "@reduxjs/toolkit";

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toJSON();
const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toJSON();

const initialState = {
  searchDate: { 
    start: today, 
    end: nextDay
  },
  detailDate: { 
    start: today, 
    end: nextDay
  }
};
const date = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSearchDate: (state, action) => {
      state.searchDate = action.payload;
    },
    setDetailDate: (state, action) => {
      state.detailDate = action.payload;
    }
  },
});

export const { setSearchDate, setDetailDate } = date.actions; // 액션 생성함수
export const searchDate = (state) => state.searchDate.value;
export const detailDate = (state) => state.detailDate.value;

export default date.reducer; // 리듀서
