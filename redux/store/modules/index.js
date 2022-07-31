import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import counter from "./counter";
import roomFilter from "./roomFilter";
import adultCounter from "./adultCounter";
import childCounter from "./chlidCounter";
import babyCounter from "./babyCounter";
import map from "./map";
import reviewContent from "./reviewContent";
import scrollY from "./scrollY";
import searchResult from "./searchResult";
import detailResult from "./detailResult";
import date from "./date";
import searchType from "./searchType";
import reviewSearchType from "./reviewSearchType";
import mapBound from "./mapBound";
import redirectUri from "./redirectUri";
import propertyType from "./propertyType";
import userInfo from "./userInfo";
import spinnerOn from "./spinnerOn";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({
    counter,
    roomFilter,
    adultCounter,
    childCounter,
    babyCounter,
    map,
    reviewContent,
    scrollY,
    searchResult,
    detailResult,
    date,
    searchType,
    reviewSearchType,
    mapBound,
    redirectUri,
    userInfo,
    propertyType,
    spinnerOn
  })(state, action);
};

export default reducer;
