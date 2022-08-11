import { React, useEffect, useState, Component } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as userInfoActions from "../redux/store/modules/userInfo";
import * as spinnerActions from "../redux/store/modules/spinnerOn";
import Style from '../styles/Component.module.css';
import axios from 'axios';
import { PUBLISHER_KAKAO, PUBLISHER_NAVER, PUBLISHER_TRAVELX } from './../shared/js/CommonConstant';
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
  const { gender, nickName } = router.query;
	const { info } = useSelector((state) => state.userInfo);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
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
		gender: '',
		location: ''
  });

  const [extRegister, setExtRegister] = useState(false);

  function addZero(value) {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  }

  function FormattingDate(date) {
    const year = date.year;
    const month = addZero(date.month);
    const day = addZero(date.day);

    return `${year}-${month}-${day}`;
  }

  const handleBackClick = () => {
    if (step == 1 || step == 6 || step == 7) {
      router.back();
      return;
    }

    if (extRegister) {
      router.push('/login');
    } else {
      setStep(--step);
    }
  };

  const requestSignUp = async () => {
    let result = {
      success: false,
      message: ''
    };

    const formData = new FormData();

    if (!extRegister) {
      formData.append('authPublisher', PUBLISHER_TRAVELX);
      formData.append('userId', emailValues.email);
      formData.append('password', passwdValues.passwd);
    } else {
      formData.append('authPublisher', info.pub);
      formData.append('userId', info.id);
    }

    formData.append('nickName', nicknameValues.nickName);

    try {
      setLoading(true);
      const registerResponse = await axios.post("http://shineware.iptime.org:8081/auth/user/register", formData);
      // console.log(registerResponse);

      result.success = true;
      return result;

    } catch (e) {
      if (e.response.status == '409') {
        if (!extRegister) result.message = '이미 가입된 이메일입니다.';
        else result.message = '이미 가입된 계정입니다.';

      } else {
        result.message = '회원가입 중 에러가 발생하였습니다.';
      }
      console.error(e);
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  const requestAddExtraInfo = async () => {
    let result = {
      success: false,
      message: ''
    };
    const extraFormData = new FormData();

    if (!extRegister) {
      extraFormData.append('authPublisher', PUBLISHER_TRAVELX);
      extraFormData.append('userId', emailValues.email);
      extraFormData.append('password', passwdValues.passwd);
      extraFormData.append('phoneNumber', phoneAuthValues.verifiedPhoneNumber);
      
    } else {
      extraFormData.append('authPublisher', info.pub);
      extraFormData.append('userId', info.id);
      // extraFormData.append('phoneNumber', phoneAuthValues.verifiedPhoneNumber);
    }

    extraFormData.append('nickName', nicknameValues.nickName);
    extraFormData.append('birthday', FormattingDate(extraValues.birthday));
    if (extraValues.gender) extraFormData.append('gender', extraValues.gender);
    if (extraValues.location) extraFormData.append('location', extraValues.location);

    try {
      const addExtraInfoResponse = await axios.post("http://shineware.iptime.org:8081/auth/user/addExtraInfo", extraFormData);
      // console.log(addExtraInfoResponse);
      result.success = true;

      return result;
    } catch (e) {
      result.message = '추가정보 저장 중 에러가 발생하였습니다.';
      console.error(e);
      
      return result;
    }

  };

  useEffect(() => {
    const authPublisher = info.pub;
    switch (authPublisher) {
      case PUBLISHER_KAKAO: {
        if (window.Kakao.Auth.getAccessToken()) {
          setStep(5);
          setExtRegister(true);
        } else {
          router.push('/login');
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

    setLoading(false);
  }, []);

  useEffect(() => {
    dispatch(spinnerActions.setState(loading));
  }, [loading]);

  useEffect(() => {
    // console.log(agreeValues);
    // console.log(phoneAuthValues);
    // console.log(emailValues);
    // console.log(passwdValues);
    // console.log(passwdValidateValues);
    // console.log(extraValues);
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
        <SignUpStep5 setStep={setStep} setNicknameValues={setNicknameValues} initValues={nicknameValues} callback={requestSignUp} nickName={nickName} />
      ) : null}
      {step == 6 ? (
        <SignUpStepExtraInfo setStep={setStep} setExtraValues={setExtraValues} initValues={extraValues} callback={requestAddExtraInfo} gender={gender} />
      ) : null}
      {step == 7 ? (
        <SignUpStepEnd />
      ) : null}
    </div>
  )
}

export default SignUp;