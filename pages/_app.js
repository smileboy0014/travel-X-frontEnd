import React, { useEffect, useState } from "react";
import ScrollTopArrow from "../components/ScrollTop/ScrollTopArrow";
import { wrapper } from "../redux/store";
import "../styles/globals.css";
import * as scrollYActions from "../redux/store/modules/scrollY";
import * as redirectUriActions from "../redux/store/modules/redirectUri";
import * as userInfoActions from "../redux/store/modules/userInfo";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Script from 'next/script';
import MenuLoginButton from './../components/Button/Login/MenuLoginButton';

function TravelX({ Component, pageProps }) {
  const [scrollYValue, setScrollYVlue] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  const listener = () => {
    setScrollYVlue(document.body.scrollTop);
  };

  const handleRouteChange = (url) => {
    dispatch(redirectUriActions.setRedirectUri(url));
  };

  useEffect(() => {
    document.body.addEventListener("scroll", listener);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      document.body.removeEventListener("scroll", listener);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    dispatch(scrollYActions.scrollY({ scrollYValue }));

    let userInfo = localStorage.getItem('userInfo');
    if (userInfo == null) {
      userInfo = { accessToken: null, userId: null }
    } else {
      userInfo = JSON.parse(userInfo);
      dispatch(userInfoActions.setUserInfo(userInfo));
    }
    
  }, [scrollYValue]);

  return (
    <div>
      <Script
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ra1rvd631l&submodules=geocoder"
        strategy="beforeInteractive"
      />
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive" />
      <ScrollTopArrow></ScrollTopArrow>      
      <MenuLoginButton />
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(TravelX);
