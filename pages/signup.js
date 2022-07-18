import { React, useEffect, useState, Component } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as userInfoActions from "../redux/store/modules/userInfo";
import Style from '../styles/Component.module.css';
import axios from 'axios';
import { PUBLISHER_KAKAO, PUBLISHER_NAVER, PUBLISHER_TRAVELX } from './../components/Button/Login/LoginConstant';
import SignUpStep1 from '../components/Signup/SignUpStep1';
import SignUpStep2 from '../components/Signup/SignUpStep2';
import SignUpStep3 from '../components/Signup/SignUpStep3';
import SignUpStep4 from '../components/Signup/SignUpStep4';
import SignUpStepExtraInfo from '../components/Signup/SignUpStepExtraInfo';
import SignUpStepEnd from '../components/Signup/SignUpStepEnd';
import classNames from 'classnames/bind';
import SignUpStep5 from './../components/Signup/SignUpStep5';

const cx = classNames.bind(Style);

export const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [agreeValues, setAgreeValues] = useState({
    agreeAge: false,
    agreeService: false,
    agreePrivacy: false,
    agreeMarketing: false,
    agreeAll: false
  });
  const [phoneAuthValues, setPhoneAuthValues] = useState({
    phone: '',
    verifiedPhoneNumber: '',
    isPhoneVerified: false
  });
  const [emailValues, setEmailValues] = useState({
    email: ''
  });
  const [passwdValues, setPasswdValues] = useState({
    passwd: '',
    confirmPasswd: ''
  });
  const [passwdValidateValues, setPasswdValidateValues] = useState({
    eng: false,
    num: false,
    spcl: false,
    length: false,
    equal: false,
    validateAll: false
  });
  const [nicknameValues, setNicknameValues] = useState({
    nickName: ''
  });
  const [extraValues, setExtraValues] = useState({
    // nickName: '',
		birthday: {
			year: '',
			month: '',
			day: ''
		},
		sex: '',
		address: ''
  });

  const [extRegister, setExtRegister] = useState(false);


  const handleBackClick = () => {
    if (step == 1 || step == 6 || step == 7) {
      router.back();
      return;
    }

    setStep(--step);
  };

  const requestSignUp = async () => {
    let result = {
      success: false
    }
    if (!extRegister) {
      const formData = new FormData();
      formData.append('authPublisher', PUBLISHER_TRAVELX);
      formData.append('nickName', nicknameValues.nickName);
      formData.append('password', passwdValues.passwd);
  
      axios({
        method: "POST",
        url: "http://shineware.iptime.org:8081/auth/user/register",
        data: formData,
      }).then((res) => {
        result.success = true;
      }).catch((e) => {
        alert('회원가입 중 에러가 발생하였습니다.');
        console.error(e);
      }).finally(() => {        
        return result;
      })
    };
  };

  const requestExtraInfoAdd = async () => {
    const extraFormData = new FormData();
    extraFormData.append('nickName', values.nickName);

    axios({
      method: "POST",
      url: "http://shineware.iptime.org:8081/auth/user/addExtraInfo",
      data: extraFormData,
    }).then((res) => {
			
    }).catch((e) => {
			alert('추가정보 저장 중 에러가 발생하였습니다.');
			console.error(e);
    });
    
  };

  useEffect(() => {
    const authPublisher = localStorage.getItem("pub");

    switch (authPublisher) {
      case PUBLISHER_KAKAO: {
        if (window.Kakao.Auth.getAccessToken()) {
          setStep(5);
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

  useEffect(() => {
    console.log(agreeValues);
    console.log(phoneAuthValues);
    console.log(emailValues);
    console.log(passwdValues);
    console.log(passwdValidateValues);
    console.log(extraValues);
  }, [step]);

  return (
    <div className="site">
      <div className={cx("site-header", "Step-Header")}>
        <div className="site-container">
          <div className={Style["Header-inner"]}>
            <a href="#;" className={Style["HeaderBack"]} onClick={handleBackClick}><span className="ab-text">Back</span></a>
            <div className={Style["HeaderTitle"]}>회원가입</div>
          </div>
          <div className={cx("StepBar", "col-6")}>
            <span className={step > 0 ? cx("StepBar-item", "is-Active") : Style["StepBar-item"]}></span>
            <span className={step > 1 ? cx("StepBar-item", "is-Active") : Style["StepBar-item"]}></span>
            <span className={step > 2 ? cx("StepBar-item", "is-Active") : Style["StepBar-item"]}></span>
            <span className={step > 3 ? cx("StepBar-item", "is-Active") : Style["StepBar-item"]}></span>
            <span className={step > 4 ? cx("StepBar-item", "is-Active") : Style["StepBar-item"]}></span>
            <span className={step > 5 ? cx("StepBar-item", "is-Active") : Style["StepBar-item"]}></span>
            <span className={step > 6 ? cx("StepBar-item", "is-Active") : Style["StepBar-item"]}></span>
          </div>
        </div>
      </div>
      {step == 1 ? (
        <SignUpStep1 setStep={setStep} setAgreeValues={setAgreeValues} initValues={agreeValues} />
      ) : null}
      {step == 2 ? (
        <SignUpStep2 setStep={setStep} setPhoneAuthValues={setPhoneAuthValues} initValues={phoneAuthValues} />
      ) : null}
      {step == 3 ? (
        <SignUpStep3 setStep={setStep} setEmailValues={setEmailValues} initValues={emailValues} />
      ) : null}
      {step == 4 ? (
        <SignUpStep4 setStep={setStep} setPasswdValues={setPasswdValues} setPasswdValidateValues={setPasswdValidateValues} initValues={passwdValues} initValidateValues={passwdValidateValues} />
      ) : null}
      {step == 5 ? (
        <SignUpStep5 setStep={setStep} setNicknameValues={setNicknameValues} initValues={nicknameValues} callback={requestSignUp} />
      ) : null}
      {step == 6 ? (
        <SignUpStepExtraInfo setStep={setStep} setExtraValues={setExtraValues} initValues={extraValues} callback={requestExtraInfoAdd} />
      ) : null}
      {step == 7 ? (
        <SignUpStepEnd />
      ) : null}
    </div>
  )
}

export default SignUp;