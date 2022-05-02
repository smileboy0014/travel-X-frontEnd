import React, { useEffect, useState } from "react";
import Link from 'next/link';
import * as userInfoActions from "../../../redux/store/modules/userInfo";
import { useSelector, useDispatch } from "react-redux";
import Style from '../../../styles/Component.module.css';

const JAVASCRIPT_KEY = "742ec8d495dc81bf47a406b1b9b807ee";

const Login = () => {
  const redirectUri = useSelector(({ redirectUri }) => redirectUri.value);

  return (
    <Link
      href={{
        pathname: "/login",
        query: { redirectUri: redirectUri },
      }}
    >
      <a className={Style.LoginButton}>
        {"로그인"}
      </a>
    </Link>
  ) 
};

const Logout = () => {
  const dispatch = useDispatch();

  // 로그아웃
  const handleLogout = () => {
    // 카카오로 로그인된 유저 로그아웃
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(function() {
        dispatch(userInfoActions.setUserInfo({ accessToken: null, id: null }));
        localStorage.setItem("userInfo", JSON.stringify({ accessToken: null, id: null }));
      });
    }
    
  };

  // 연결 끊기 (회원 탈퇴)
  const handleUserOut = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.API.request({
        url: '/v1/user/unlink',
        success: (response) => {
          console.log(response);
          dispatch(userInfoActions.setUserInfo({ accessToken: null, id: null }));
          localStorage.setItem("userInfo", JSON.stringify({ accessToken: null, id: null }));
        },
        fail: (error) => {
          console.log(error);
          alert(error.msg);
        },
      });

      window.Kakao.Auth.setAccessToken(null);
    }
    
  };

  return (
    <>
      <button className={Style.LoginButton} onClick={handleLogout}>
        {"로그아웃"}
      </button>
      <button className={Style.LoginButton} onClick={handleUserOut} style={{ top: '4.0rem' }}>
        {"회원탈퇴"}
      </button>
    </>
  )
};

const MenuLoginButton = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.userInfo.info);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(JAVASCRIPT_KEY);
    }
    dispatch(userInfoActions.setUserInfo({
      accessToken: window.Kakao.Auth.getAccessToken()
    }));
  }, []);

  return (
    <>
      {!accessToken ? <Login /> : <Logout />}
    </>
  );
};

export default MenuLoginButton;
