import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import counter from "./counter";
import roomFilter from "./roomFilter";
import adultCounter from "./adultCounter";
import childCounter from "./chlidCounter";
import map from "./map";
import reviewContent from "./reviewContent";
import scrollY from "./scrollY";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({
    counter,
    roomFilter,
    adultCounter,
    childCounter,
    map,
    reviewContent,
    scrollY,
  })(state, action);
};

export default reducer;
