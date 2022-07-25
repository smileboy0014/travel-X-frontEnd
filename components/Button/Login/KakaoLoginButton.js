import React, { useEffect, useState } from "react";
import axios from 'axios';
import Style from '../../../styles/Component.module.css';
import * as userInfoActions from "../../../redux/store/modules/userInfo";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { LoginToTravelXServer, SetLoginInfoToLocalStorage } from "./Utils/LoginUtil";
import { PUBLISHER_KAKAO, RESPONSE_STATUS_NOT_FOUND, REST_API_KEY } from "./LoginConstant";
import { SetCookie } from './Utils/CookieUtil';
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const REDIRECT_URI = 'http://localhost:3000/login/callback'
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KakaoLoginButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // const scope = "profile, age_range";
  const scope = "";

  const handleKakaoLogin = (e) => {
    e.preventDefault();
    // 1. 인가 코드 요청 / 토큰 발급
    
    window.Kakao.Auth.login({
      scope,
      success: (loginResponse) => {
        window.Kakao.Auth.setAccessToken(loginResponse.access_token);
        SetCookie("RT", loginResponse.refresh_token, '/', loginResponse.refresh_token_expires_in);
        SetLoginInfoToLocalStorage(PUBLISHER_KAKAO);
        // console.debug(`Kakao_Login_Response`, loginResponse);

        // 2. 사용자 정보 가져오기 (Kakao 데이터베이스에 등록되어있는 UserID)
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: async (userResponse) => {
            // console.debug(`Kakao_User_ID: ${userResponse.id}`);
            const result = await LoginToTravelXServer(PUBLISHER_KAKAO, userResponse.id);
            
            // const result = await LoginToTravelXServer(PUBLISHER_KAKAO, 'kakao_test_user_id_13');
            // console.log(result);

            if (result.auth) {
              console.debug(`KakaoUserId: ${userResponse.id}`);
              // 이름 정보 필요해서 넣어 줌 by gtpark
              // console.log(result);
              // debugger;
              dispatch(userInfoActions.setUserInfo({ 
                pub: PUBLISHER_KAKAO, 
                id: userResponse.id, 
                auth: true, 
                nickName: result.nickName, 
                userExtraInfo: result.userExtraInfo
              }));

              const params = new URLSearchParams(location.search);
              const curRedirectUri = params.get('redirectUri');

              router.push(curRedirectUri ? curRedirectUri : '/');
            } else if (result.status == RESPONSE_STATUS_NOT_FOUND) {
              dispatch(userInfoActions.setUserInfo({ pub: PUBLISHER_KAKAO, id: userResponse.id }));

              // dispatch(userInfoActions.setUserInfo({ pub: PUBLISHER_KAKAO, id: 'kakao_test_user_id_13' }));
              router.push('/signup?' + new URLSearchParams({
                gender: userResponse.kakao_account.gender ? userResponse.kakao_account.gender : '',
                nickName: userResponse.kakao_account.profile ? userResponse.kakao_account.profile.nickname : ''
              }).toString());

            }
            
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
  }, []);

  return (
    <a href="#;" className={cx("LoginMainList-link", "ico-Kakao")} onClick={handleKakaoLogin}><span className={"ab-text"}>kakaotalk</span></a>
  );
};

export default KakaoLoginButton;
