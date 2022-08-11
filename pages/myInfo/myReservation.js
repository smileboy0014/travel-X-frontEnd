import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Style from "../../styles/Component.module.css";
import DetailTopNavbar from "../../components/NavBar/DetailTopNavbar";
import SelectTopNavbar from "../../components/NavBar/SelectTopNavbar";
import classNames from 'classnames/bind';
import Link from 'next/link';
import { DEFAULT_API_URL } from '../../shared/js/CommonConstant';
import { changeDateForm, checkinForm, peopleTypeForm } from '../../shared/js/CommonFun';
import { propertyTypeFilter } from '../../shared/js/CommonFilter';
import * as spinnerActions from "../../redux/store/modules/spinnerOn";

const cx = classNames.bind(Style);

const MyReservation = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	// const spinnerState = useSelector((state) => state.spinnerOn.state);
	const userInfo = useSelector((state) => state.userInfo.info);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [reservedList, setReservedList] = useState([]);
	const [usedList, setUsedList] = useState([]);
	const [canceledList, setCanceledList] = useState([]);
	const [tabType, setTapType] = useState('');

	const getOrderListByUserIdBeforeCheckout = () => {
		// debugger;
		setLoading(true);
		// console.log('getOrderListByUserIdBeforeCheckout start!!!');
		axios({
			method: "GET",
			url: DEFAULT_API_URL + "/order/getOrderListByUserIdBeforeCheckout",
			params: {
				userId: userInfo.id,
				authPublisher: userInfo.pub
			},
		}).then((res) => {
			if (res.data !== undefined && res.data.length > 0) {
				console.log(res.data);
				setReservedList(res.data);
				// console.log(res.data);
			}
		}).catch((error) => {
			console.log(error);
			setError(true);
		}).finally(() => {
			//console.log('finally!!');
			setLoading(false);
		})
	}

	const getOrderListByUserIdAfterCheckout = () => {
		// debugger;
		setLoading(true);
		// console.log('getOrderListByUserIdAfterCheckout start!!!');
		axios({
			method: "GET",
			url: DEFAULT_API_URL + "/order/getOrderListByUserIdAfterCheckout",
			params: {
				userId: userInfo.id,
				authPublisher: userInfo.pub
			},
		}).then((res) => {
			if (res.data !== undefined && res.data.length > 0) {
				console.log(res.data);
				setUsedList(res.data);
				// console.log(res.data);
			}
		}).catch((error) => {
			console.log(error);
			setError(true);
		}).finally(() => {
			//console.log('finally!!');
			setLoading(false);
		})
	}

	const getCancelOrderListByUserId = () => {
		// debugger;
		setLoading(true);
		console.log('getCancelOrderListByUserId start!!!');
		axios({
			method: "GET",
			url: DEFAULT_API_URL + "/order/getCancelOrderListByUserId",
			params: {
				userId: userInfo.id,
				authPublisher: userInfo.pub
			},
		}).then((res) => {
			if (res.data !== undefined && res.data.length > 0) {
				// console.log(res.data);
				setCanceledList(res.data);
				console.log(res.data);
			}
		}).catch((error) => {
			console.log(error);
			setError(true);
		}).finally(() => {
			//console.log('finally!!');
			setLoading(false);
		})
	}

	const showList = (type) => {
		// console.log(`type showlist is ${type}`);
		switch (type) {
			case 'reserved':
				// console.log(`type showlist is reserved ${type}`);
				return (reservedList && reservedList.map((data, idx) => {
					return (
						<li className={Style["ReservationList-item"]} key={idx}>
							<div className={Style["ReservationListItem"]} >
								<div className={Style["ReservationListItemHeader"]}>
									<div className={Style["ReservationListItemHeader-date"]}>{changeDateForm(data.orderDate)}</div>
									<Link href={{
										pathname: "/myInfo/myReservation/[orderId]",
										query: { orderId: data.orderId, state: type }
									}}>
										<a href="#;" className={Style["ReservationListItemHeader-link"]}>상세보기</a>
									</Link>
								</div>
								<div className={Style["ReservationListItemBody"]}>
									<div className={Style["ReservationListItemMeta"]}>
										<span className={cx("ReservationListItemMeta-item", "icoHotel")}>{propertyTypeFilter(data.roomDocument.propertyType)}</span>
										<span className={Style["ReservationListItemMeta-item"]}>{data.roomDocument.propertyName}</span>
									</div>
									<div className={Style["ReservationListItemBox"]}>
										<div className={Style["ReservationListItemBoxThumb"]}>
											{data.roomDocument.images.length > 0 ? data.roomDocument.images.map((img, idx) => {
												if (idx < 1) {
													return (<img className={Style["ReservationListItemBoxThumb-img"]} key={idx} src={"http://" + img} alt="" />)
												}
											}): ''}
										</div>
										<div className={Style["ReservationListItemBoxText"]}>
											<div className={Style["ReservationListItemBoxText-title"]}>{data.roomDocument.roomName}</div>
											<div className="ReservationListItemBoxMeta">
												<ul className="ReservationListItemBoxMeta-inner">
													<li className={cx("ReservationListItemBoxMeta-item", "ico-Cal")}>{checkinForm(data.checkinDay, data.checkoutDay, data.useType)}</li>
													<li className={cx("ReservationListItemBoxMeta-item", "ico-User")}>{peopleTypeForm(data.adult, data.child, data.baby)}</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					)
				}))

			case 'used':
				return (usedList && usedList.map((data, idx) => {
					return (
						<li className={Style["ReservationList-item"]} key={idx}>
							<div className={cx("ReservationListItem", "is-End")} >
								<div className={Style["ReservationListItemHeader"]}>
									<div className={Style["ReservationListItemHeader-date"]}>{changeDateForm(data.orderDate)}</div>
									<Link href={{
										pathname: "/myInfo/myReservation/[orderId]",
										query: { orderId: data.orderId, state: type }
									}}>
										<a href="#;" className={Style["ReservationListItemHeader-link"]}>상세보기</a>
									</Link>
								</div>
								<div className={Style["ReservationListItemBody"]}>
									<div className={Style["ReservationListItemMeta"]}>
										<span className={cx("ReservationListItemMeta-item", "icoHotel")}>{propertyTypeFilter(data.roomDocument.propertyType)}</span>
										<span className={Style["ReservationListItemMeta-item"]}>{data.roomDocument.propertyName}</span>
									</div>
									<div className={Style["ReservationListItemBox"]}>
										<div className={Style["ReservationListItemBoxThumb"]}>
											{data.roomDocument.images.length > 0 ? data.roomDocument.images.map((img, idx) => {
												if (idx < 1) {
													return (<img className={Style["ReservationListItemBoxThumb-img"]} key={idx} src={"http://" + img} alt="" />)
												}
											}) : ''}
										</div>
										<div className={Style["ReservationListItemBoxText"]}>
											<div className={Style["ReservationListItemBoxText-title"]}>{data.roomDocument.roomName}</div>
											<div className="ReservationListItemBoxMeta">
												<ul className="ReservationListItemBoxMeta-inner">
													<li className={cx("ReservationListItemBoxMeta-item", "ico-Cal")}>{checkinForm(data.checkinDay, data.checkoutDay, data.useType)}</li>
													<li className={cx("ReservationListItemBoxMeta-item", "ico-User")}>{peopleTypeForm(data.adult, data.child, data.baby)}</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					)
				}))

			case 'canceled':
				return (canceledList && canceledList.map((data, idx) => {
					return (
						<li className={Style["ReservationList-item"]} key={idx}>
							<div className={cx("ReservationListItem", "is-End")} >
								<div className={Style["ReservationListItemHeader"]}>
									<div className={Style["ReservationListItemHeader-date"]}>{changeDateForm(data.orderDate)}</div>
									<Link href={{
										pathname: "/myInfo/myReservation/[orderId]",
										query: { orderId: data.orderId, state: type }
									}}>
										<a href="#;" className={Style["ReservationListItemHeader-link"]}>상세보기</a>
									</Link>
								</div>
								<div className={Style["ReservationListItemBody"]}>
									<div className={Style["ReservationListItemMeta"]}>
										<span className={cx("ReservationListItemMeta-item", "icoHotel")}>{propertyTypeFilter(data.roomDocument.propertyType)}</span>
										<span className={Style["ReservationListItemMeta-item"]}>{data.roomDocument.propertyName}</span>
									</div>
									<div className={Style["ReservationListItemBox"]}>
										<div className={Style["ReservationListItemBoxThumb"]}>
											{data.roomDocument.images.length > 0 ? data.roomDocument.images.map((img, idx) => {
												if (idx < 1) {
													return (<img className={Style["ReservationListItemBoxThumb-img"]} key={idx} src={"http://" + img} alt="" />)
												}
											}): ''}
										</div>
										<div className={Style["ReservationListItemBoxText"]}>
											<div className={Style["ReservationListItemBoxText-title"]}>{data.roomDocument.roomName}</div>
											<div className="ReservationListItemBoxMeta">
												<ul className="ReservationListItemBoxMeta-inner">
													<li className={cx("ReservationListItemBoxMeta-item", "ico-Cal")}>{checkinForm(data.checkinDay, data.checkoutDay, data.useType)}</li>
													<li className={cx("ReservationListItemBoxMeta-item", "ico-User")}>{peopleTypeForm(data.adult, data.child, data.baby)}</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					)
				}))
		}
	}

	useEffect(() => {
		// debugger;
		// console.log('userInfo');
		getOrderListByUserIdBeforeCheckout();
	}, [userInfo.id])

	useEffect(() => {
		// console.log(loading);
		dispatch(spinnerActions.setState(loading));
	}, [loading])

	useEffect(() => {
		// console.log('loadingBefore');
		// dispatch(spinnerActions.setState(true));
		switch (tabType) {
			case 'reserved':
				// console.log('reserved');
				reservedList.length = 0;
				getOrderListByUserIdBeforeCheckout();
				break;
			case 'used':
				usedList.length = 0;
				getOrderListByUserIdAfterCheckout();
				break;
			case 'canceled':
				canceledList.length = 0;
				getCancelOrderListByUserId();
				break;
			default:
			// reservedList.length = 0;
			// getOrderListByUserIdBeforeCheckout();
		}
	}, [tabType])

	return (
		<div className="site">
			{/* Header */}
			<div className={Style["site-header"]}>
				<div className="site-container">
					<div className={Style["Header-inner"]}>
						<DetailTopNavbar HeaderTitle={'예약 내역'} />
					</div>
					<SelectTopNavbar tabType={(props) => setTapType(props)} />
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
								{!loading ? showList(tabType) : ''}
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
