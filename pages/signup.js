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

const cx = classNames.bind(Style);

export const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [step, setStep] = useState(5);
  const [agreeValues, setAgreeValues] = useState({
    agreeAge: false,
    agreeService: false,
    agreePrivacy: false,
    agreeMarketing: false
  });
  const [phoneAuthValues, setPhoneAuthValues] = useState({
    phone: '',
    authNo: '',
    phoneVerified: false
  });
  const [extRegister, setExtRegister] = useState(false);


  const handleBackClick = () => {
    if (step == 1 || step == 6) {
      router.back();
      return;
    }

    setStep(--step);
  };

  useEffect(() => {
    const authPublisher = localStorage.getItem("pub");

    switch (authPublisher) {
      case PUBLISHER_KAKAO: {
        if (window.Kakao.Auth.getAccessToken()) {
          setStep(2);
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
          </div>
        </div>
      </div>
      {step == 1 ? (
        <SignUpStep1 setStep={setStep} setAgreeValues={setAgreeValues} />
      ) : null}
      {step == 2 ? (
        <SignUpStep2 setStep={setStep} setPhoneAuthValues={setPhoneAuthValues} />
      ) : null}
      {step == 3 ? (
        <SignUpStep3 setStep={setStep}  />
      ) : null}
      {step == 4 ? (
        <SignUpStep4 setStep={setStep}  />
      ) : null}
      {step == 5 ? (
        <SignUpStepExtraInfo setStep={setStep}  />
      ) : null}
      {step == 6 ? (
        <SignUpStepEnd />
      ) : null}
    </div>
  )
}

export default SignUp;