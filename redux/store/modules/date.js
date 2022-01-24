import { createSlice } from "@reduxjs/toolkit";

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toJSON();
const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toJSON();

function addZero(value) { 
  if (value >= 10) { 
    return value; 
  } 
  
  return `0${value}`; 
} 

function FormattingDate(source) { 
  const year = source.getFullYear(); 
  const month = addZero(source.getMonth() + 1); 
  const day = addZero(source.getDate()); 
  
  return `${year}${month}${day}`; 
}

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
