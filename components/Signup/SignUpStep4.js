import { React, useEffect, useState } from 'react';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';
import { PasswdValidate } from './utils/SignUpValidate';

const cx = classNames.bind(Style);

const SignUpStep4 = ({ setStep, setPasswdValues }) => {

  const [values, setValues] = useState({
    passwd: '',
    confirmPasswd: ''
  });

  const [validateValues, setValidateValues] = useState({
    eng: false,
    num: false,
    spcl: false,
    length: false,
    equal: false,
    validateAll: false
  });

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(5);
    setPasswdValues(values);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  };

  useEffect(() => {
    const validation = PasswdValidate(values);
    setValidateValues({...validation});
  }, [values]);

  return (
    <div className="site-body">
      {/* <!-- 컨텐츠 시작 --> */}
      <div className={Style["StepPage"]}>
        <div className="site-container">
          {/* <!-- StepPageHeader --> */}
          <div className={Style["StepPageHeader"]}>
            <h2 className={Style["StepPageHeader-title"]}>비밀번호를 설정해 주세요.</h2>
          </div>
          {/* <!-- .StepPageHeader --> */}
          {/* <!-- MemberForm --> */}
          <div className={Style["MemberForm"]}>
            {/* <!-- Item --> */}
            <div className={values.passwd.length > 0 ? cx("MemberFormItem", "is-Active") : Style["MemberFormItem"]}>
              <dl className={Style["MemberFormItem-inner"]}>
                <dt className={Style["MemberFormItemTitle"]}>비밀번호 입력</dt>
                <dd className={Style["MemberFormItemCont"]}>
                  <div className={Style["MemberFormReg"]}>
										<input 
                      type="password" 
                      className={Style["MemberFormReg-input"]} 
                      placeholder="비밀번호 8-20자리" 
                      name="passwd"
                      value={values.passwd}
                      onChange={handleChange}
                    />
                  </div>
                </dd>
              </dl>
							{/* <!-- ErrorList --> */}
							<div className={Style["ErrorList"]}>
								<ul className={Style["ErrorList-list"]}>
									<li className={validateValues.eng ? cx("ErrorList-item", "is-Active") : Style["ErrorList-item"]}>
										<span className={Style["ErrorCheckText"]}>영문</span>
									</li>
									<li className={validateValues.num ? cx("ErrorList-item", "is-Active") : Style["ErrorList-item"]}>
										<span className={Style["ErrorCheckText"]}>숫자</span>
									</li>
									<li className={validateValues.spcl ? cx("ErrorList-item", "is-Active") : Style["ErrorList-item"]}>
										<span className={Style["ErrorCheckText"]}>특수문자</span>
									</li>
									<li className={validateValues.length ? cx("ErrorList-item", "is-Active") : Style["ErrorList-item"]}>
										<span className={Style["ErrorCheckText"]}>8-20자리</span>
									</li>
								</ul>
							</div>
							{/* <!-- .ErrorList --> */}
            </div>
            {/* <!-- .Item --> */}
            {/* <!-- Item --> */}
            <div className={values.confirmPasswd.length > 0 ? cx("MemberFormItem", "is-Active") : Style["MemberFormItem"]}>
							<dl className={Style["MemberFormItem-inner"]}>
								<dt className={Style["MemberFormItemTitle"]}>비밀번호 확인</dt>
								<dd className={Style["MemberFormItemCont"]}>
									<div className={Style["MemberFormReg"]}>
										<input 
                      type="password" 
                      className={Style["MemberFormReg-input"]} 
                      placeholder="비밀번호 8-20자리" 
                      name="confirmPasswd"
                      value={values.confirmPasswd}
                      onChange={handleChange}
                    />
									</div>
								</dd>
							</dl>
							{/* <!-- ErrorList --> */}
							<div className={Style["ErrorList"]}>
								<ul className={Style["ErrorList-list"]}>
									<li className={validateValues.equal ? cx("ErrorList-item", "is-Active") : Style["ErrorList-item"]}>
										<span className={Style["ErrorCheckText"]}>비밀번호 일치</span>
									</li>
								</ul>
							</div>
							{/* <!-- .ErrorList --> */}
						</div>
						{/* <!-- .Item --> */}
          </div>
          {/* <!-- .MemberForm --> */}
          {/* <!-- .Body --> */}
        </div>
        {/* <!-- BttonFixButton --> */}
        <div className={cx("BttonFixButton", "no-Scroll")}>
          <div className={"site-container"}>
						<button type="button" className={Style["BttonFixButton-button"]} onClick={handleNextStep} disabled={!validateValues.validateAll}>다음</button>
          </div>
        </div>
        {/* <!-- .BttonFixButton --> */}
      </div>
      {/* /* <!-- .컨텐츠 끝 --> */}
    </div>
  )
}

export default SignUpStep4;