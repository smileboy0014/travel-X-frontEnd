import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Style from "../../styles/Component.module.css";
import DetailTopNavbar from "../../components/NavBar/DetailTopNavbar";
import SelectTopNavbar from "../../components/NavBar/SelectTopNavbar";
import classNames from 'classnames/bind';
import Link from 'next/link';

const cx = classNames.bind(Style);

const MyReservation = () => {
	const router = useRouter();
	const userInfo = useSelector((state) => state.userInfo.info);
	const [from, setFrom] = useState(0);
	const [size, setSize] = useState(10);
	// const [selectTopNav, setSelectTopNav] = useState(['이용 전','이용 완료','취소 내역'])
	const [loading, setLoading] = useState(true);
	// 이미지 포함 리뷰 로딩이 완료 되있는 것 판별
	const [isReviewLoading, setIsReviewLoading] = useState(true);
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);



	const getMyReservation = () => {
		// debugger;
		axios({
			method: "GET",
			url: "http://shineware.iptime.org:8081/order/getByUserId",
			params: {
				userId: userInfo.id,
			},
		}).then((res) => {

			if (res.data !== undefined && res.data.length > 0) {
				debugger;
				let filterReviews = res.data.map((review) => {
					if (review.contents.length > 275) {
						review.moreContents = true;
						return review;
					} else {
						review.moreContents = false;
						return review;
					}
				})
				// setMyReviewData((prevState) => (

				// 	[...prevState,
				// 	...filterReviews]
				// ));

				setMyReviewData(() => (
					filterReviews
				));
				setLoading(false);
				// console.log(`getReviews result is ${reviewSummary.averageReviewScore}`);
			}
		}).catch((error) => {
			console.log(error);
			setError(true);
		})

	}


	useEffect(() => {
		// debugger;
		getMyReservation();
	}, [])


	return (
		<div className="site">
			{/* Header */}
			<div className={Style["site-header"]}>
				<div className="site-container">
					<div className={Style["Header-inner"]}>
						<DetailTopNavbar HeaderTitle={'예약 내역'} />
					</div>
					<SelectTopNavbar />
				</div>
			</div>
			{/* .Header */}
			{/* Body */}
			<div className="site-body">
				{/* 컨텐츠 시작 */}
				<div className={Style["TabPage"]}>
					<div className="site-container">
						{/* Body */}
						{/* ReservationList */}
						<div className="ReservationList">
							<ul className={Style["ReservationList-list"]}>
								<li className={Style["ReservationList-item"]}>
									{/* item */}
									<div className={Style["ReservationListItem"]}>
										<div className={Style["ReservationListItemHeader"]}>
											<div className={Style["ReservationListItemHeader-date"]}>2021. 12. 26 (수)</div>
											<Link href={{
												pathname: "/myInfo/myReservation/[roomId]",
												query: { roomId: "123" }
											}}>
												<a href="#;" className={Style["ReservationListItemHeader-link"]}>상세보기</a>
											</Link>
										</div>
										<div className={Style["ReservationListItemBody"]}>
											<div className={Style["ReservationListItemMeta"]}>
												<span className={cx("ReservationListItemMeta-item", "icoHotel")}>호텔</span>
												<span className={Style["ReservationListItemMeta-item"]}>슈페리어 트윈 호텔</span>
											</div>
											<div className={Style["ReservationListItemBox"]}>
												<div className={Style["ReservationListItemBoxThumb"]}>
													<img className={Style["ReservationListItemBoxThumb-img"]} src="../assets/images/dummy/ReservSingleHeader-img.png" alt="" />
												</div>
												<div className={Style["ReservationListItemBoxText"]}>
													<div className={Style["ReservationListItemBoxText-title"]}>슈페리어 트윈 (넷플릭스 - 숙소 문...</div>
													<div className="ReservationListItemBoxMeta">
														<ul className="ReservationListItemBoxMeta-inner">
															<li className={cx("ReservationListItemBoxMeta-item", "ico-Cal")}>12월 26일 ~ 27일</li>
															<li className={cx("ReservationListItemBoxMeta-item", "ico-User")}>성인 1명, 유아 1명</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* .item */}
								</li>
							</ul>
						</div>
						{/* .ReservationList */}
						<div className={Style["ReservationFooter-text"]}>예약내역은 최대 2년까지 조회할 수 있으며, 삭제하신 내역은 노출되지 않습니다.</div>
						{/* .Body */}
					</div>
				</div>
				{/* .컨텐츠 끝 */}
			</div>
			{/* .Body */}
		</div>
	);
}
export default MyReservation;
