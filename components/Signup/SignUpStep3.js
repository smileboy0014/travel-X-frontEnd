import { React, useEffect, useState } from 'react';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const SignUpStep3 = ({ setStep }) => {

  const [values, setValues] = useState({
    email: ''
  });
  const [validation, setValidation] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(4);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value});
  };

  useEffect(() => {

  }, []);

  return (
    <div className="site-body">
      {/* <!-- 컨텐츠 시작 --> */}
      <div className={Style["StepPage"]}>
        <div className="site-container">
          {/* <!-- StepPageHeader --> */}
          <div className={Style["StepPageHeader"]}>
            <h2 className={Style["StepPageHeader-title"]}>이메일 주소를 입력해 주세요.</h2>
          </div>
          {/* <!-- .StepPageHeader --> */}
          {/* <!-- MemberForm --> */}
          <div className={Style["MemberForm"]}>
            {/* <!-- Item --> */}
            <div className={values.email.length > 0 ? cx("MemberFormItem", "is-Active") : Style["MemberFormItem"]}>
              <dl className={Style["MemberFormItem-inner"]}>
                <dt className={Style["MemberFormItemTitle"]}>이메일</dt>
                <dd className={Style["MemberFormItemCont"]}>
                  <div className={Style["MemberFormReg"]}>
										<input 
                      type="email" 
                      className={Style["MemberFormReg-input"]} 
                      placeholder="id@mail.com"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>
                </dd>
              </dl>
							{/* {!validation && values.email.length > 0 ? <div className={cx("Error-text", "is-Active")}>이메일 형식을 확인해주세요.</div> : null} */}
            </div>
            {/* <!-- .Item --> */}
          </div>
          {/* <!-- .MemberForm --> */}
          {/* <!-- .Body --> */}
        </div>
        {/* <!-- BttonFixButton --> */}
        <div className={cx("BttonFixButton", "no-Scroll")}>
          <div className={"site-container"}>
						<button 
              type="button" 
              className={Style["BttonFixButton-button"]} 
              onClick={handleNextStep} 
              disabled={validation && values.email.length > 0}
            >다음</button>
          </div>
        </div>
        {/* <!-- .BttonFixButton --> */}
      </div>
      {/* /* <!-- .컨텐츠 끝 --> */}
    </div>
  )
}

export default SignUpStep3;