import React, { useEffect, useState } from "react";
import ScrollTopArrow from "../components/ScrollTop/ScrollTopArrow";
import { wrapper } from "../redux/store";
import "../styles/globals.css";
import * as scrollYActions from "../redux/store/modules/scrollY";
import { useDispatch, useSelector } from "react-redux";
import Script from 'next/script';

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
      <Script
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ra1rvd631l&submodules=geocoder"
      />
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"></Script>
      <ScrollTopArrow></ScrollTopArrow>
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(TravelX);
