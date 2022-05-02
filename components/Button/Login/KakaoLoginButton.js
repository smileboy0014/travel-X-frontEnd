import React, { useEffect, useState } from "react";
import Link from 'next/link';
import * as userInfoActions from "../../../redux/store/modules/userInfo";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Style from '../../../styles/Component.module.css';

const JAVASCRIPT_KEY = "742ec8d495dc81bf47a406b1b9b807ee";

const KakaoLoginButton = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loginCallback } = props;
  // const scope = "profile, age_range";
  const scope = "";

  const handleKakaoLogin = () => {
    // 1. 인가 코드 요청 / 토큰 발급
    window.Kakao.Auth.login({
      scope,
      success: (loginResponse) => {
        window.Kakao.Auth.setAccessToken(loginResponse.access_token);
        console.debug(`Kakao_Access_Token: ${loginResponse.access_token}`);

        // 2. 사용자 정보 가져오기 (Kakao 데이터베이스에 등록되어있는 UserID)
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (userResponse) => {
            console.debug(`Kakao_User_ID: ${userResponse.id}`);

            loginCallback('KAKAO', userResponse.id, loginResponse.access_token);
          },
          fail: (userInfoError) => {
            console.error(userInfoError);
          }
        });
      },
      fail: (loginError) => {
        console.error(loginError);
      }
    });
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(JAVASCRIPT_KEY);
    }

    if (window.Kakao.Auth.getAccessToken()) {
      const params = new URLSearchParams(location.search);
      const curRedirectUri = params.get('redirectUri');
      dispatch(userInfoActions.setUserInfo({
        accessToken: window.Kakao.Auth.getAccessToken()
      }));
      router.push(curRedirectUri ? curRedirectUri : '/');
    }


    return () => {
      window.Kakao.cleanup();
    }
  }, []);

  useEffect(() => {
  }, []);

  return (
    <button onClick={handleKakaoLogin}>
      <img
        src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
      />
    </button>
  );
};

export default KakaoLoginButton;
