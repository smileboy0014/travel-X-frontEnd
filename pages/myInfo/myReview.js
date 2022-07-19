import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Style from "../../styles/Component.module.css";
import LayerGallery from "../../components/Review/Gallery/LayerGallery";
import DetailTopNavbar from "../../components/NavBar/DetailTopNavbar";
import ReviewDetailCarousel from "../../components/Card/Carousel/ReviewDetailCarousel";
import MyReviewMoreModal from "../../components/Modal/MyReview/MyReviewMoreModal";
import MyReviewDeleteModal from "../../components/Modal/MyReview/MyReviewDeleteModal";
import classNames from 'classnames/bind';
import Link from 'next/link';
import {propertyTypeFilter} from '../../shared/js/CommonFilter';
import {DEFAULT_API_URL} from '../../shared/js/CommonConstant';
import {changeDateForm} from '../../shared/js/CommonFun';


const cx = classNames.bind(Style);

const MyReview = () => {
	const router = useRouter();
	const userInfo = useSelector((state) => state.userInfo.info);
	const [from, setFrom] = useState(0);
	const [size, setSize] = useState(10);
	const [loading, setLoading] = useState(true);
	// 이미지 포함 리뷰 로딩이 완료 되있는 것 판별
	const [isReviewLoading, setIsReviewLoading] = useState(true);
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);
	const [returnCallHttpMethod, setReturnCallHttpMethod] = useState(false);
	const [myReviewData, setMyReviewData] = useState([]);
	const [layerGalleryList, setLayerGalleryList] = useState([]);
	const [layerGalleryOpen, setLayerGalleryOpen] = useState(false);
	const [myReviewMoreModalOpen, setMyReviewMoreModalOpen] = useState(false);
	const [myReviewDeleteModalOpen, setMyReviewDeleteModalOpen] = useState(false);
	const [selectReview, setSelectReview] = useState({});

	const getMyReviews = () => {
		// debugger;
		axios({
			method: "GET",
			url: DEFAULT_API_URL+"/review/getByUserId",
			params: {
				userId: userInfo.id,
				from: from,
				size: size
			},
		}).then((res) => {
			console.log(res.data);
			if (res.data !== undefined && res.data.length > 0) {
				// debugger;
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
				// debugger;
				setMyReviewData(filterReviews);
				setLoading(false);
				// console.log(`getReviews result is ${reviewSummary.averageReviewScore}`);
			}
		}).catch((error) => {
			console.log(error);
			setError(true);
		})

	}

	const handleViewDetailCarousel = (item) => {
		if (item.hasImage) {
			return (<ReviewDetailCarousel reviewLoading={() => setIsReviewLoading(false)} galleryData={(data) => setLayerGalleryList(data)} data={item.imageIdList} />);
		}
	}

	const onClickHandler = (type, data, index) => {
		if (type === 'moreView') {
			// debugger;
			setSelectReview(myReviewData[index]);
			setMyReviewMoreModalOpen(true);
		}
		else if (type === 'disappear') {
			if (index > 0) {
				setMyReviewData((arr) => {
					return [
						...arr.slice(0, index),
						{ ...data, moreContents: false },
						...arr.slice(index + 1)
					];
				});
			} else {
				setMyReviewData((arr) => {
					return [
						{ ...data, moreContents: false },
						...arr.slice(index + 1)
					];
				});
			}

		}
	}

	const execReturnType = (type) => {

		if (type === 'delete') {

			setMyReviewMoreModalOpen(false);
			setMyReviewDeleteModalOpen(true);
		} else {
			router.push('/myInfo/modifyMyReview');
		}

	}

	useEffect(() => {
		// debugger;
		// console.log(`is review loading is ${isReviewLoading}`);
		if (!isReviewLoading) {
			// 강제로 리뷰 이미지 불러왔을 때 리랜더링 하기!!!
			setTimeout(() => {
				forceUpdate();
			}, 500)

			// console.log(`force update!!!!!`);
		}
	}, [isReviewLoading])

	useEffect(() =>{
		// debugger;
		if(returnCallHttpMethod){
			// debugger;
			getMyReviews();
			
			setReturnCallHttpMethod(false);

		}
	},[returnCallHttpMethod])

	useEffect(() => {
		if (layerGalleryList != null && layerGalleryList.length > 0) {
			setLayerGalleryOpen(true);
		}
	}, [layerGalleryList]);

	useEffect(() => {
		if (!layerGalleryOpen) {
			setLayerGalleryList([]);
		}

	}, [layerGalleryOpen]);


	useEffect(() => {
		// debugger;
	
			getMyReviews();
		
	}, [])


	return (
		<div className="site">
			{/* Header */}
			<div className={Style["site-header"]}>
				<div className="site-container">
					<div className={Style["Header-inner"]}>
						<DetailTopNavbar HeaderTitle={'나의 후기'} />
					</div>
				</div>
			</div>
			{/* .Header */}
			{/* Body */}
			<div className="site-body">
				{/* 컨텐츠 시작 */}
				<div className={Style["MyReviewPage"]}>
					{/* ReviewHeader */}
					<div className={Style["MyReviewHeader"]}>
						<div className="site-container">
							<div className={Style["MyReviewHeader-text"]}>* 후기는 작성 후 24시간 이내에 수정이 가능합니다<br />* 삭제한 후기는 복구할 수 없습니다.<br />* 운영정책에 따라 올바르지 않은 후기는 삭제될 수 있습니다.</div>
						</div>
					</div>
					{/* .ReviewHeader */}

					{/* temporary */}
					<Link href={{
						pathname: "/myInfo/addMyReview"
					}}>
						<button type="button" className={Style["FilterPopFooter-button"]}>
							등록
						</button>
					</Link>
					{/* .temporary */}

					{!loading && myReviewData.length > 0 && myReviewData.map((item, index) =>

						<div className="ReviewPost" key={index}>
							{/* item */}
							<div className={Style["MyReviewPostItem"]}>
								<div className={Style["ReviewPostItemSecHead"]}>
									<button type="button" className={Style["ReviewPostMore"]} onClick={() => onClickHandler('moreView','',index)}>
										<span className="ab-text">
											더보기
										</span>
									</button>
									<div className={Style["ReviewPostItemSecHeadMeta"]}>
										<span className={cx("ReviewPostItemSecHeadMeta-item", "icoHotel")}>{propertyTypeFilter(item.roomDocument.propertyType)}</span>
										<span className={Style["ReviewPostItemSecHeadMeta-item"]}>{item.roomDocument.propertyName}</span>
									</div>
									<div className={Style["ReviewPostItemSecHeadTitle"]}>{item.roomDocument.roomName}</div>
								</div>
								<div className={Style["ReviewPostItemMeta"]}>
									<div className="ReviewPostItemMetaHead">
										<div className={Style["ReviewPostItemMetaHead-name"]}>{item.userId}</div>

										<div className={Style["BasicGrade"]}>

											<div className={Style["BasicGradeStar"]}>
												<span className={cx("BasicGradeStar-item", "check")}></span>
											</div>

											<div className={Style["BasicGradeCount"]}>{item.averageScore} /5</div>
										</div>
									</div>
									<div className={Style["ReviewPostItemMeta-date"]}>{changeDateForm(item.date)}</div>
								</div>
								<div className={Style["ReviewPostItemText"]}>
									<button type="button" style={item.moreContents !== undefined && item.moreContents == true ? { display: 'block' } : { display: 'none' }} className={Style["ReviewPostItemTextBtn"]} onClick={() => onClickHandler('disappear', item, index)}>...<span className={Style["ReviewPostItemTextBtn-text"]}>더읽기</span></button>

									<div className={Style["ReviewPostItemText-crop"]}>{item.contents}</div>
								</div>
								{/* slide */}
								{/* <!-- slide --> */}
								<div>
									{handleViewDetailCarousel(item)}
								</div>
								{/* RewviewAnswer */}
								{item.reviewReply.data != null ? <div className={Style["RewviewAnswer"]}>
									<div className={Style["RewviewAnswerHeader"]}>
										<div className={Style["RewviewAnswerHeader-name"]}>호텔주인</div>
										<div className={Style["RewviewAnswerHeader-date"]}>{changeDateForm(item.reviewReply.data)}</div>
									</div>
									<div className={Style["RewviewAnswerText"]}>{item.reviewReply.data}
									</div>
								</div> : <div></div>}

								{/* .RewviewAnswer */}
							</div>
							{/* .item */}
						</div>
					)}
				</div>
				{/* .컨텐츠 끝 */}
			</div>
			{/* .Body */}
			{/* <!-- LayerGallery --> */}
			<LayerGallery data={layerGalleryList} isOpen={layerGalleryOpen} onRequestClose={() => setLayerGalleryOpen(false)} />
			{/* <!-- .LayerGallery --> */}
			<MyReviewMoreModal isOpen={myReviewMoreModalOpen} onRequestClose={() => setMyReviewMoreModalOpen(false)} returnType={(type) => execReturnType(type)} />
			<MyReviewDeleteModal selectReview={selectReview} isOpen={myReviewDeleteModalOpen} 
			onRequestClose={() => setMyReviewDeleteModalOpen(false)}
			methodCallBack={(type) => setReturnCallHttpMethod(type)}
			 />
		</div>
	);
}
export default MyReview;
