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
import { JAVASCRIPT_KEY } from '../components/Button/Login/LoginConstant';
import { CheckLogin, GetNewAccessTokenByRefreshToken } from './../components/Button/Login/Utils/LoginUtil';
import { GetCookie } from "../components/Button/Login/Utils/CookieUtil";

function TravelX({ Component, pageProps }) {
  const [scrollYValue, setScrollYVlue] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const [urlFilter, setUrlFilter] = useState(['/signup'])

  const listener = () => {
    setScrollYVlue(document.body.scrollTop);
  };

  const handleRouteChange = async (url) => {
    dispatch(redirectUriActions.setRedirectUri(url));
    
    if (!urlFilter.includes(url)) {
      const authPublisher = localStorage.getItem("pub");
    
      if (authPublisher) {
        let checkLogin = await CheckLogin(authPublisher);
        
        if (checkLogin.auth) {
          dispatch(userInfoActions.setUserInfo({ pub: authPublisher, id: checkLogin.id, auth: true }));
        } else {
          localStorage.removeItem("pub");
          dispatch(userInfoActions.setUserInfo({ pub: null, id: null, auth: false }));
        }
      }
    }
    
  };

  useEffect(() => {
    document.body.addEventListener("scroll", listener);
    router.events.on('routeChangeStart', handleRouteChange);
    
    // Kakao SDK Init
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(JAVASCRIPT_KEY);
    }
    
    handleRouteChange();
    return () => {
      document.body.removeEventListener("scroll", listener);
      router.events.off('routeChangeStart', handleRouteChange);
      window.Kakao.cleanup();
    };
  }, []);

  useEffect(() => {
    dispatch(scrollYActions.scrollY({ scrollYValue }));
  }, [scrollYValue]);

  return (
    <div>
      <Script
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ra1rvd631l&submodules=geocoder"
        strategy="beforeInteractive"
      />
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive" />
      {/* <Script src="validator.js" strategy="beforeInteractive" />
      <Script src="multifield.js" strategy="beforeInteractive" /> */}
      <ScrollTopArrow></ScrollTopArrow>      
      {/* <MenuLoginButton /> */}
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(TravelX);
