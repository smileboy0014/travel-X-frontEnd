import React, { useEffect, useState } from "react";
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";
import Style from "../../../styles/Component.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from 'classnames/bind';
import * as spinnerActions from "../../../redux/store/modules/spinnerOn";
import { DEFAULT_API_URL } from '../../../shared/js/CommonConstant';
import { changeDateForm, checkinForm, peopleTypeForm, priceComma } from '../../../shared/js/CommonFun';
import { propertyTypeFilter } from '../../../shared/js/CommonFilter';

const cx = classNames.bind(Style);

const reviewBtnContents = ['후기 작성하기 (30일 이내)', '후기 작성 완료', '후기 작성 기간 만료'];
const cancelBtnContents = ['예약 취소 요청', '이용 완료', '예약 취소 완료'];
const headerTitles = ['예약 완료 상세', '이용 완료 상세', '취소 내역 상세'];

const MyReservationDetailView = () => {
	const router = useRouter();
	// state는 reserved(예약 완료), used(이용 완료), canceled(취소 내역) 로 구분 됨
	const { id, state } = router.query;
	const dispatch = useDispatch();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const userInfo = useSelector((state) => state.userInfo.info);
	// 예약취소가 가능하면 true, 예약취소가 불가능(이미 체크 인 시간이 지난 경우) 하면 false
	const [possibleCancel, setPossibleCancel] = useState(false);
	const [orderRoom, setOrderRoom] = useState(null);
	const auth = userInfo.auth;

	const getByOrderId = () => {
		setLoading(true);
		// debugger;
		axios({
			method: "GET",
			url: DEFAULT_API_URL + "/order/getByOrderId",
			params: {
				orderId: id
			},
		}).then((res) => {
			if (res.data !== undefined) {
				console.log(res.data);
				setOrderRoom(res.data);
			}
		}).catch((error) => {
			console.log(error);
			setError(true);
		}).finally(() => {
			setLoading(false);
		})
	}

	const orderCancel = () => {
		// debugger;
		const formData = new FormData();
		formData.append('orderId', id);
		axios.post(DEFAULT_API_URL + '/order/cancel', formData)
			.then((res) => {
				if (res.data !== undefined) {
					console.log('success to cancel order!!!!');
				}
			}).catch((e) => {
				console.log(e);
			}).finally(() => {
				router.back();
			})
	}

	const moveToPage = () => {
		router.push('/myInfo/addMyReview?' + new URLSearchParams({
			orderId: id
		}).toString());
	}

	useEffect(() => {
		// console.log(loading);
		dispatch(spinnerActions.setState(loading));
	}, [loading])

	useEffect(() => {
		if (id) {
			getByOrderId();
		}
	}, [id])

	return (
		<div className="site">
			{/* Header */}
			<div className={Style["site-header"]}>
				<div className="site-container">
					<div className={Style["Header-inner"]}>
						<DetailTopNavbar HeaderTitle={state && (state === 'reserved' ? headerTitles[0] : (state === 'used' ? headerTitles[1] : headerTitles[2]))} />
					</div>
				</div>
			</div>
			{/* .Header *}/
     
       {/* Body */}
			<div className="site-body">
				{(orderRoom && !loading) ? <div className={Style["ReservationPage"]}>
					{/* ReservSingleHeader */}
					<div className={Style["ReservSingleHeader"]}>
						<div className="site-container">
							<div className={Style["ReservSingleHeader-date"]}>{changeDateForm(orderRoom.orderDate)}</div>
							<div className="ReservSingleHeaderCont">
								<div className={Style["ReservSingleHeaderMeta"]}>
									<span className={cx("ReservSingleHeaderMeta-item", "icoHotel")}>{propertyTypeFilter(orderRoom.roomDocument.propertyType)}</span>
									<span className={Style["ReservSingleHeaderMeta-item"]}>{orderRoom.roomDocument.propertyName}</span>
								</div>
								<div className={Style["ReservSingleHeaderBox"]}>
									<div className={Style["ReservSingleHeaderBoxThumb"]}>
										{/* <img className={Style["ReservSingleHeaderBoxThumb-img"]} src="../assets/images/dummy/ReservSingleHeader-img.png" alt="" /> */}
										{orderRoom.roomDocument.images.length > 0 ? orderRoom.roomDocument.images.map((img, idx) => {
											if (idx < 1) {
												return (<img className={Style["ReservationListItemBoxThumb-img"]} key={idx} src={"http://" + img} alt="" />)
											}
										}) : ''}
									</div>
									<div className={Style["ReservSingleHeaderBoxText"]}>
										<div className={Style["ReservSingleHeaderBoxText-title"]}>{orderRoom.roomDocument.roomName}</div>
										<div className="ReservSingleHeaderBoxMeta">
											<ul className="ReservSingleHeaderBoxMeta-inner">
												<li className={cx("ReservSingleHeaderBoxMeta-item", "ico-Cal")}>{checkinForm(orderRoom.checkinDay, orderRoom.checkoutDay, orderRoom.useType)}</li>
												<li className={cx("ReservSingleHeaderBoxMeta-item", "ico-User")}>{peopleTypeForm(orderRoom.adult, orderRoom.child, orderRoom.baby)}</li>
											</ul>
										</div>
									</div>
								</div>
								{/* {state !== 'used' ? '' : <div className="ReservSingleHeaderBtn"> */}
									{/*<div className="ReservSingleHeaderBtn-btn is-disable">후기 작성하기 (30일 이내)</div> 후기작성 종료 */}
									{/*<div className="ReservSingleHeaderBtn-btn is-disable">후기 작성 완료</div> 후기작성 완료 */}
									{/*<div className="ReservSingleHeaderBtn-btn is-disable">후기 작성 기간 만료</div> 후기작성 기간 만료 */}
									<button type="button" className={orderRoom.reviewWritable ? cx("ReservSingleHeaderBtn-btn") : cx("ReservSingleHeaderBtn-btn", "is-disable")}
										disabled={orderRoom.hasReview}
										onClick={() => orderRoom.reviewWritable ? moveToPage() : ''}>
										{(orderRoom.reviewWritable) ? reviewBtnContents[1] : reviewBtnContents[0]}</button>
								{/* </div>} */}
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
												<dd className={Style["FloatListText-text"]}>{orderRoom.name}</dd>
											</dl>
										</div>
										<div className={Style["FloatListText"]}>
											<dl className={Style["FloatListText-inner"]}>
												<dt className={Style["FloatListText-title"]}>휴대폰 번호</dt>
												<dd className={Style["FloatListText-text"]}>{orderRoom.phoneNumber}</dd>
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
												<dd className={Style["FloatListText-text"]}>{priceComma(orderRoom.basePrice + orderRoom.extraPrice + orderRoom.optionPrice)}원</dd>
											</dl>
										</div>
										<div className={Style["ReservSingleBodyItem-total"]}>
											<div className={Style["FloatListText"]}>
												<dl className={Style["FloatListText-inner"]}>
													<dt className={Style["FloatListText-title"]}>결제 금액</dt>
													<dd className={cx("FloatListText-text", "total-Text")}>{priceComma(orderRoom.basePrice + orderRoom.extraPrice + orderRoom.optionPrice)}원</dd>
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
							<button type="button" className={(possibleCancel || state === 'reserved') ? cx("BttonFixButton-button") : cx("BttonFixButton-button", "is-disable")}
								onClick={() => state === 'reserved' ? orderCancel() : ''}>{state === 'reserved' ? cancelBtnContents[0] : (state === 'used' ? cancelBtnContents[1] : cancelBtnContents[2])}</button>{/* 컨텐츠 등록할시 is-disable 클래스 삭제 클릭가능 */}
						</div>
					</div>
					{/* .BttonFixButton */}
				</div>
					: ''}
			</div>
			{/* .Body */}
		</div>
	)
}


export default MyReservationDetailView;
