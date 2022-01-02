import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data:{
    content:'',
    title:''
  }
};

const reviewContent = createSlice({
  name:"reviewContent",
  initialState,
  reducers:{
    setData:(state, action)=>{
      state.data = action.payload;
    }
  }
});

export const { input, setData } = reviewContent.actions; // 액션 생성 함수

export default reviewContent.reducer; // 리듀서
