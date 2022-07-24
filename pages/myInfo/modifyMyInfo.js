import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as userInfoActions from "../../redux/store/modules/userInfo";
import axios from "axios";
import Style from "../../styles/Component.module.css";
import DetailTopNavbar from "../../components/NavBar/DetailTopNavbar";
import classNames from 'classnames/bind';
import Link from 'next/link';
import { data } from "jquery";
import { CleanLoginInfoInLocalStorage } from './../../components/Button/Login/Utils/LoginUtil';
import { PUBLISHER_KAKAO, PUBLISHER_NAVER, PUBLISHER_TRAVELX } from "../../components/Button/Login/LoginConstant";
import { DeleteCookie } from './../../components/Button/Login/Utils/CookieUtil';

const cx = classNames.bind(Style);

const ModifyMyInfo = () => {
	// debugger;
	// const redirectUri = useSelector(({ redirectUri }) => redirectUri.value);
	// console.log(`redirectUri is ${redirectUri}`);
	const router = useRouter();
  const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo.info);
	// console.log(userInfo);
	// male, female 로 남자, 여자 나눔
	const [sexType, setSexType] = useState("MALE");
	const [birthday, setBirthday] = useState({ year: "", month: "", day: "" })
	const [user, setUser] = useState({
		id: "",
		authPublisher: "",
		userId: "",
		password: "",
		nickName: null,
		userExtraInfo: {
			name: "",
			phoneNumber: "",
			birthday: "",
			gender: "",
			location: ""
		}
	});
	// debugger;

	const onChangeHandler = (value, type) => {
		// debugger;
		switch (type) {
			case 'name':
				setUser((current) => {
					let newUser = { ...current };
					newUser['userExtraInfo'].name = value;
					return newUser;
				});
				// console.log(user);
				break;

			case 'phoneNumber':
				setUser((current) => {
					let newUser = { ...current };
					newUser['userExtraInfo'].phoneNumber = value;
					return newUser;
				});
				// console.log(user);
				break;

			case 'location':
				setUser((current) => {
					let newUser = { ...current };
					newUser['userExtraInfo'].location = value;
					return newUser;
				});
				// console.log(user);
				break;

			case 'sex': {
				setSexType(value);
				break;
			}

			case 'year':
				setBirthday((current) => {
					let newBirthday = { ...current };
					newBirthday[type] = value;
					return newBirthday;
				});
				// console.log(birthday);
				break;


			case 'month':
				setBirthday((current) => {
					let newBirthday = { ...current };
					newBirthday[type] = value;
					return newBirthday;
				});
				// console.log(birthday);
				break;


			case 'day':
				setBirthday((current) => {
					let newBirthday = { ...current };
					newBirthday[type] = value;
					return newBirthday;
				});
				// console.log(birthday);
				break;

			// case ['year','month', 'day']: {
			// 	setBirthday((current) => {
			// 		let newBirthday = { ...current };
			// 		newBirthday[type] = value;
			// 		return newBirthday;
			// 	});
			// 	console.log(birthday);
			// 	break;
			// }

		}

		// console.log(user);
	}

	const splitBirthdayFun = (data) => {
		if (data) {
			// debugger;
			setBirthday({ year: data.substring(0, 4), month: data.substring(4, 6), day: data.substring(6, 8) })
		}
	}

	const checkNumber = (type, data) => {
		// debugger;
		if(type === 'month' && data.month.length < 2 && parseInt(data.month) < 10){
			data.month = '0'+data.month;
			// console.log(data.month);
		} else if(type === 'day' && data.day.length < 2 && parseInt(data.day) < 10 ){
			data.day = '0'+data.day;
			// console.log(data.day);
		}

	}
	const combineBirthdayFun = (data) =>{

		checkNumber('month',data);
		checkNumber('day',data);
		console.log(data);
		return data.year+data.month+data.day;
	}

	const getUserInfo = () => {

		const formData = new FormData();
		formData.append('authPublisher', userInfo.pub);
		formData.append('userId', userInfo.id);
		formData.append('password', userInfo.pwd ? userInfo.pwd : null);

		axios.post('http://shineware.iptime.org:8081/auth/user/get', formData)
			.then((res) => {
				// debugger;
				if (res.data !== undefined) {
					// console.log(res.data);
					if(res.data.userExtraInfo == null){
							res.data.userExtraInfo = {
								name: "",
								phoneNumber: "",
								birthday: "",
								gender: "",
								location: ""
							}
					}
					setUser(res.data);
					setSexType(res.data.userExtraInfo.gender);
					splitBirthdayFun(res.data.userExtraInfo.birthday);
				}
			}).catch((e) => {
				console.log(e);
			})
	}

	const modifyExtraInfo = () => {
		// console.log(user);
		// console.log(birthday);
		// console.log(combineBirthdayFun(birthday));

		const formData = new FormData();
		formData.append('authPublisher', user.authPublisher);
		formData.append('birthday', combineBirthdayFun(birthday));
		formData.append('gender', sexType);
		formData.append('location', user.userExtraInfo.location);
		formData.append('name', user.userExtraInfo.name);
		formData.append('phoneNumber', user.userExtraInfo.phoneNumber);
		formData.append('password', user.password ? user.pwd : null);
		formData.append('userId', user.userId);
	

		axios.post('http://shineware.iptime.org:8081/auth/user/modifyExtraInfo', formData)
			.then((res) => {
				if (res.data !== undefined) {
					console.log('success to modify user ExtraInfo');
					router.back();
				}
			}).catch((e) => {
				console.log(e);
			})
	}

	// 회원 탈퇴
	const handleWithdrawer = () => {
		const authPublisher = localStorage.getItem("pub");
		
		const formData = new FormData();
    formData.append('authPublisher', authPublisher);
    formData.append('userId', userInfo.id);
    formData.append('password', ''); // TODO: TRAVELX 유저는 비밀번호 입력 팝업 필요
		console.log(userInfo);
		axios({
      method: "POST",
      url: "http://shineware.iptime.org:8081/auth/user/delete",
      data: formData,
    }).then((res) => {
			dispatch(userInfoActions.setUserInfo({ pub: null, id: null, auth: false, nickName: null, userExtraInfo: {} }));
			DeleteCookie("RT");
    }).catch((e) => {
			console.error(e.response);
    });

		switch (authPublisher) {
			case PUBLISHER_KAKAO: 
				if (window.Kakao.Auth.getAccessToken()) {
					window.Kakao.API.request({
						url: '/v1/user/unlink',
						success: (response) => {
							// console.log(response);
							CleanLoginInfoInLocalStorage(PUBLISHER_KAKAO);
						},
						fail: (error) => {
							console.log(error);
							alert(error.msg);
						},
					});
		
					window.Kakao.Auth.setAccessToken(null);
				}
	
				break;
			case PUBLISHER_NAVER: 
				
				break;
			
			case PUBLISHER_TRAVELX: 
	
				break;
			
			default:
	
		}

   	router.push('/')
    
  };

	useEffect(() => {
		if(userInfo.id){
			getUserInfo();
		}
	
	}, [userInfo])

	return (
		<div className="site">
			{/* Header */}
			<div className={Style["site-header"]}>
				<div className="site-container">
					<div className={Style["Header-inner"]}>
						<DetailTopNavbar HeaderTitle={'내 정보 관리'} />
					</div>
				</div>
			</div>
			{/* Header */}
			{/* Body */}
			<div className="site-body">
				{/* 컨텐츠 시작 */}
				<div className={Style["MyApplyPage"]}>
					{/* ApplySection */}
					<div className={Style["ApplySection"]}>
						<div className={"site-container"}>
							<div className={Style["ApplyHeader"]}>
								<h2 className={Style["ApplyHeader-name"]}>{user.nickName ? user.nickName : '닉네임을 입력해주세요.'}
									<Link href={{
										pathname: "/myInfo/modifyMyName"

									}}>
										<button className={Style["ApplyHeader-btn"]} type="button">
											<span className={Style["ab-text"]}>닉네임 변경</span>
										</button>
									</Link>
								</h2>
								{/* <div className={Style["ApplyHeader-logintype"]}>카카오톡으로 로그인</div> */}
							</div>
						</div>
					</div>
					{/* .ApplySection */}
					{/* ApplySection */}
					<div className={Style["ApplySection"]}>
						<div className={"site-container"}>
							<div className={Style["ApplySection-inner"]}>
								<div className={Style["ApplySection-title"]}>기본정보</div>
								{/* ReservationInput */}
								<div className={Style["ReservationInput"]}>
									<dl className={"ReservationInput-inner"}>
										<dt className={Style["ReservationInput-title"]}>
											<label className={Style["ReservationInput-label"]} htmlFor="Reservation-user">성명</label>
										</dt>
										<dd className={Style["ReservationInput-text"]}>
											<input type="text" placeholder="성명을 입력해주세요." defaultValue={user.userExtraInfo.name} onChange={(e) => onChangeHandler(e.target.value, 'name')}
												className={Style["ReservationInput-input"]} />
										</dd>
									</dl>
								</div>
								{/* .ReservationInput */}
								{/* ReservationInput */}
								<div className={Style["ReservationInput"]}>
									<dl className={"ReservationInput-inner"}>
										<dt className={Style["ReservationInput-title"]}>
											<label className={Style["ReservationInput-label"]} htmlFor="Reservation-user">휴대폰 번호</label>
										</dt>
										<dd className={Style["ReservationInput-text"]}>
											<input type="tel" placeholder="010-1234-5678" defaultValue={user.userExtraInfo.phoneNumber} onChange={(e) => onChangeHandler(e.target.value, 'phoneNumber')}
												className={Style["ReservationInput-input"]} />
										</dd>
									</dl>
								</div>
								{/* .ReservationInput */}
							</div>
						</div>
					</div>
					{/* .ApplySection */}
					{/* ApplySection */}
					<div className={Style["ApplySection"]}>
						<div className={"site-container"}>
							<div className={Style["ApplySection-inner"]}>
								<div className={Style["ApplySection-title"]}>추가 등록 정보</div>
								{/* ReservationInput */}
								<div className={Style["ReservationInput"]}>
									<dl className={"ReservationInput-inner"}>
										<dt className={Style["ReservationInput-title"]}>
											<label className={Style["ReservationInput-label"]} htmlFor="Reservation-user">생년월일</label>
										</dt>
										<dd className={"ReservationInput-text"}>
											<div className={Style["ReservationBirthday"]}>
												<ul className={Style["ReservationBirthday-inner"]}>
													<li className={Style["ReservationBirthday-item"]}>
														<input type="number" placeholder={2000} defaultValue={birthday.year} onChange={(e) => onChangeHandler(e.target.value, 'year')}
															className={Style["ReservationBirthday-input"]} />

													</li>
													<li className={Style["ReservationBirthday-item"]}>
														<input type="number" placeholder={10} defaultValue={birthday.month} onChange={(e) => onChangeHandler(e.target.value, 'month')}
															className={Style["ReservationBirthday-input"]} />
													</li>
													<li className={Style["ReservationBirthday-item"]}>
														<input type="number" placeholder={14} defaultValue={birthday.day} onChange={(e) => onChangeHandler(e.target.value, 'day')}
															className={Style["ReservationBirthday-input"]} />
													</li>
												</ul>
											</div>

										</dd>
									</dl>
								</div>
								{/* .ReservationInput */}
								{/* ReservationInput */}
								<div className={Style["ReservationInput"]}>
									<dl className={"ReservationInput-inner"}>
										<dt className={Style["ReservationInput-title"]}>
											<label className={Style["ReservationInput-label"]} htmlFor="Reservation-user">성별</label>
										</dt>
										<dd className={"ReservationInput-text"}>
											<ul className={Style["ApplySectionList"]}>
												<li className={Style["ApplySectionList-item"]}>
													<label className={Style["BasicRadio"]}>
														<input type="radio" name="BasicRadio" value="FEMALE" onChange={(e) => onChangeHandler(e.target.value, 'sex')}
															checked={sexType === "FEMALE"} className={Style["BasicRadio-input"]} />
														<span className={Style["BasicRadio-text"]}>여성</span>
													</label>
												</li>
												<li className={Style["ApplySectionList-item"]}>
													<label className={Style["BasicRadio"]}>
														<input type="radio" name="BasicRadio" value="MALE" onChange={(e) => onChangeHandler(e.target.value, 'sex')}
															checked={sexType === "MALE"} className={Style["BasicRadio-input"]} />
														<span className={Style["BasicRadio-text"]}>남성</span>
													</label>
												</li>
											</ul>
										</dd>
									</dl>
								</div>
								{/* .ReservationInput */}
								{/* ReservationInput */}
								<div className={Style["ReservationInput"]}>
									<dl className={"ReservationInput-inner"}>
										<dt className={Style["ReservationInput-title"]}>
											<label className={Style["ReservationInput-label"]} htmlFor="Reservation-user">현 주소</label>
										</dt>
										<dd className={Style["ReservationInput-text"]}>
											<input type="tel" className={cx("ReservationInput-input", "ico-Arrow")} onChange={(e) => onChangeHandler(e.target.value, 'location')}
												defaultValue={user.userExtraInfo.location} placeholder="지역선택" />

										</dd>
									</dl>
								</div>
								{/* .ReservationInput */}
							</div>
						</div>
					</div>
					{/* .ApplySection */}
					{/* ApplySection */}
					<div className={cx("ApplySection", "Last")}>
						<div className={"site-container"}>
							<a href="#;" className={Style["ApplySecession"]}>
								<div className={Style["ApplySecession-title"]} onClick={handleWithdrawer}>회원탈퇴</div>
							</a>
						</div>
					</div>
					{/* .ApplySection */}
					{/* BttonFixButton */}
					<div className={Style["BttonFixButton"]}>
						<div className={"site-container"}>
							<button type="button" className={Style["BttonFixButton-button"]} onClick={() => modifyExtraInfo()}>저장하기</button>
						</div>
					</div>
					{/* .BttonFixButton */}
				</div>
				{/* .컨텐츠 끝 */}
			</div>
			{/* .Body */}
		</div>
	);
}
export default ModifyMyInfo;
