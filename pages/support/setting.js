import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import Style from "../../styles/Component.module.css";
import * as spinnerActions from "../../redux/store/modules/spinnerOn";

const Setting = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [values, setValues] = useState([]);

  const handleBackClick = () => {
    router.back();
  };

  useEffect(() => {
    dispatch(spinnerActions.setState(false));
  }, []);

  return (
    <div className="site">
      <div className={Style["site-header"]}>
        <div className={"site-container"}>
          <div className={Style["Header-inner"]}>
            <a href="#;" className={Style["HeaderBack"]} onClick={handleBackClick}><span className={"ab-text"}>Back</span></a>
            <div className={Style["HeaderTitle"]}>설정</div>
          </div>
        </div>
      </div>
      <div className={"site-body"}>
        <div className={Style["SettingPage"]}>
          <div className={Style["SettingHeader"]}>
            <div className={"site-container"}>
              <div className={Style["Setting-title"]}>이용정보 알림 수신</div>
              <p className={Style["Setting-text"]}>구매·예약·결제·취소정보, 공지사항 알림</p>
              <label className={Style["BasicSwitch"]}>
                <input type="checkbox" name="setting" className={Style["BasicSwitch-input"]} />
                <span className={Style["BasicSwitchItem"]}>
                  <span className={Style["BasicSwitchItem-ico"]}></span>
                </span>
              </label>
            </div>
          </div>
          <div className={Style["SettingBody"]}>
            <div className={Style["SettingSection"]}>
              <div className={"site-container"}>
                <div className={Style["Setting-title"]}>마케팅 알림 수신</div>
                <p className={Style["Setting-text"]}>이벤트, 특가, 할인 혜택 정보 알림</p>
                <div className={Style["SettingCheck"]}>
                  <ul className={Style["SettingCheck-list"]}>
                    <li className={Style["SettingCheck-item"]}>
                      <dl className={Style["SettingCheck-inner"]}>
                        <dt className={Style["SettingCheck-title"]}>푸시 알림</dt>
                        <dd className={Style["SettingCheck-cont"]}>
                          <label className={Style["BasicSwitch"]}>
                            <input type="checkbox" name="setting" className={Style["BasicSwitch-input"]} />
                            <span className={Style["BasicSwitchItem"]}>
                              <span className={Style["BasicSwitchItem-ico"]}></span>
                            </span>
                          </label>
                        </dd>
                      </dl>
                    </li>
                    <li className={Style["SettingCheck-item"]}>
                      <dl className={Style["SettingCheck-inner"]}>
                        <dt className={Style["SettingCheck-title"]}>이메일</dt>
                        <dd className={Style["SettingCheck-cont"]}>
                          <label className={Style["BasicSwitch"]}>
                            <input type="checkbox" name="setting" className={Style["BasicSwitch-input"]} />
                            <span className={Style["BasicSwitchItem"]}>
                              <span className={Style["BasicSwitchItem-ico"]}></span>
                            </span>
                          </label>
                        </dd>
                      </dl>
                    </li>
                    <li className={Style["SettingCheck-item"]}>
                      <dl className={Style["SettingCheck-inner"]}>
                        <dt className={Style["SettingCheck-title"]}>SMS</dt>
                        <dd className={Style["SettingCheck-cont"]}>
                          <label className={Style["BasicSwitch"]}>
                            <input type="checkbox" name="setting" className={Style["BasicSwitch-input"]} />
                            <span className={Style["BasicSwitchItem"]}>
                              <span className={Style["BasicSwitchItem-ico"]}></span>
                            </span>
                          </label>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={Style["SettingLinkSection"]}>
              <div className={"site-container"}>
                <a href="#;" className={Style["SettingLinkSection-link"]}>
                  <div className={Style["SettingLinkSection-title"]}>접근권한 설정</div>
                </a>
              </div>
            </div>
            <div className={Style["SettingVerSection"]}>
              <div className={"site-container"}>
                <dl className={Style["SettingCheck-inner"]}>
                  <dt className={Style["SettingCheck-title"]}>버전정보</dt>
                  <dd className={Style["SettingCheck-cont"]}>
                    <span className={Style["SettingCheck-text"]}>1.0</span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting;