import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import counter from "./counter";
import roomFilter from "./roomFilter";
import adultCounter from "./adultCounter";
import childCounter from "./chlidCounter";
import map from "./map";
import reviewContent from "./reviewContent";
import scrollY from "./scrollY";
import searchResult from "./searchResult";
import date from "./date";
import searchType from "./searchType";

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
    searchResult,
    date,
    searchType,
  })(state, action);
};

export default reducer;
