import { React, useEffect, useState } from 'react';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';
import { NicknameValidate } from './utils/SignUpValidate';
import axios from 'axios';
import { useRouter } from 'next/router';

const cx = classNames.bind(Style);

const SignUpStep5 = ({ setStep, setNicknameValues, initValues, callback, nickName }) => {

  const router = useRouter();
	const [values, setValues] = useState({
    nickName: ''
  });

	const [nickNameValidation, setNickNameValidation] = useState({
		type: false,
		length: false
	});
	const [isCheckedNickName, setIsCheckedNickName] = useState(false);

  const handleNextStep = async (e) => {
    e.preventDefault();

		const result = await callback();

		if (result.success) {
			setStep(6);
		} else {
			alert(result.message);
      // router.push('/login');
		}
  };

	const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  };

	const checkDuplication = (e) => {
		e.preventDefault();

		const formData = new FormData();
    formData.append('nickName', values.nickName);

    axios({
      method: "POST",
      url: "http://shineware.iptime.org:8081/auth/user/checkNickName",
      data: formData,
    }).then((res) => {
			setIsCheckedNickName(true);
      setNicknameValues({...values});
    }).catch((e) => {
			if (e.response.status == '409') {
				alert(e.response.data.message);
			} else {
				alert('중복확인 중 에러가 발생하였습니다.');
			}
			console.error(e.response);
    });
	};

	useEffect(() => {
    setValues({
      ...initValues, 
      nickName: nickName ? nickName : ''
    });
	}, []);

  useEffect(() => {
    const validation = NicknameValidate(values.nickName);
    setNickNameValidation({...validation});
		setIsCheckedNickName(false);
  }, [values.nickName]);

  return (
    <div className="site-body">
      {/* <!-- 컨텐츠 시작 --> */}
      <div className={Style["StepPage"]}>
        <div className="site-container">
          {/* <!-- StepPageHeader --> */}
          <div className={Style["StepPageHeader"]}>
            <h2 className={Style["StepPageHeader-title"]}>닉네임을 입력해주세요.</h2>
          </div>
          {/* <!-- .StepPageHeader --> */}
          {/* <!-- MemberForm --> */}
          <div className={Style["MemberForm"]}>
            {/* <!-- Item --> */}
            <div className={values.nickName.length > 0 && !isCheckedNickName ? cx("MemberFormItem", "is-Active") : Style["MemberFormItem"]}>
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
										<button type="button" className={Style["MemberFormReg-btn"]} onClick={checkDuplication} disabled={isCheckedNickName}>중복확인</button>
									</div>
                </dd>
              </dl>
							{!nickNameValidation.length && nickNameValidation.type ? <div className={cx("Error-text", "is-Active")}>닉네임은 최소 2자, 최대 20자까지 가능합니다.</div> : null}
							{!nickNameValidation.type && values.nickName.length > 0 ? <div className={cx("Error-text", "is-Active")}>닉네임 형식을 확인해주세요.</div> : null}
            </div>
            {/* <!-- .Item --> */}
					</div>
          {/* <!-- .Body --> */}
        </div>
        {/* <!-- BttonFixButton --> */}
        <div className={cx("BttonFixButton", "no-Scroll")}>
          <div className={"site-container"}>
						<button 
							type="button" 
							className={isCheckedNickName ? Style["BttonFixButton-button"] : cx("BttonFixButton-button", "is-disable")} 
							onClick={handleNextStep}
						>입력 완료하기</button>
          </div>
        </div>
        {/* <!-- .BttonFixButton --> */}
      </div>
      {/* /* <!-- .컨텐츠 끝 --> */}
    </div>
  )
}

export default SignUpStep5;