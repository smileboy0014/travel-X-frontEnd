import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import reducer from "./modules";
const makeStore = (context) =>
  configureStore({
    reducer,
    // 보고싶은 로그가 있어도 이것때문에 보기 힘들어서 일단 끔  by gtpark
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
