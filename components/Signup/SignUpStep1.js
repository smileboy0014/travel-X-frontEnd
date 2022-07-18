import { React, useEffect, useState } from 'react';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const SignUpStep1 = ({ setStep, setAgreeValues, initValues }) => {

  const [values, setValues] = useState({
    agreeAge: false,
    agreeService: false,
    agreePrivacy: false,
    agreeMarketing: false,
    agreeAll: false
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    setAgreeValues({...values});
    setStep(2);
  };

  const handleAgree = (e) => {
    const { name } = e.target;
    setValues({ ...values, [name]: !values[name]});
  };

  const handleAgreeAll = (e) => {
    setValues({
      agreeAge: !values.agreeAll,
      agreeService: !values.agreeAll,
      agreePrivacy: !values.agreeAll,
      agreeMarketing: !values.agreeAll,
      agreeAll: !values.agreeAll
    });
  };

  useEffect(() => {
    setValues({...initValues});
    
  }, []);

  useEffect(() => {
    if (values.agreeAge && values.agreeService && values.agreePrivacy) 
      setIsChecked(true);
    else
      setIsChecked(false);
  }, [values])

  return (
    <div className="site-body">
      {/* <!-- 컨텐츠 시작 --> */}
      <div className={Style["StepPage"]}>
        <div className="site-container">
          {/* <!-- StepPageHeader --> */}
          <div className={Style["StepPageHeader"]}>
            <h2 className={Style["StepPageHeader-title"]}>서비스 이용약관에 <br />동의해주세요.</h2>
          </div>
          {/* <!-- .StepPageHeader --> */}
          {/* <!-- AgreeForm --> */}
          <div className={Style["AgreeForm"]}>
            <div className={Style["AgreeFormAll"]}>
              <label className={Style["LageAgreeFormLabel"]}>
                <input type="checkbox" className={Style["LageAgreeFormLabel-input"]} name="AgreeFormLabelAll" checked={values.agreeAll} readOnly />
                <span className={Style["LageAgreeFormLabel-text"]} onClick={handleAgreeAll}>모두 동의 (선택 정보 포함)</span>
              </label>
            </div>
            <div className={Style["AgreeFormList"]}>
              <ul className={Style["AgreeFormList-list"]}>
                <li className={Style["AgreeFormList-item"]}>
                  <label className={Style["AgreeFormLabel"]}>
                    <input type="checkbox" className={Style["AgreeFormLabel-input"]} name="agreeAge" onChange={handleAgree} checked={values.agreeAge} />
                    <span className={Style["AgreeFormLabel-text"]} onClick={handleAgree}>(필수) 만 14세 이상입니다</span>
                  </label>
                </li>
                <li className={Style["AgreeFormList-item"]}>
                  <label className={Style["AgreeFormLabel"]}>
                    <input type="checkbox" className={Style["AgreeFormLabel-input"]} name="agreeService" onChange={handleAgree} checked={values.agreeService} />
                    <span className={Style["AgreeFormLabel-text"]} onClick={handleAgree}>(필수) 서비스 이용약관 동의</span>
                  </label>
                </li>
                <li className={Style["AgreeFormList-item"]}>
                  <label className={Style["AgreeFormLabel"]}>
                    <input type="checkbox" className={Style["AgreeFormLabel-input"]} name="agreePrivacy" onChange={handleAgree} checked={values.agreePrivacy} />
                    <span className={Style["AgreeFormLabel-text"]} onClick={handleAgree}>(필수) 개인정보 수집 및 이용 동의 </span>
                  </label>
                </li>
                <li className={Style["AgreeFormList-item"]}>
                  <label className={Style["AgreeFormLabel"]}>
                    <input type="checkbox" className={Style["AgreeFormLabel-input"]} name="agreeMarketing" onChange={handleAgree} checked={values.agreeMarketing} />
                    <span className={Style["AgreeFormLabel-text"]} onClick={handleAgree}>(선택) 마케팅을 위한 정보 수집 및 활용 동의</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- .AgreeForm --> */}
          {/* <!-- .Body --> */}
        </div>
        {/* <!-- BttonFixButton --> */}
        <div className={cx("BttonFixButton", "no-Scroll")}>
          <div className={"site-container"}>
            <button 
              type="button" 
              className={!isChecked ? cx("BttonFixButton-button", "is-disable") : Style["BttonFixButton-button"]} 
              onClick={handleNextStep}
              disabled={!isChecked}
            >동의하고 가입하기</button>
          </div>
        </div>
        {/* <!-- .BttonFixButton --> */}
      </div>
      {/* <!-- .컨텐츠 끝 --> */}
    </div>
  )
}

export default SignUpStep1;