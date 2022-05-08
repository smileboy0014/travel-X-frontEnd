import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import * as userInfoActions from "../redux/store/modules/userInfo";
import Style from '../styles/Login.module.css';
import { LoginByTravelXUserToTravelXServer } from '../components/Button/Login/Utils/LoginUtil';
import KakaoLoginButton from '../components/Button/Login/KakaoLoginButton';
import { PUBLISHER_TRAVELX } from '../components/Button/Login/LoginConstant';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleTravelXLogin = async (e) => {
    e.preventDefault();

    if (values.email && values.password) {
      const result = await LoginByTravelXUserToTravelXServer(values.email, values.password);

      dispatch(userInfoActions.setUserInfo({ pub: PUBLISHER_TRAVELX, id: result.userId, auth: true }));

      const params = new URLSearchParams(location.search);
      const curRedirectUri = params.get('redirectUri');

      router.push(curRedirectUri ? curRedirectUri : '/');
    } else {
      alert('로그인 정보를 입력해주십시오.');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    router.push('/signup');
  };

  useEffect(() => {
    const authPublisher = localStorage.getItem("pub");

    // routeStart 이벤트 함수로 로그인 체크하므로 여기선 pub 값만 확인
    if (authPublisher) {
      const params = new URLSearchParams(location.search);
      const curRedirectUri = params.get('redirectUri');

      router.push(curRedirectUri ? curRedirectUri : '/');
    }
  }, []);

  return (
    <div className="site">
      <div className="site-body">
        <div className={Style['login-form']}>
          <div className={Style['login-title']}>로그인</div>
          <div className="login-form">
            <form onSubmit={handleTravelXLogin}>
              <div className={Style['login-input-container']}>
                <label>이메일</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className={Style['login-text']} 
                  value={values.email}
                  onChange={handleChange}  
                />
                {/* {renderErrorMessage("uname")} */}
              </div>
              <div className={Style['login-input-container']}>
                <label>비밀번호</label>
                <input 
                  type="password" 
                  name="password" 
                  required 
                  className={Style['login-text']} 
                  value={values.password}
                  onChange={handleChange}  
                />
              </div>
              <div className={Style['login-button-container']}>
                <button type="submit" className={Style['login-submit']}>로그인</button>
                <button className={Style['signup']} onClick={handleSignUp}>회원가입</button>
              </div>
            </form>
          </div>
          
          <KakaoLoginButton />
        </div>
      </div>
    </div>
  )
}

export default Login;