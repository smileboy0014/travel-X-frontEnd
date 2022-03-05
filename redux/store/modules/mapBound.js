import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  southWest: [],
  northEast: [],
};

const mapBound = createSlice({
  name: "mapBound",
  initialState,
  reducers: {
    increment: (state) => {
      if (state.value >= 0) {
        state.value += 1;
      }
    },

    setSouthWest: (state, action) => {
      state.southWest = [];
      state.southWest = action.payload;
    },

    setNorthEast: (state, action) => {
      state.northEast = [];
      state.northEast = action.payload;
    },
  },
});
export const { increment, setSouthWest, setNorthEast } = mapBound.actions; // 액션 생성함수

export default mapBound.reducer; // 리듀서
