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
import { changeDateForm, checkinForm } from '../../shared/js/CommonFun';
import { propertyTypeFilter } from '../../shared/js/CommonFilter';
import * as spinnerActions from "../../redux/store/modules/spinnerOn";

const cx = classNames.bind(Style);

const MyReservation = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo.info);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [beforeUseList, setBeforeUseList] = useState([]);
	const [afterUseList, setAfterUseList] = useState([]);
	const [cancelList, setCancelList] = useState([]);
	const [tabType, setTapType] = useState('beforeUse');

	const getOrderListByUserIdBeforeCheckin = () => {
		// debugger;
		setLoading(true);
		console.log('getOrderListByUserIdBeforeCheckin start!!!');
		axios({
			method: "GET",
			url: DEFAULT_API_URL + "/order/getOrderListByUserIdBeforeCheckin",
			params: {
				userId: userInfo.id,
				authPublisher: userInfo.pub
			},
		}).then((res) => {
			if (res.data !== undefined && res.data.length > 0) {
				console.log(res.data);
				setBeforeUseList(res.data);
				console.log(res.data);
			}
		}).catch((error) => {
			console.log(error);
			setError(true);
		}).finally(() => {
			console.log('finally!!');
			setLoading(false);
		})
	}
	const getOrderListByUserIdAfterCheckout = () => {
		// debugger;
		setLoading(true);
		console.log('getOrderListByUserIdAfterCheckout start!!!');
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
				setBeforeUseList(res.data);
				console.log(res.data);
			}
		}).catch((error) => {
			console.log(error);
			setError(true);
		}).finally(() => {
			console.log('finally!!');
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
				console.log(res.data);
				setBeforeUseList(res.data);
				console.log(res.data);
			}
		}).catch((error) => {
			console.log(error);
			setError(true);
		}).finally(() => {
			console.log('finally!!');
			setLoading(false);
		})
	}

	const peopleTypeForm = (adult, child, baby) => {
		debugger;
		let adultStr = adult > 0 ? '성인 ' + adult + '명' : '';
		let childStr = child > 0 ? '아동 ' + child + '명' : '';
		let babyStr = baby > 0 ? '유아 ' + baby + '명' : '';
		return adultStr + ((adultStr !== '' && (childStr !== '' || babyStr !== '')) ? ', ' : '') + childStr + (babyStr !== '' ? ', ' : '') + babyStr;
	}

	const showList = (type) => {
		switch (type) {
			case 'beforeUse':
				{
					beforeUseList && beforeUseList.map((data, idx) => {
						return (
							<li className={Style["ReservationList-item"]} key={idx}>
								<div className={Style["ReservationListItem"]} >
									<div className={Style["ReservationListItemHeader"]}>
										<div className={Style["ReservationListItemHeader-date"]}>{changeDateForm(data.orderDate)}</div>
										<Link href={{
											pathname: "/myInfo/myReservation/[orderId]",
											query: { orderId: data.orderId }
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
												{data.roomDocument.images.map((img, idx) => {
													if (idx < 1) {
														return (<img className={Style["ReservationListItemBoxThumb-img"]} key={idx} src={"http://" + img} alt="" />)
													}
												})}
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
					})
				}

			case 'afterUse':
				{
					afterUseList && afterUseList.map((data, idx) => {
						return (
							<li className={Style["ReservationList-item"]} key={idx}>
								<div className={Style["ReservationListItem"]} >
									<div className={Style["ReservationListItemHeader"]}>
										<div className={Style["ReservationListItemHeader-date"]}>{changeDateForm(data.orderDate)}</div>
										<Link href={{
											pathname: "/myInfo/myReservation/[orderId]",
											query: { orderId: data.orderId }
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
												{data.roomDocument.images.map((img, idx) => {
													if (idx < 1) {
														return (<img className={Style["ReservationListItemBoxThumb-img"]} key={idx} src={"http://" + img} alt="" />)
													}
												})}
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
					})
				}

			case 'cancelHistory':
				{
					cancelList && cancelList.map((data, idx) => {
						return (
							<li className={Style["ReservationList-item"]} key={idx}>
								<div className={Style["ReservationListItem"]} >
									<div className={Style["ReservationListItemHeader"]}>
										<div className={Style["ReservationListItemHeader-date"]}>{changeDateForm(data.orderDate)}</div>
										<Link href={{
											pathname: "/myInfo/myReservation/[orderId]",
											query: { orderId: data.orderId }
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
												{data.roomDocument.images.map((img, idx) => {
													if (idx < 1) {
														return (<img className={Style["ReservationListItemBoxThumb-img"]} key={idx} src={"http://" + img} alt="" />)
													}
												})}
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
					})
				}
		}
	}

	useEffect(() => {
		// dispatch(spinnerActions.setState(true));
		// getMyReservation();
	}, [])

	useEffect(() => {
		console.log(loading);
		dispatch(spinnerActions.setState(loading));
	}, [loading])

	useEffect(() => {
		console.log('loadingBefore');
		// dispatch(spinnerActions.setState(true));
		switch (tabType) {
			case 'beforeUse':
				getOrderListByUserIdBeforeCheckin();
				break;
			case 'afterUse':
				getOrderListByUserIdAfterCheckout();
				break;
			case 'cancelHistory':
				getCancelOrderListByUserId();
				break;
			default:
				getOrderListByUserIdBeforeCheckin();
		}
		console.log(tabType);
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
								{showList()}
								{/* {beforeUseList && beforeUseList.map((data, idx) => {
									return (
										<li className={Style["ReservationList-item"]} key={idx}>
											<div className={Style["ReservationListItem"]} >
												<div className={Style["ReservationListItemHeader"]}>
													<div className={Style["ReservationListItemHeader-date"]}>{changeDateForm(data.orderDate)}</div>
													<Link href={{
														pathname: "/myInfo/myReservation/[orderId]",
														query: { orderId: data.orderId }
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
															{data.roomDocument.images.map((img, idx) => {
																if (idx < 1) {
																	return (<img className={Style["ReservationListItemBoxThumb-img"]} key={idx} src={"http://" + img} alt="" />)
																}
															})}
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
								})} */}
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
