import React, { useEffect, useState } from "react";
import Link from 'next/link';
import * as userInfoActions from "../../../redux/store/modules/userInfo";
import { useSelector, useDispatch } from "react-redux";
import Style from '../../../styles/Component.module.css';
import { DeleteCookie } from './Utils/CookieUtil';
import { PUBLISHER_KAKAO, PUBLISHER_NAVER, PUBLISHER_TRAVELX } from "./LoginConstant";
import { CleanLoginInfoInLocalStorage } from "./Utils/LoginUtil";

const Login = () => {
  const redirectUri = useSelector(({ redirectUri }) => redirectUri.value);

  return (
    <Link
      href={{
        pathname: "/login",
        query: { redirectUri: redirectUri },
      }}
    >
      <a className={Style.LoginButton}  style={{ top: '6.0rem', right: '-1.6rem' }}>
        {"로그인"}
      </a>
    </Link>
  )
};

const Logout = () => {
  const dispatch = useDispatch();

  // 로그아웃
  const handleLogout = () => {
    const publisher = localStorage.getItem("pub");
  
    switch (publisher) {
      case PUBLISHER_KAKAO: {
        // 카카오로 로그인된 유저 로그아웃
        if (window.Kakao.Auth.getAccessToken()) {
          window.Kakao.Auth.logout(() => {});
        }
        break;
      }
      case PUBLISHER_NAVER: {
        break;
      }
      case PUBLISHER_TRAVELX: {
        break;
      }
      default:
        
    }
      
    DeleteCookie("RT");
    CleanLoginInfoInLocalStorage(publisher);
    dispatch(userInfoActions.setUserInfo({ accessToken: null, id: null, auth: false }));
      
  };

  // 연결 끊기 (회원 탈퇴)
  const handleUserOut = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.API.request({
        url: '/v1/user/unlink',
        success: (response) => {
          console.log(response);
          dispatch(userInfoActions.setUserInfo({ accessToken: null, id: null, auth: false }));
          DeleteCookie("RT");
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
      <button className={Style.LoginButton} onClick={handleLogout} style={{ top: '6.0rem', right: '-1.8rem' }}>
        {"로그아웃"}
      </button>
      {/* <button className={Style.LoginButton} onClick={handleUserOut} style={{ top: '4.0rem' }}>
        {"회원탈퇴"}
      </button> */}
    </>
  )
};

const MenuLoginButton = () => {
  const { auth } = useSelector((state) => state.userInfo.info);
  
  return (
    <>
      {!auth ? <Login /> : <Logout />}
    </>
  );
};

export default MenuLoginButton;
