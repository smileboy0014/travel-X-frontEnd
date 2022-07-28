import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as userInfoActions from "../redux/store/modules/userInfo";
import Style from '../styles/Login.module.css';
import axios from 'axios';
import validate from '../components/Button/Login/Utils/Validate';
import { PUBLISHER_KAKAO, PUBLISHER_NAVER, PUBLISHER_TRAVELX } from '../shared/js/CommonConstant';
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

    if (values.checkNickName && name == 'nickName') {
      setValues({ ...values, ['checkNickName']: false, [name]: value });
    } else if (values.checkVerifyPhone && name == 'phone') {
      setValues({ ...values, ['checkVerifyPhone']: false, [name]: value });
    } else {
      setValues({ ...values, [name]: value });
    }
    
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    const publisher = localStorage.getItem("pub");

    const formData = new FormData();
    formData.append('authPublisher', publisher ? publisher : "TRAVELX");
    formData.append('nickName', publisher ? id : values.nickName);
    formData.append('userId', publisher ? id : values.nickName);
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
  const [sendAuthNumber, setSendAuthNumber] = useState(false);
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { 
      nickName: "", 
      password: "", 
      passwordConfirm: "", 
      phone: "", 
      authNumber: "",
      agreeInfo: {}, 
      checkNickName: false, 
      checkVerifyPhone: false 
    },
    onSubmit: () => {
      setTab(4);
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
      case 'tab2':
        setTab(3);
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
      case 'tab3':
        setTab(2);
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

  const handleCheckNickName = () => {
    if (!values.nickName && values.nickName === "") {
      alert('닉네임을 입력해주십시오.');
      return;
    }

    const formData = new FormData();
    formData.append('nickName', values.nickName);

    axios({
      method: "POST",
      url: "http://shineware.iptime.org:8081/auth/user/checkNickName",
      data: formData,
    }).then((res) => {
      handleChange({ target: { name: 'checkNickName', value: true }});
      alert(res.data.message);
    }).catch((e) => {
      if (e.response.status == '409') {
        alert('중복된 닉네임입니다.');
      } else {
        console.error(e);
      }
    });
  };

  const handleSendAuthNo = () => {
    axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/auth/sms/send",
      params: { phoneNumber: values.phone.replaceAll('-', '') }
    }).then((res) => {
      alert('인증번호가 전송되었습니다.');
      setSendAuthNumber(true);
    }).catch((e) => {
      console.error(e);
    });
  };

  const handleVerifyAuthNo = () => {
    axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/auth/sms/verify",
      params: { phoneNumber: values.phone.replaceAll('-', ''), authNumber: values.authNumber }
    }).then((res) => {
      handleChange({ target: { name: 'checkVerifyPhone', value: true }});
    }).catch((e) => {
      console.error(e);
    });
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

  }, []);

  return (
    <div className="site">
      <div className="site-body">
        <div className={Style['login-form']}>
          <p>
          <Link href={{ pathname: "/" }}><a>홈</a></Link>
          </p>
          {!extRegister ? (
            <section className="form">
              <form onSubmit={handleSubmit} noValidate>
                <fieldset>
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
                        <label>닉네임</label>
                        <input 
                          name="nickName" 
                          className={Style['login-text']} 
                          value={values.nickName}
                          onChange={handleChange}
                          data-validate-length-range="6"
                          required="required"
                        />
                        {errors.nickName ? errors.nickName : null}
                      </div>
                      <div className={Style['login-button-container']}>
                        <button type='button' className={Style['signup']} onClick={handleCheckNickName} disabled={values.checkNickName}>중복체크</button>
                      </div>
                      <div className={Style['login-button-container']}>
                        <button className={Style['prevStep']} onClick={(e) => handlePrevButton('tab1', e)}>이전</button>
                      </div>
                      <div className={Style['login-button-container']}>
                        <button className={Style['signup']} onClick={(e) => handleNextButton('tab1', e)} disabled={!values.checkNickName}>다음</button>
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
                        <button className={Style['signup']} onClick={(e) => handleNextButton('tab2', e)} disabled={values.password.length == 0 || values.passwordConfirm.length == 0}>다음</button>
                      </div>
                    </div>
                  </div>
                  <div id="tab3" style={tab === 3 ? { display: 'block' } : { display: 'none' }}>
                    <div className="login-form">
                      <div className={Style['login-input-container']}>
                        <label>휴대폰 인증</label>
                        <input 
                          type="text" 
                          name="phone" 
                          required 
                          className={Style['login-text']} 
                          value={values.phone}
                          onChange={handleChange}  
                        />
                        {errors.phone ? errors.phone : null}
                      </div>
                      <div className={Style['login-button-container']}>
                        <button type='button' className={Style['signup']} onClick={handleSendAuthNo} disabled={values.phone.length == 0 || sendAuthNumber}>인증번호 전송</button>
                      </div>
                      <div style={{ display: sendAuthNumber ? 'block' : 'none' }}>
                        <div className={Style['login-input-container']}>
                          <label>인증번호</label>
                          <input 
                            type="text" 
                            name="authNumber" 
                            required 
                            className={Style['login-text']} 
                            value={values.authNumber}
                            onChange={handleChange}
                          />
                          {errors.authNumber ? errors.authNumber : null}
                        </div>
                        <div className={Style['login-button-container']}>
                          <button type='button' className={Style['signup']} onClick={handleVerifyAuthNo} disabled={values.checkVerifyPhone}>인증번호 확인</button>
                        </div>
                        {values.checkVerifyPhone ? '인증 완료' : '' }
                      </div>
                      <div className={Style['login-button-container']}>
                        <button className={Style['prevStep']} onClick={(e) => handlePrevButton('tab3', e)}>이전</button>
                      </div>
                      <div className={Style['login-button-container']}>
                        <button type="submit" className={Style['signup']} disabled={submitting || !values.checkVerifyPhone}>가입하기</button>
                      </div>
                    </div>
                  </div>
                  <div id="tab4" style={tab === 4 ? { display: 'block' } : { display: 'none' }}>
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
                </fieldset>
              </form>
            </section>
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