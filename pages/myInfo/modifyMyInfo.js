import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Style from "../../styles/Component.module.css";
import DetailTopNavbar from "../../components/NavBar/DetailTopNavbar";
import classNames from 'classnames/bind';
import Link from 'next/link';

const cx = classNames.bind(Style);

const modifyMyInfo = () => {
	// debugger;
	// const redirectUri = useSelector(({ redirectUri }) => redirectUri.value);
	// console.log(`redirectUri is ${redirectUri}`);
	const { auth } = useSelector((state) => state.userInfo.info);
	console.log(`auth is ${auth}`);


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
								<h2 className={Style["ApplyHeader-name"]}>휜둥이님
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
											<input type="text" placeholder="성명을 입력해주세요." className={Style["ReservationInput-input"]} />
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
											<input type="tel" placeholder="010-1234-5678" className={Style["ReservationInput-input"]} />
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
														<input type="number" placeholder={2000} className={Style["ReservationBirthday-input"]} />
													</li>
													<li className={Style["ReservationBirthday-item"]}>
														<input type="number" placeholder={10} className={Style["ReservationBirthday-input"]} />
													</li>
													<li className={Style["ReservationBirthday-item"]}>
														<input type="number" placeholder={14} className={Style["ReservationBirthday-input"]} />
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
														<input type="radio" name="BasicRadio" className={Style["BasicRadio-input"]} />
														<span className={Style["BasicRadio-text"]}>여성</span>
													</label>
												</li>
												<li className={Style["ApplySectionList-item"]}>
													<label className={Style["BasicRadio"]}>
														<input type="radio" name="BasicRadio" className={Style["BasicRadio-input"]} />
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
											<input type="tel" className={cx("ReservationInput-input", "ico-Arrow")} placeholder="지역선택" />
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
								<div className={Style["ApplySecession-title"]}>회원탈퇴</div>
							</a>
						</div>
					</div>
					{/* .ApplySection */}
					{/* BttonFixButton */}
					<div className={Style["BttonFixButton"]}>
						<div className={"site-container"}>
							<button type="button" className={Style["BttonFixButton-button"]}>저장하기</button>
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
export default modifyMyInfo;
