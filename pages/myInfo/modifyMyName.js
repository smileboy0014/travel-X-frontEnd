import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Style from "../../styles/Component.module.css";
import DetailTopNavbar from "../../components/NavBar/DetailTopNavbar";
import classNames from 'classnames/bind';
import Link from 'next/link';

const cx = classNames.bind(Style);

const modifyMyName = () => {

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
									<input type="text" placeholder="홍길동" className={Style["ReservationInput-input"]} />
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
							<button type="button" className={Style["BttonFixButton-button"]}>저장하기</button>
						</div>
					</div>
					{/* .BttonFixButton */}
			</div>
			
			</div>
			{/* .Body */}
		</div>
	);
}
export default modifyMyName;
