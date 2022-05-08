import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as userInfoActions from "../redux/store/modules/userInfo";
import Style from '../styles/Login.module.css';
import axios from 'axios';
import validate from './../components/Button/Login/Utils/Validate';
import { PUBLISHER_KAKAO, PUBLISHER_NAVER, PUBLISHER_TRAVELX } from './../components/Button/Login/LoginConstant';
import Link from 'next/link';

const useForm = ({ initialValues, onSubmit, validate }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { id } = useSelector((state) => state.userInfo.info);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    const publisher = localStorage.getItem("pub");

    const formData = new FormData();
    formData.append('authPublisher', publisher ? publisher : "TRAVELX");
    formData.append('userId', publisher ? id : values.email);
    formData.append('password', publisher ? null : values.password);

    axios({
      method: "POST",
      url: "http://shineware.iptime.org:8081/auth/user/register",
      data: formData,
    }).then((res) => {
      dispatch(userInfoActions.setUserInfo({ pub: res.authPublisher, id: res.userId, auth: true }));
      onSubmit();
    }).catch((e) => {
      if (e.response.status == '409') {
        alert('이미 등록된 사용자입니다.');
      } else {
        console.error(e);
      }
    });

  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        onSubmit(values);
      }
      setSubmitting(false);
    }
  }, [errors]);

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit
  };
}

export const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [extRegister, setExtRegister] = useState(false);
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { email: "", password: "", passwordConfirm: "", agreeInfo: {} },
    onSubmit: () => {
      setTab(3);
    },
    validate,
  });

  const handleNextButton = (tab, e) => {
    e.preventDefault();

    switch(tab) {
      case 'tab0':
        setTab(1);
        break;
      case 'tab1':
        setTab(2);
        break;
    }
  };

  const handlePrevButton = (tab, e) => {
    e.preventDefault();

    switch(tab) {
      case 'tab1':
        setTab(0);
        break;
      case 'tab2':
        setTab(1);
        break;
    }
  };

  const handleExtraInfoButton = (e) => {
    e.preventDefault();

    router.push('/extraInfo');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  useEffect(() => {
    const authPublisher = localStorage.getItem("pub");

    switch (authPublisher) {
      case PUBLISHER_KAKAO: {
        if (window.Kakao.Auth.getAccessToken()) {
          setTab(2);
          setExtRegister(true);
        }

        break;
      }
      case PUBLISHER_NAVER: {
        // TODO: 로그인 실패 팝업
        break;
      }
      case PUBLISHER_TRAVELX: {
        // TODO: 로그인 실패 팝업
        break;
      }
      default:
        // TODO: 로그인 실패 팝업
    }

    // if (authPublisher) {
    //   const params = new URLSearchParams(location.search);
    //   const curRedirectUri = params.get('redirectUri');

    //   router.push(curRedirectUri ? curRedirectUri : '/');
    // }
  }, []);

  return (
    <div className="site">
      <div className="site-body">
        <div className={Style['login-form']}>
          <p>
          <Link href={{ pathname: "/" }}><a>홈</a></Link>
          </p>
          {!extRegister ? (
            <form onSubmit={handleSubmit} noValidate>
              {tab+1} 단계
              <div className={Style['login-title']}>회원가입</div>
              <div id="tab0" style={tab === 0 ? { display: 'block' } : { display: 'none' }}>
                <div className="login-form">
                  <div className={Style['login-button-container']}>
                    <button className={Style['signup']} onClick={(e) => handleNextButton('tab0', e)}>동의하고 가입하기</button>
                  </div>
                </div>
              </div>
              <div id="tab1" style={tab === 1 ? { display: 'block' } : { display: 'none' }}>
                <div className="login-form">
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
                    {errors.email ? errors.email : null}
                  </div>
                  <div className={Style['login-button-container']}>
                    <button className={Style['prevStep']} onClick={(e) => handlePrevButton('tab1', e)}>이전</button>
                  </div>
                  <div className={Style['login-button-container']}>
                    <button className={Style['signup']} onClick={(e) => handleNextButton('tab1', e)}>다음</button>
                  </div>
                </div>
              </div>
              <div id="tab2" style={tab === 2 ? { display: 'block' } : { display: 'none' }}>
                <div className="login-form">
                  <div className={Style['login-input-container']}>
                    <label>비밀번호 입력</label>
                    <input 
                      type="password" 
                      name="password" 
                      required 
                      className={Style['login-text']} 
                      value={values.password}
                      onChange={handleChange}  
                    />
                    {errors.password ? errors.password : null}
                    <label>비밀번호 확인</label>
                    <input 
                      type="password" 
                      name="passwordConfirm" 
                      required 
                      className={Style['login-text']} 
                      value={values.passwordConfirm}
                      onChange={handleChange}  
                    />
                    {errors.passwordConfirm ? errors.passwordConfirm : null}
                  </div>
                  <div className={Style['login-button-container']}>
                    <button className={Style['prevStep']} onClick={(e) => handlePrevButton('tab2', e)}>이전</button>
                  </div>
                  <div className={Style['login-button-container']}>
                    <button type="submit" className={Style['signup']} disabled={submitting}>회원가입</button>
                  </div>
                </div>
              </div>
              <div id="tab3" style={tab === 3 ? { display: 'block' } : { display: 'none' }}>
                <div className="login-form">
                  회원가입 완료
                  <div className={Style['login-button-container']}>
                    <button className={Style['signup']} onClick={handleGoHome}>홈으로</button>
                  </div>
                  <div className={Style['login-button-container']}>
                    <button className={Style['signup']} onClick={handleExtraInfoButton}>추가정보 입력하기</button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className={Style['login-title']}>회원가입</div>
              <div id="tab2" style={tab === 2 ? { display: 'block' } : { display: 'none' }}>
                <div className="login-form">
                  <div className={Style['login-button-container']}>
                    <button type="submit" className={Style['signup']} disabled={submitting}>회원가입</button>
                  </div>
                </div>
              </div>
              <div id="tab3" style={tab === 3 ? { display: 'block' } : { display: 'none' }}>
                <div className="login-form">
                  회원가입 완료
                  <div className={Style['login-button-container']}>
                    <button className={Style['signup']} onClick={handleGoHome}>홈으로</button>
                  </div>
                  <div className={Style['login-button-container']}>
                    <button className={Style['signup']} onClick={handleExtraInfoButton}>추가정보 입력하기</button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUp;