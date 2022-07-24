import { React, useEffect, useState } from 'react';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(Style);
const AUTH_NO_EXPIRE_TIME = 3; // 인증번호 만료 시간 (분)

const SignUpStep2 = ({ setStep, setPhoneAuthValues, initValues }) => {

  const [values, setValues] = useState({
    phone: '',
    authNo: '',
    verifiedPhoneNumber: '',
    isPhoneVerified: false
  });

  const [sendAuthNo, setSendAuthNo] = useState(false);
  const [sendAuthNoAlert, setSendAuthNoAlert] = useState(false);

  const [authNoTime, setAuthNoTime] = useState(null);
  const [authNoTimer, setAuthNoTimer] = useState(null);
  const [showAuthNoTimer, setShowAuthNoTimer] = useState(false);
  const [authNoAlertTimer, setAuthNoAlertTimer] = useState(null);

  const [phoneVerified, setPhoneVerified] = useState(false);
  const [expireTime, setExpireTime] = useState(null);
  const [disableSendAuthNo, setDisableSendAuthNo] = useState(false);

  const formattedTime = () => {
    let m = Math.floor(authNoTime / 60).toString();
    let s = (authNoTime % 60).toString();
    if (s.length === 1) s = `0${s}`
    
    return `${m}:${s}`;
  }

  const handleNextStep = (e) => {
    e.preventDefault();

    setPhoneAuthValues({...values});
    setStep(3);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value});
  };

  const handleSendAuthNo = (e) => {
    e.preventDefault();

    axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/auth/sms/send",
      params: { phoneNumber: values.phone }
    }).then((res) => {
      setSendAuthNo(true);

      // 인증번호 전송 알림 타이머 초기화 후 시작
      clearTimeout(authNoAlertTimer);
      setSendAuthNoAlert(true);
      const alertTimer = setTimeout(() => {
        setSendAuthNoAlert(false);
      }, 2500);
      setAuthNoAlertTimer(alertTimer);

      // 인증번호 타이머 시작
      const time = new Date();
      time.setMinutes(time.getMinutes() + AUTH_NO_EXPIRE_TIME);
      time.setSeconds(time.getSeconds() + 2);
      setExpireTime(time);
      setDisableSendAuthNo(true); // 인증번호 받기 버튼 비활성화
      
      setPhoneVerified(false); // 인증 취소
      
      handleChange({ target: { name: "verifiedPhoneNumber", value: values.phone } });
    }).catch((e) => {
      console.error(e);
      handleChange({ target: { name: "verifiedPhoneNumber", value: '' } });
    });
  };

  const handleVerifyAuthNo = (e) => {
    e.preventDefault();

    axios({
      method: "GET",
      url: "http://shineware.iptime.org:8081/auth/sms/verify",
      params: { phoneNumber: values.phone, authNumber: values.authNo }
    }).then((res) => {
      setPhoneVerified(true);
    }).catch((e) => {
      if (e.response.status == '406') {
        alert(e.response.data.message);
      } else {
        alert('인증 번호 확인 중 에러가 발생하였습니다.');
      }
      console.error(e);
    });
  };

  useEffect(() => {
    // 만료시간 갱신 후 타이머 시작
    if (expireTime) {
      clearInterval(authNoTimer);
      setShowAuthNoTimer(true);
      const counter = setInterval(() => {
        const gap = Math.floor(new Date(expireTime.getTime() - new Date().getTime()) / 1000);
        setAuthNoTime(gap > 0 ? gap : 0);
        if (gap < 175) {
          setDisableSendAuthNo(false);
        }
      }, 1000);
  
      setAuthNoTimer(counter);
    }
  }, [expireTime]);

  useEffect(() => {
    if (authNoTime < 0) {
      // console.log("timer 리소스 해제 완료")
      clearInterval(authNoTimer);
    }
  }, [authNoTime]);

  useEffect(() => {    
    setSendAuthNo(false);
    setPhoneVerified(false);
    setDisableSendAuthNo(false);
    if (authNoTimer) clearInterval(authNoTimer);
    if (authNoAlertTimer) clearTimeout(authNoAlertTimer);
  }, [values.phone])

  useEffect(() => {
    setValues({...values, ...initValues});

    return () => {
      setShowAuthNoTimer(false);
      if (authNoTimer) clearInterval(authNoTimer);
      if (authNoAlertTimer) clearTimeout(authNoAlertTimer);
    }
  }, []);

  return (
    <div className="site-body">
      {/* <!-- 컨텐츠 시작 --> */}
      <div className={Style["StepPage"]}>
        <div className="site-container">
          {/* <!-- StepPageHeader --> */}
          <div className={Style["StepPageHeader"]}>
            <h2 className={Style["StepPageHeader-title"]}>휴대전화로 <br />본인인증을 해주세요.</h2>
          </div>
          {/* <!-- .StepPageHeader --> */}
          {/* <!-- MemberForm --> */}
          <div className={Style["MemberForm"]}>
              {/* <!-- 인증번호 전송.Item --> */}
              <div className={values.phone.length > 0 && !disableSendAuthNo ? cx("MemberFormItem", "is-Active") : Style["MemberFormItem"]}>
                <dl className={Style["MemberFormItem-inner"]}>
                  <dt className={Style["MemberFormItemTitle"]}>휴대전화 번호</dt>
                  <dd className={Style["MemberFormItemCont"]}>
                    <div className={Style["MemberFormItemBtn"]}>
                      <div className={Style["MemberFormReg"]}>
                        <input 
                          type="number" 
                          className={Style["MemberFormReg-input"]} 
                          placeholder="‘-’ 빼고 입력"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <button type="button" className={Style["MemberFormReg-btn"]} onClick={handleSendAuthNo} disabled={disableSendAuthNo || values.phone.length == 0}>{sendAuthNo ? '재요청' : '인증번호 받기'}</button>
                    </div>
                  </dd>
                </dl>
              </div>
              {/* <!-- 인증번호 전송.Item --> */}
              {sendAuthNo ? (
              // <!-- 인증번호 입력 Item -->
                <div className={values.authNo.length > 0 && !phoneVerified ? cx("MemberFormItem", "is-Active") : Style["MemberFormItem"]}>
                  <dl className={Style["MemberFormItem-inner"]}>
                    <dt className={Style["MemberFormItemTitle"]}>인증번호 4자리</dt>
                    <dd className={Style["MemberFormItemCont"]}>
                      <div className={Style["MemberFormItemBtn"]}>
                        <div className={Style["MemberFormReg"]}>
                          <input 
                            type="number" 
                            className={Style["MemberFormReg-input"]} 
                            placeholder="1234"
                            name="authNo"
                            value={values.authNo}
                            onChange={handleChange} 
                          />
                        </div>
                        <button type="button" className={Style["MemberFormReg-btn"]} onClick={handleVerifyAuthNo}>확인</button>
                      </div>
                    </dd>
                    {!phoneVerified && showAuthNoTimer ? <div className={Style["Message-time"]}>남은 시간 {formattedTime()}</div> : null}
                  </dl>
                </div>
              // <!-- 인증번호 입력.Item -->
              ) : null}
          </div>
          {/* <!-- .MemberForm --> */}
          {/* <!-- MessageInfo --> */}
					<div className={Style["MessageInfo"]}>
						<div className={Style["MessageInfo-title"]}>인증번호를 받지 못하셨나요?</div>
						<p className={Style["MessageInfo-text"]}>인증번호는 문자메세지로 발송되며, 수신하지 못했다면 차단된 메세지를 확인해주세요. </p>
					</div>
					{/* <!-- .MessageInfo --> */}
          {/* <!-- .Body --> */}
        </div>
        {/* <!-- SendAlert --> */}
        {sendAuthNoAlert ? <div className={Style["SendAlert"]}>인증번호가 전송되었습니다.</div> : null}
				{/* <!-- .SendAlert --> */}
        {/* <!-- BttonFixButton --> */}
        <div className={cx("BttonFixButton", "no-Scroll")}>
          <div className={"site-container"}>
            {/* {!sendAuthNo ? (
              <button 
                type="button" 
                className={values.phone.length < 9 ? cx("BttonFixButton-button", "is-disable") : Style["BttonFixButton-button"]}
                onClick={handleSendAuthNo}
              >인증번호 받기</button>
            ) : ( */}
            <button 
              type="button" 
              className={!phoneVerified ? cx("BttonFixButton-button", "is-disable") : Style["BttonFixButton-button"]} 
              onClick={handleNextStep}
              disabled={!phoneVerified}
            >인증 완료하기</button>
            {/* )} */}
          </div>
        </div>
        {/* <!-- .BttonFixButton --> */}
      </div>
      {/* /* <!-- .컨텐츠 끝 --> */}
    </div>
  )
}

export default SignUpStep2;