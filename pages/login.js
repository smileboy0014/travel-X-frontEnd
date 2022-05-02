import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import * as userInfoActions from "../redux/store/modules/userInfo";
import Style from '../styles/Login.module.css';
import axios from 'axios';
import KakaoLoginButton from '../components/Button/Login/KakaoLoginButton';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { redirectUri } = router.query;

  const setAccessTokenToLocalStroage = (accessToken, userId) => {
    let userInfo = localStorage.getItem('userInfo');
    console.log(userInfo);
    if (userInfo == null) {
      userInfo = { accessToken: accessToken, userId: userId }
    } else {
      userInfo = JSON.parse(userInfo);
      userInfo.accessToken = accessToken;
      userInfo.userId = userId;
    }
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }

  const travelXLogin = (publisher, userId, accessToken) => {
    axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/auth/user/get",
      params: {
        authPublisher: publisher,
        userId: userId
      },
    }).then((res) => {
      console.log(res);
      dispatch(
        userInfoActions.setUserInfo({ 
          accessToken: accessToken, 
          id: userId
        })
      );
      setAccessTokenToLocalStroage(accessToken);
      router.push(redirectUri);
    }).catch((e) => {
      console.log(e);
      // 유저 정보 없음 경우. 회원가입 요청
      try {
        if (e.response.status == '404') {
          travelXRegister(publisher, userId);
        }
      } catch(registerError) {
        console.error(registerError);
      }
    });
  };

  const travelXRegister = (publisher, userId) => {
    axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/auth/user/register",
      params: {
        authPublisher: publisher,
        userId: userId
      },
    }).then((res) => {
      console.log(res);
      travelXLogin(publisher, userId);
    }).catch((e) => {
      if (e.response.status == '409') {
        alert('이미 등록된 사용자입니다.');
      } else {
        console.error(e);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="site">
      <div className="site-body">
        <div className={Style['login-form']}>
          <div className={Style['login-title']}>로그인</div>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className={Style['login-input-container']}>
                <label>E-mail</label>
                <input type="text" required className={Style['login-text']} />
                {/* {renderErrorMessage("uname")} */}
              </div>
              <div className={Style['login-input-container']}>
                <label>비밀번호</label>
                <input type="password" required className={Style['login-text']} />
                {/* {renderErrorMessage("pass")} */}
              </div>
              <div className={Style['login-button-container']}>
                <input type="submit" className={Style['login-submit']} />
              </div>
            </form>
          </div>
          
          <KakaoLoginButton loginCallback={travelXLogin} />
        </div>
      </div>
    </div>
  )
}

export default Login;