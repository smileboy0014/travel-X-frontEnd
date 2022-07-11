import React, { useEffect, useState } from "react";
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";
import Style from "../../../styles/Component.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const MyReservationDetailView = () => {
  const userInfo = useSelector((state) => state.userInfo.info);
	const auth = userInfo.auth;
  const router = useRouter();
  const { roomId } = router.query;

  return (
   
        <div className="site">
        {/* Header */}
        <div className={Style["site-header"]}>
          <div className="site-container">
            <div className={Style["Header-inner"]}>
              <DetailTopNavbar HeaderTitle={'예약 내역 상세'} />
            </div>
          </div>
        </div>
        {/* .Header *}/
     
       {/* Body */}
		<div className="site-body">
			{/* 컨텐츠 시작 */}
			<div className={Style["ReservationPage"]}>
				{/* Body */}
				{/* ReservSingleHeader */}
				<div className={Style["ReservSingleHeader"]}>
					<div className="site-container">
						<div className={Style["ReservSingleHeader-date"]}>2021. 12. 26 (수)</div>
						<div className="ReservSingleHeaderCont">
							<div className={Style["ReservSingleHeaderMeta"]}>
								<span className={cx("ReservSingleHeaderMeta-item", "icoHotel")}>호텔</span>
								<span className={Style["ReservSingleHeaderMeta-item"]}>슈페리어 트윈 호텔</span>
							</div>
							<div className={Style["ReservSingleHeaderBox"]}>
								<div className={Style["ReservSingleHeaderBoxThumb"]}>
									<img className={Style["ReservSingleHeaderBoxThumb-img"]} src="../assets/images/dummy/ReservSingleHeader-img.png" alt="" />
								</div>
								<div className={Style["ReservSingleHeaderBoxText"]}>
									<div className={Style["ReservSingleHeaderBoxText-title"]}>슈페리어 트윈 (넷플릭스 - 숙소 문...</div>
									<div className="ReservSingleHeaderBoxMeta">
										<ul className="ReservSingleHeaderBoxMeta-inner">
											<li className={cx("ReservSingleHeaderBoxMeta-item", "ico-Cal")}>12월 26일 ~ 27일</li>
											<li className={cx("ReservSingleHeaderBoxMeta-item", "ico-User")}>성인 1명, 유아 1명</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="ReservSingleHeaderBtn">
								{/*<div className="ReservSingleHeaderBtn-btn is-disable">후기 작성하기 (30일 이내)</div> 후기작성 종료 */}
								{/*<div className="ReservSingleHeaderBtn-btn is-disable">후기 작성 완료</div> 후기작성 완료 */}
								{/*<div className="ReservSingleHeaderBtn-btn is-disable">후기 작성 기간 만료</div> 후기작성 기간 만료 */}
								<button type="button" className={Style["ReservSingleHeaderBtn-btn"]}>후기 작성하기 (30일 이내)</button>
							</div>
						</div>
					</div>
				</div>
				{/* .ReservSingleHeader */}
				{/* ReservSingleBody */}
				<div className={Style["ReservSingleBody"]}>
					<div className="site-container">
						<div className={Style["ReservSingleBodyItem"]}>
							<dl className="ReservSingleBodyItem-inner">
								<dt className={Style["ReservSingleBodyItem-title"]}>예약자 정보</dt>
								<dd className="ReservSingleBodyItemCont">
									<div className={Style["FloatListText"]}>
										<dl className={Style["FloatListText-inner"]}>
											<dt className={Style["FloatListText-title"]}>성명</dt>
											<dd className={Style["FloatListText-text"]}>강다니엘</dd>
										</dl>
									</div>
									<div className={Style["FloatListText"]}>
										<dl className={Style["FloatListText-inner"]}>
											<dt className={Style["FloatListText-title"]}>휴대폰 번호</dt>
											<dd className={Style["FloatListText-text"]}>010-1111-1111</dd>
										</dl>
									</div>
								</dd>
							</dl>
						</div>
						<div className={Style["ReservSingleBodyItem"]}>
							<dl className="ReservSingleBodyItem-inner">
								<dt className={Style["ReservSingleBodyItem-title"]}>금액 정보</dt>
								<dd className="ReservSingleBodyItemCont">
									<div className={Style["FloatListText"]}>
										<dl className={Style["FloatListText-inner"]}>
											<dt className={Style["FloatListText-title"]}>예약 금액</dt>
											<dd className={Style["FloatListText-text"]}>140,000원</dd>
										</dl>
									</div>
									<div className={Style["ReservSingleBodyItem-total"]}>
										<div className={Style["FloatListText"]}>
											<dl className={Style["FloatListText-inner"]}>
												<dt className={Style["FloatListText-title"]}>결제 금액</dt>
												<dd className={cx("FloatListText-text", "total-Text")}>140,000원</dd>
											</dl>
										</div>
										<div className={Style["FloatListText"]}>
											<dl className={Style["FloatListText-inner"]}>
												<dt className={Style["FloatListText-title"]}>결제 수단</dt>
												<dd className={Style["FloatListText-text"]}>카카오페이</dd>
											</dl>
										</div>
									</div>
								</dd>
							</dl>
						</div>
						<div className={Style["ReservSingleBodyItem"]}>
							<dl className="ReservSingleBodyItem-inner">
								<dt className={Style["ReservSingleBodyItem-title"]}>취소 및 환불 정보</dt>
								<dd className="ReservSingleBodyItemCont">
									<div className={Style["FloatListText"]}>
										<dl className={Style["FloatListText-inner"]}>
											<dt className={Style["FloatListText-title"]}>취소 수수료</dt>
											<dd className={Style["FloatListText-text"]}>0원</dd>
										</dl>
									</div>
									<div className={Style["ReservSingleBodyItem-total"]}>
										<div className={Style["FloatListText"]}>
											<dl className={Style["FloatListText-inner"]}>
												<dt className={Style["FloatListText-title"]}>환불(예정) 금액</dt>
												<dd className={cx("FloatListText-text", "total-Text")}>140,000원</dd>
											</dl>
										</div>
										<div className={Style["FloatListText"]}>
											<dl className={Style["FloatListText-inner"]}>
												<dt className={Style["FloatListText-title"]}>환불 수단</dt>
												<dd className={Style["FloatListText-text"]}>카카오페이</dd>
											</dl>
										</div>
									</div>
								</dd>
							</dl>
						</div>
					</div>
				</div>
				{/* .ReservSingleBody */}
				{/* .Body */}
				{/* BttonFixButton */}
				<div className={Style["BttonFixButton"]}>
					<div className="site-container">
						<button type="button" className={cx("BttonFixButton-button", "is-disable")}>예약취소 요청</button>{/* 컨텐츠 등록할시 is-disable 클래스 삭제 클릭가능 */}
					</div>
				</div>
				{/* .BttonFixButton */}
			</div>
			{/* .컨텐츠 끝 */}
		</div>
		{/* .Body */}
    
      </div>
      )}
  

export default MyReservationDetailView;
