import { createSlice } from "@reduxjs/toolkit";

const initState = 
["HOTEL","MOTEL","PENSION", "GUESTHOUSE","RESORT","CAMPING" ];

const propertyTypeSlice = createSlice({
  name: "propertyType",
  initialState: initState,
  reducers: {
    sendConfirm: (state, action) => {
      return  [...action.payload];
    },
    initValue: (state) => {
      return { state, ...initState };
    }
  },
});

export const { sendConfirm, initValue } = propertyTypeSlice.actions; // 액션 생성함수

export default propertyTypeSlice.reducer; // 리듀서
