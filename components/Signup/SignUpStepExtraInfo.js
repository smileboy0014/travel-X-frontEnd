import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';
import BirthdayModal from './../Modal/SignUp/BirthdayModal';
import AddressModal from './../Modal/SignUp/AddressModal';
// import { NicknameValidate } from './utils/SignUpValidate';
// import axios from 'axios';

const cx = classNames.bind(Style);

const SignUpStepExtraInfo = ({ setStep, setExtraValues, initValues, callback, gender }) => {
	const router = useRouter();

	const [values, setValues] = useState({
    // nickName: '',
		birthday: {
			year: '',
			month: '',
			day: ''
		},
		gender: '',
		location: ''
  });

	// const [nickNameValidation, setNickNameValidation] = useState({
	// 	type: false,
	// 	length: false
	// });
	// const [isCheckedNickName, setIsCheckedNickName] = useState(false);
	const [isSetBirthday, setIsSetBirthday] = useState(false);
  const [birthdayModalOpen, setBirthdayModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const handleNextStep = async (e) => {
    e.preventDefault();

		const result = await callback();

		if (result.success) {
			setStep(7);
		} else {
			alert(result.message);
			router.push('/login');
		}
  };

	const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  };

	const handleSelectGender = (e) => {
    const { name } = e.target;
    setValues({...values, gender: name});
	};

	const handleBirthdayCallback = (birthday) => {
		setValues({...values, birthday: birthday});
		setIsSetBirthday(true);
	};

	const handleAddressCallback = (location) => {
		setValues({...values, location: location});
	};

	// const checkDuplication = (e) => {
	// 	e.preventDefault();

	// 	const formData = new FormData();
  //   formData.append('nickName', values.nickName);

  //   axios({
  //     method: "POST",
  //     url: "http://shineware.iptime.org:8081/auth/user/checkNickName",
  //     data: formData,
  //   }).then((res) => {
	// 		setIsCheckedNickName(true);
  //   }).catch((e) => {
	// 		alert('중복확인 중 에러가 발생하였습니다.');
	// 		console.error(e);
  //   });
	// };

	useEffect(() => {
    setValues({
			...initValues,
			gender: gender ? (gender == 'male' ? 'MALE' : 'FEMALE') : ''
		});
	}, []);

	useEffect(() => {
		setExtraValues({...values});
	}, [values]);

  // useEffect(() => {
  //   const validation = NicknameValidate(values.nickName);
  //   setNickNameValidation({...validation});
	// 	setIsCheckedNickName(false);
  // }, [values.nickName]);

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
            {/* <div className={values.nickName.length > 0 && !isCheckedNickName ? cx("MemberFormItem", "is-Active") : Style["MemberFormItem"]}>
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
										<button type="button" className={Style["MemberFormReg-btn"]} onClick={checkDuplication}>중복확인</button>
									</div>
                </dd>
              </dl>
							{!nickNameValidation.length && nickNameValidation.type ? <div className={cx("Error-text", "is-Active")}>닉네임은 최소 2자, 최대 20자까지 가능합니다.</div> : null}
							{!nickNameValidation.type && values.nickName.length > 0 ? <div className={cx("Error-text", "is-Active")}>닉네임 형식을 확인해주세요.</div> : null}
            </div> */}
            {/* <!-- .Item --> */}
            {/* <!-- Item --> */}
            <div className={values.birthday.year.length > 0 ? cx("MemberFormItem", "is-Active") : Style["MemberFormItem"]}>
							<dl className={Style["MemberFormItem-inner"]}>
								<dt className={Style["MemberFormItemTitle"]}>생년월일<span className={Style["Required-text"]}>*</span></dt>
								<dd className={Style["MemberFormItemCont"]} onClick={() => setBirthdayModalOpen(true)}>
                  <div className={Style["MemberFormBirthday"]}>
										<ul className={Style["MemberFormBirthday-inner"]}>
											<li className={Style["MemberFormBirthday-item"]}>
												<div className={Style["MemberFormReg"]}>
													<input type="text" className={Style["MemberFormReg-input"]} value={values.birthday.year} readOnly />
												</div>
											</li>
											<li className={Style["MemberFormBirthday-item"]}>
												<div className={Style["MemberFormReg"]}>
													<input type="text" className={Style["MemberFormReg-input"]} value={values.birthday.month} readOnly />
												</div>
											</li>
											<li className={Style["MemberFormBirthday-item"]}>
												<div className={Style["MemberFormReg"]}>
													<input type="text" className={Style["MemberFormReg-input"]} value={values.birthday.day} readOnly />
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
												<input 
													type="radio" 
													name="FEMALE" 
													className={Style["MemberFormBasicRadio-input"]} 
													onClick={handleSelectGender} 
													checked={values.gender == 'FEMALE'} 
													readOnly 
												/>
												<span className={Style["MemberFormBasicRadio-text"]}>여성</span>
											</label>
										</li>
										<li className={Style["ApplySectionList-item"]}>
											<label className={Style["MemberFormBasicRadio"]}>
												<input 
													type="radio" 
													name="MALE" 
													className={Style["MemberFormBasicRadio-input"]} 
													onClick={handleSelectGender} 
													checked={values.gender == 'MALE'} 
													readOnly 
												/>
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
										<a href="#" className={values.location ? cx("MemberFormAddress-link", "is-Active") : Style["MemberFormAddress-link"]} onClick={() => setAddressModalOpen(true)}>
											{!values.location ? '지역 선택' : values.location + '선택 완료'}
										</a>
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
						<button 
							type="button" 
							className={isSetBirthday ? Style["BttonFixButton-button"] : cx("BttonFixButton-button", "is-disable")} 
							onClick={handleNextStep}
						>입력 완료하기</button>
          </div>
        </div>
        {/* <!-- .BttonFixButton --> */}
      </div>
			<BirthdayModal
        isOpen={birthdayModalOpen}
        onRequestClose={() => setBirthdayModalOpen(false)}
        callback={handleBirthdayCallback}
        values={values}
			/>
			<AddressModal
        isOpen={addressModalOpen}
        onRequestClose={() => setAddressModalOpen(false)}
        callback={handleAddressCallback}
			/>
      {/* /* <!-- .컨텐츠 끝 --> */}
    </div>
  )
}

export default SignUpStepExtraInfo;