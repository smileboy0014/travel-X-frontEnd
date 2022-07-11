import { React, useEffect, useState } from 'react';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';
import { NicknameValidate } from './utils/SignUpValidate';

const cx = classNames.bind(Style);

const SignUpStepExtraInfo = ({ setStep }) => {

	const [values, setValues] = useState({
    nickName: ''
  });

	const [nickNameValidation, setNickNameValidation] = useState({
		type: false,
		length: false
	});
	const [isCheckedNickName, setIsCheckedNickName] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(6);
  };

	const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  };

  useEffect(() => {
    const validation = NicknameValidate(values.nickName);
    setNickNameValidation({...validation});
		// console.log(validation);
  }, [values]);

  return (
    <div className="site-body">
      {/* <!-- 컨텐츠 시작 --> */}
      <div className={Style["StepPage"]}>
        <div className="site-container">
          {/* <!-- StepPageHeader --> */}
          <div className={Style["StepPageHeader"]}>
            <h2 className={Style["StepPageHeader-title"]}>추가 정보 입력후 <br />회원가입을 완료해주세요.</h2>
          </div>
          {/* <!-- .StepPageHeader --> */}
          {/* <!-- MemberForm --> */}
          <div className={Style["MemberForm"]}>
            {/* <!-- Item --> */}
            <div className={values.nickName > 0 ? cx("MemberFormItem", "is-Active") : Style["MemberFormItem"]}>
              <dl className={Style["MemberFormItem-inner"]}>
                <dt className={Style["MemberFormItemTitle"]}>닉네임<span className={Style["Required-text"]}>*</span></dt>
                <dd className={Style["MemberFormItemCont"]}>
                <div className={isCheckedNickName ? cx("MemberFormItemBtn", "Checking", "is-Pass") : Style["MemberFormItemBtn"]}>
										<div className={Style["MemberFormReg"]}>
											<input 
												type="text" 
												className={Style["MemberFormReg-input"]}
												placeholder="상냥한콩비지"
												name="nickName"
												value={values.nickName}
												onChange={handleChange}
											/>
										</div>
										<button type="button" className={Style["MemberFormReg-btn"]}>변경하기</button>
									</div>
                </dd>
              </dl>
							{/* {!nickNameValidation.length && nickNameValidation.type ? <div className={cx("Error-text", "is-Active")}>이메일은 최소 4자, 최대 20자까지 가능합니다.</div> : null}
							{!nickNameValidation.type && values.nickName.length > 0 ? <div className={cx("Error-text", "is-Active")}>이메일 형식을 확인해주세요.</div> : null} */}
            </div>
            {/* <!-- .Item --> */}
            {/* <!-- Item --> */}
						<div className={Style["MemberFormItem"]}>
							<dl className={Style["MemberFormItem-inner"]}>
								<dt className={Style["MemberFormItemTitle"]}>생년월일<span className={Style["Required-text"]}>*</span></dt>
								<dd className={Style["MemberFormItemCont"]}>
                  <div className={Style["MemberFormBirthday"]}>
										<ul className={Style["MemberFormBirthday-inner"]}>
											<li className={Style["MemberFormBirthday-item"]}>
												<div className={Style["MemberFormReg"]}>
													<input type="text" className={Style["MemberFormReg-input"]} readOnly />
												</div>
											</li>
											<li className={Style["MemberFormBirthday-item"]}>
												<div className={Style["MemberFormReg"]}>
													<input type="text" className={Style["MemberFormReg-input"]} readOnly />
												</div>
											</li>
											<li className={Style["MemberFormBirthday-item"]}>
												<div className={Style["MemberFormReg"]}>
													<input type="text" className={Style["MemberFormReg-input"]} readOnly />
												</div>
											</li>
										</ul>
									</div>
								</dd>
							</dl>
							
						</div>
						{/* <!-- .Item --> */}
            {/* <!-- Item --> */}
						<div className={Style["MemberFormItem"]}>
							<dl className={Style["MemberFormItem-inner"]}>
								<dt className={Style["MemberFormItemTitle"]}>성별</dt>
								<dd className={Style["MemberFormItemCont"]}>
									<ul className={Style["ApplySectionList"]}>
										<li className={Style["ApplySectionList-item"]}>
											<label className={Style["MemberFormBasicRadio"]}>
												<input type="radio" name="BasicRadio" className={Style["MemberFormBasicRadio-input"]} />
												<span className={Style["MemberFormBasicRadio-text"]}>여성</span>
											</label>
										</li>
										<li className={Style["ApplySectionList-item"]}>
											<label className={Style["MemberFormBasicRadio"]}>
												<input type="radio" name="BasicRadio" className={Style["MemberFormBasicRadio-input"]} />
												<span className={Style["MemberFormBasicRadio-text"]}>남성</span>
											</label>
										</li>
									</ul>
								</dd>
							</dl>
						</div>
						{/* <!-- .Item --> */}
						{/* <!-- Item --> */}
						<div className={Style["MemberFormItem"]}>
							<div className={Style["MemberFormAddress"]}>
								<dl className={Style["MemberFormAddress-inner"]}>
									<dt className={Style["MemberFormAddress-title"]}>
										<div className={Style["MemberFormItemTitle"]}>현 주소</div>
									</dt>
									<dd className={Style["MemberFormAddress-cont"]}>
										<a href="#" className={Style["MemberFormAddress-link"]}>지역 선택</a>
										{/* <a href="#" className={Style["MemberFormAddress-link"]}>'서울시' 선택 완료</a> */}
									</dd>
								</dl>
							</div>
						</div>
						{/* <!-- .Item --> */}
          </div>
          {/* <!-- .MemberForm --> */}
          {/* <!-- .Body --> */}
        </div>
        {/* <!-- BttonFixButton --> */}
        <div className={cx("BttonFixButton", "no-Scroll")}>
          <div className={"site-container"}>
						<button type="button" className={Style["BttonFixButton-button"]} onClick={handleNextStep}>입력 완료하기</button>
          </div>
        </div>
        {/* <!-- .BttonFixButton --> */}
      </div>
      {/* /* <!-- .컨텐츠 끝 --> */}
    </div>
  )
}

export default SignUpStepExtraInfo;