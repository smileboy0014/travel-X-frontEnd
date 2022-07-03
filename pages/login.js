import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import * as userInfoActions from "../redux/store/modules/userInfo";
import Style from '../styles/Component.module.css';
import { LoginByTravelXUserToTravelXServer } from '../components/Button/Login/Utils/LoginUtil';
import KakaoLoginButton from '../components/Button/Login/KakaoLoginButton';
import { PUBLISHER_TRAVELX } from '../components/Button/Login/LoginConstant';
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [tab, setTab] = useState(0);
  const [passwdType, setPasswdType] = useState("password");
  const [loginAlert, setLoginAlert] = useState(false);
  const [loginCount, setLoginCount] = useState(0);
  const [loginAlertTimer, setLoginAlertTimer] = useState(null);
  const [values, setValues] = useState({ userId: "", pwd: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleTravelXLogin = async (e) => {
    e.preventDefault();

    if (values.userId && values.pwd) {
      const result = await LoginByTravelXUserToTravelXServer(values.userId, values.pwd);

      if (result.auth) {
        dispatch(userInfoActions.setUserInfo({ pub: PUBLISHER_TRAVELX, id: result.userId, auth: true }));
        
        const params = new URLSearchParams(location.search);
        const curRedirectUri = params.get('redirectUri');

        router.push(curRedirectUri ? curRedirectUri : '/');
      } else {
        // if (result.message) {
        //   alert(result.message);
        // } else {
        //   alert('로그인에 실패하였습니다.');
        // }
        clearTimeout(loginAlertTimer);
        setLoginCount(++loginCount);
        setLoginAlert(true);
        let timer = setTimeout(() => {
          setLoginAlert(false);
        }, 2500);
        setLoginAlertTimer(timer);
      }
      
    }
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();

    setTab(1);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    router.push('/signup');
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleChangePasswdType = () => {
    if (passwdType == "password") {
      setPasswdType("text");
    } else {
      setPasswdType("password");
    }
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
      <div className={cx("site-header", "no-Border")}>
        <div className="site-container">
          <div className={Style["Header-inner"]}>
            <a href="#;" className={Style["HeaderBack"]} onClick={handleBackClick}><span className="ab-text">Back</span></a>
            <div className={Style["HeaderTitle"]}>로그인</div>
          </div>
        </div>
      </div>
      <div className="site-body">
        {tab == 0 ? (
          // <!-- 소셜 로그인 컨텐츠 시작 -->
          <div className={Style["LoginPage"]}>
            <div className="site-container">
              <div className={Style["site-container"]}>
                {/* <!-- Body --> */}
                <div className={Style["LoginMain"]}>
                  <div className={Style["LoginMainTitle"]}>SNS 계정으로 로그인하기</div>
                  <div className={Style["LoginMainList"]}>
                    <ul className={Style["LoginMainList-list"]}>
                      <li className={Style["LoginMainList-item"]}>
                        <KakaoLoginButton />
                      </li>
                      <li className={Style["LoginMainList-item"]}>
                        <a href="#;" className={cx("LoginMainList-link", "ico-Naver")}><span className={"ab-text"}>naver</span></a>
                      </li>
                    </ul>
                  </div>
                  <div className={Style["LoginMainListBtn"]}>
                    <a href="#;" className={Style["BorBtn"]} onClick={handleEmailLogin}>이메일로 로그인</a>
                  </div>
                </div>
                <div className={Style["LoginMainFooter"]}>
                  <span className={Style["LoginMainFooter-item"]}>아직 회원이 아니신가요?</span>
                  <a href="#;" className={Style["LoginMainFooter-link"]} onClick={handleSignUp}>이메일로 가입하기</a>
                </div>
                {/* <!-- .Body --> */}
              </div>
            </div>
          </div>
          // <!-- 소셜 로그인 컨텐츠 끝 -->
        ) : (
          // <!-- 이메일 로그인 컨텐츠 시작 -->
          <form onSubmit={handleTravelXLogin}>
            <div className={Style["StepPage"]}>
              <div className={"site-container"}>
                {/* <!-- Body --> */}
                <div className={Style["LoginForm"]}>
                  {/* <!-- Item --> */}
                  <div className={Style["MemberFormItem"]}>
                    <dl className={Style["MemberFormItem-inner"]}>
                      <dt className={Style["MemberFormItemTitle"]}>이메일</dt>
                      <dd className={Style["MemberFormItemCont"]}>
                        <div className={Style["LoginEmailBtn"]}>
                          <div className={Style["MemberFormReg"]}>
                            <input 
                              type="email"
                              name="userId"
                              value={values.userId}
                              onChange={handleChange}
                              className={Style["MemberFormReg-input"]}
                              placeholder="id@email.com" 
                            />
                          </div>
                          <button type="button" className={Style["LoginEmailBtn-btn"]}><span className={"ab-text"}>Reset</span></button>
                        </div>
                      </dd>
                    </dl>
                    <div className={cx("Error-text", "is-Active")}>이메일을 확인해주세요.</div>
                  </div>
                  {/* <!-- .Item --> */}
                  {/* <!-- Item --> */}
                  <div className={Style["MemberFormItem"]}>
                    <dl className={Style["MemberFormItem-inner"]}>
                      <dt className={Style["MemberFormItemTitle"]}>비밀번호</dt>
                      <dd className={Style["MemberFormItemCont"]}>
                        <div className={Style["MemberFormRegSetting"]}>
                          <div className={Style["MemberFormReg"]}>
                            <input 
                              type={passwdType} 
                              name="pwd"
                              value={values.pwd}
                              onChange={handleChange}
                              className={Style["MemberFormReg-input"]}
                              placeholder="비밀번호" 
                            />
                          </div>
                          <button type="button" className={passwdType == "password" ? Style["MemberFormRegSetting-btn"] : cx("MemberFormRegSetting-btn", "is-View")} onClick={handleChangePasswdType}><span className={"ab-text"}>보안</span></button>
                          <a href="#;" className={Style["MemberFormRegSetting-link"]}>비밀번호 재설정</a>
                        </div>
                      </dd>
                    </dl>
                    <div className={cx("Error-text", "is-Active")}>비밀번호를 다시 확인해주세요.</div>
                  </div>
                  {/* <!-- .Item --> */}
                </div>
                {/* <!-- .Body --> */}
              </div>
              {/* <!-- SendAlert --> */}
              {loginAlert ? 
                loginCount >= 5 ? (
                  <div className={Style["SendAlert"]}>로그인 횟수를 초과하였습니다.<br />비밀번호를 재설정해주세요.</div>
                ) : (
                  <div className={Style["SendAlert"]}>이메일 또는 비밀번호를 확인해주세요.<br />5회 잘못 입력시 로그인이 제한됩니다. ({loginCount}/5)</div>
                ) : null}
              

              {/* <!-- .SendAlert --> */}
              {/* <!-- BttonFixButton --> */}
              <div className={cx("BttonFixButton", "no-Scroll")}>
                <div className={"site-container"}>
                  <button type="submit" className={Style["BttonFixButton-button"]}>로그인하기</button>
                </div>
              </div>
              {/* <!-- .BttonFixButton --> */}
            </div>
          </form>
          // {/* <!-- 이메일 로그인 컨텐츠 끝 --> */}
        )}
      </div>
    </div>
  )
}

export default Login;