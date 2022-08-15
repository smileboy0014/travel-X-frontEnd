import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  pos: { 
    latitude: '37.71344096516783', 
    longitude: '126.8666797982575' 
  },
  addresses: [],
  scriptLoaded: false,
  srpMapOn: false
};
const map = createSlice({
  name: "map",
  initialState,
  reducers: {
    setScriptLoaded: (state, action) => {
      state.scriptLoaded = action.payload;
    },
    setSrpMapOn: (state, action) => {
      state.srpMapOn = action.payload;
    },
    setPos: (state, action) => {
      state.pos = action.payload;
    },
    resetPos: (state) => {
      state.pos = { 
        latitude: '37.71344096516783', 
        longitude: '126.8666797982575'
      };
    },
    setAddr: (state, action) => {
      state.addresses = action.payload;
    },
    resetAddr: (state) => {
      state.curPos = [];
    }
  },
});
export const { setScriptLoaded, setPos, resetPos, setAddr, resetAddr, setSrpMapOn } = map.actions; // 액션 생성함수
export default map.reducer; // 리듀서
export const naverMapScriptLoaded = (state) => state.scriptLoaded.value;