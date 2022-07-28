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
import { JAVASCRIPT_KEY } from '../components/Button/Login/LoginConstant';
import { CheckLogin } from './../components/Button/Login/Utils/LoginUtil';

function TravelX({ Component, pageProps }) {
  const [scrollYValue, setScrollYVlue] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const [urlFilter, setUrlFilter] = useState(['/signup'])

  const listener = () => {
    setScrollYVlue(document.body.scrollTop);
  };

  const handleRouteChange = async (url) => {
    // console.log();
    dispatch(redirectUriActions.setRedirectUri(url));
    
    let originUrl = "";
    if (url) {
      originUrl = url.split(/[?#]/)[0];
    }

    if (!urlFilter.includes(originUrl)) {
      const authPublisher = localStorage.getItem("pub");
      
      if (authPublisher) {
        let checkLogin = await CheckLogin(authPublisher);
        
        if (checkLogin.auth) {
          dispatch(userInfoActions.setUserInfo({ 
            pub: authPublisher, 
            id: checkLogin.id, 
            auth: true, 
            nickName: checkLogin.nickName,
            userExtraInfo: checkLogin.userExtraInfo 
          }));
        } else {
          localStorage.removeItem("pub");
          localStorage.removeItem("tx");
          dispatch(userInfoActions.setUserInfo({ pub: null, id: null, auth: false, nickName: null, userExtraInfo: {} }));
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
      <ScrollTopArrow></ScrollTopArrow>
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(TravelX);
