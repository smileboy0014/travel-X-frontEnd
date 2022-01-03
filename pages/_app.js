import React, { useEffect, useState } from "react";
import ScrollTopArrow from "../components/ScrollTop/ScrollTopArrow";
import { wrapper } from "../redux/store";
import "../styles/globals.css";
import * as scrollYActions from "../redux/store/modules/scrollY";
import { useDispatch, useSelector } from "react-redux";

function TravelX({ Component, pageProps }) {
  const [scrollYValue, setScrollYVlue] = useState(0);
  const dispatch = useDispatch();
  const listener = () => {
    setScrollYVlue(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  useEffect(() => {
    dispatch(scrollYActions.scrollY({ scrollYValue }));
  }, [scrollYValue]);

  return (
    <div>
      <ScrollTopArrow></ScrollTopArrow>
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(TravelX);
