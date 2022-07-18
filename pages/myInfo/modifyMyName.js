import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Style from "../../styles/Component.module.css";
import * as userInfoActions from "../../redux/store/modules/userInfo";
import DetailTopNavbar from "../../components/NavBar/DetailTopNavbar";
import classNames from 'classnames/bind';
import Link from 'next/link';

const cx = classNames.bind(Style);

const ModifyMyName = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo.info);
	const [nickName,setNicName] = useState('');
	// console.log(userInfo);

	const onChangeHandler = (e) =>{
		setNicName(e.target.value);
	}

	const modifyNicName = () => {
		// debugger;
		const formData = new FormData();
		formData.append('authPublisher', userInfo.pub);
		formData.append('userId', userInfo.id);
		formData.append('nickName', nickName);
		formData.append('password', userInfo.pwd ? userInfo.pwd : null);

		axios.post('http://shineware.iptime.org:8081/auth/user/modifyNickName', formData)
			.then((res) => {
				// debugger;
				if (res.data !== undefined) {
					console.log('success to modify user nickName');
					dispatch(userInfoActions.setUserInfo({ pub: userInfo.pub, id: userInfo.id, auth: true, nickName: nickName}));
					router.back();
				}
			}).catch((e) => {
				console.log(e);
			})
	}

	return (
		<div className="site">
			{/* Header */}
			<div className={Style["site-header"]}>
				<div className="site-container">
					<div className={Style["Header-inner"]}>
					<DetailTopNavbar HeaderTitle={'닉네임 수정'} />
					</div>
				</div>
			</div>
			{/* Header */}
			{/* Body */}
			<div className="site-body">
			{/*  컨텐츠 시작 */}
			<div className={Style["MyPage"]}>
				{/*  ApplySection */}
				<div className={Style["NameApplySection"]}>
					<div className="site-container">
						<div className={Style["NameApplySection-title"]}>닉네임을 입력해주세요.</div>
						{/*  ReservationInput */}
						<div className={Style["ReservationInput"]}>
							<dl className="ReservationInput-inner">
								<dt className={Style["ReservationInput-title"]}>
									<label className={Style["ReservationInput-label"]} htmlFor="Reservation-user">닉네임</label>
								</dt>
								<dd className="ReservationInput-text">
									<input type="text" placeholder="홍길동" defaultValue={userInfo.nickName ? userInfo.nickName : ''}
									onChange={onChangeHandler}
									 className={Style["ReservationInput-input"]} />
								</dd>
							</dl>
						</div>
						{/*  .ReservationInput */}
					</div>
				</div>
				{/*  .ApplySection */}
				{/* BttonFixButton */}
				<div className={Style["BttonFixButton"]}>
						<div className={"site-container"}>
							<button type="button" className={Style["BttonFixButton-button"]} onClick={()=>modifyNicName()}
							>저장하기</button>
						</div>
					</div>
					{/* .BttonFixButton */}
			</div>
			
			</div>
			{/* .Body */}
		</div>
	);
}
export default ModifyMyName;
