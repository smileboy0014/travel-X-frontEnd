import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { propertyTypeFilter } from '../../shared/js/CommonFilter';
import * as spinnerActions from "../../redux/store/modules/spinnerOn";
import Style from "../../styles/Component.module.css";
import { DEFAULT_API_URL } from '../../shared/js/CommonConstant';
import DetailTopNavbar from "../../components/NavBar/DetailTopNavbar";
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';

const cx = classNames.bind(Style);

const ModifyMyReview = () => {
	const router = useRouter();
	const [imgBase64, setImgBase64] = useState([]); // 파일 base64
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [validation, setValidation] = useState({
		kindnessScore: true,
		cleanScore: true,
		comfortScore: true,
		facilityScore: true,
		priceScore: true,
		reviewContent: true

	});
	const dispatch = useDispatch();
	const [imgFile, setImgFile] = useState(null);	//파일	
	const [viewImgList, setViewImgList] = useState([]);
	const { reviewId } = router.query;
	const [reviewData, setReveiwData] = useState(null);
	const [kindnessScore, setKindnessScore] = useState(0);
	const [cleanScore, setCleanScore] = useState(0);
	const [comfortScore, setComfortScore] = useState(0);
	const [facilityScore, setFacilityScore] = useState(0);
	const [priceScore, setPriceScore] = useState(0);
	const [reviewContent, setReviewContent] = useState('');
	const handleChangeFile = (event) => {

		console.log(event.target.files)
		setImgFile(event.target.files);
		//fd.append("file", event.target.files)
		setImgBase64([]);
		for (var i = 0; i < event.target.files.length; i++) {
			if (event.target.files[i]) {
				let reader = new FileReader();
				reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
				// 파일 상태 업데이트
				reader.onloadend = () => {
					// 2. 읽기가 완료되면 아래코드가 실행됩니다.
					const base64 = reader.result;
					// console.log(base64)
					if (base64) {
						//  images.push(base64.toString())
						var base64Sub = base64.toString()

						setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
						//  setImgBase64(newObj);
						// 파일 base64 상태 업데이트
						//  console.log(images)
					}
				}
			}
		}
	}

	const reviewUpdate = () =>{
		const formData = new FormData();

		if (imgFile != undefined) {
			for (let i = 0; i < imgFile.length; i++) {
				formData.append('imageList[' + i + ']', imgFile[i]);
				// imageList.push(imgFile[i]);
			}
		}
		formData.append('review.authPublisher', reviewData.authPublisher);
		formData.append('review.cleanScore', cleanScore);
		formData.append('review.comfortScore', comfortScore);
		formData.append('review.facilityScore', facilityScore);
		formData.append('review.kindnessScore', kindnessScore);
		formData.append('review.priceScore', priceScore);
		// formData.append('review.title',reviewContent.title);
		formData.append('review.contents', reviewContent);
		formData.append('review.roomId', reviewData.roomId);
		formData.append('review.useType', "NIGHT");
		formData.append('review.userId', reviewData.userId);

		// debugger;

		axios({
			method: "POST",
			url: DEFAULT_API_URL + "/review/update",
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}).then((res) => {
			console.log(`save is successed!!`);
			console.log(res);
		})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				router.back();
			})
	}

	const getReviewById = () => {
		setLoading(true);
		console.log(reviewId);
		// debugger;
		axios({
			method: "GET",
			url: DEFAULT_API_URL + "/review/getReviewById",
			params: {
				reviewId: reviewId
			},
		}).then((res) => {
			if (res.data !== undefined) {
				console.log(res.data);
				setReveiwData(res.data);
				console.log(res.data.kindnessScore);
				setKindnessScore(res.data.kindnessScore);
				setCleanScore(res.data.cleanScore);
				setComfortScore(res.data.comfortScore);
				setFacilityScore(res.data.facilityScore);
				setPriceScore(res.data.priceScore);
				setReviewContent(res.data.contents);
			}
		}).catch((error) => {
			console.log(error);
			setError(true);
		}).finally(() => {
			setLoading(false);
		})
	}

	

	const setContentValue = (e) => {
		const { value } = e.target;
		setReviewContent(value);
		// console.log(reviewContent);

	}

	const handleValidation = (name, value) => {
		setValidation({ ...validation, [name]: value });
	}

	const setScore = (e) => {
		// debugger;
		let strArr = e.currentTarget.id.split('-');

		switch (strArr[0]) {
			case 'star1':

				setKindnessScore(parseInt(strArr[1]));
				handleValidation('kindnessScore',true);
				// console.log(kindnessScore);
				break;
			case 'star2':
				setCleanScore(parseInt(strArr[1]));
				handleValidation('cleanScore',true);
				// console.log(cleanScore);
				break;
			case 'star3':
				setComfortScore(parseInt(strArr[1]));
				handleValidation('comfortScore',true);
				// console.log(comfortScore);
				break;
			case 'star4':
				setFacilityScore(parseInt(strArr[1]));
				handleValidation('facilityScore',true);
				// console.log(facilityScore);
				break;
			case 'star5':
				setPriceScore(parseInt(strArr[1]));
				handleValidation('priceScore',true);
				// console.log(priceScore);
				break;
		}
	}

	const validationAllTrue = () =>{
		if(validation.kindnessScore && validation.cleanScore && validation.comfortScore 
			&& validation.facilityScore && validation.priceScore && validation.reviewContent ){
					return true;
		} else {
			return false;
		}
	}

	const handleStarBar = (type) => {

		switch (type) {
			case '친절함':
				return (
					<li className={Style["ReviewEditGrade-item"]}>
						<dl className={Style["ReviewEditGrade-inner"]}>
							<dt className={Style["ReviewEditGrade-title"]}>{type}</dt>
							<dd className={Style["ReviewEditGrade-cont"]}>
								{/* EditStar */}
								<div className={Style["EditStar"]}>
									<input type="radio" className={Style["EditStar-input"]} checked={kindnessScore == 5} id="star1-5" name="star1" onChange={setScore} />
									<label htmlFor="star1-5" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={kindnessScore == 4} id="star1-4" name="star1" onChange={setScore} />
									<label htmlFor="star1-4" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={kindnessScore == 3} id="star1-3" name="star1" onChange={setScore} />
									<label htmlFor="star1-3" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={kindnessScore == 2} id="star1-2" name="star1" onChange={setScore} />
									<label htmlFor="star1-2" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={kindnessScore == 1} id="star1-1" name="star1" onChange={setScore} />
									<label htmlFor="star1-1" className={Style["EditStar-label"]}></label>
								</div>
								{/* .EditStar */}
							</dd>
						</dl>
					</li>

				)

			case '청결도':
				return (
					<li className={Style["ReviewEditGrade-item"]}>
						<dl className={Style["ReviewEditGrade-inner"]}>
							<dt className={Style["ReviewEditGrade-title"]}>{type}</dt>
							<dd className={Style["ReviewEditGrade-cont"]}>
								{/* EditStar */}
								<div className={Style["EditStar"]}>
									<input type="radio" className={Style["EditStar-input"]} checked={cleanScore == 5} id="star2-5" name="star2" onChange={setScore} />
									<label htmlFor="star2-5" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={cleanScore == 4} id="star2-4" name="star2" onChange={setScore} />
									<label htmlFor="star2-4" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={cleanScore == 3} id="star2-3" name="star2" onChange={setScore} />
									<label htmlFor="star2-3" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={cleanScore == 2} id="star2-2" name="star2" onChange={setScore} />
									<label htmlFor="star2-2" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={cleanScore == 1} id="star2-1" name="star2" onChange={setScore} />
									<label htmlFor="star2-1" className={Style["EditStar-label"]}></label>
								</div>
								{/* .EditStar */}
							</dd>
						</dl>
					</li>

				)

			case '편안함':
				return (
					<li className={Style["ReviewEditGrade-item"]}>
						<dl className={Style["ReviewEditGrade-inner"]}>
							<dt className={Style["ReviewEditGrade-title"]}>{type}</dt>
							<dd className={Style["ReviewEditGrade-cont"]}>
								{/* EditStar */}
								<div className={Style["EditStar"]}>
									<input type="radio" className={Style["EditStar-input"]} checked={comfortScore == 5} id="star3-5" name="star3" onChange={setScore} />
									<label htmlFor="star3-5" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={comfortScore == 4} id="star3-4" name="star3" onChange={setScore} />
									<label htmlFor="star3-4" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={comfortScore == 3} id="star3-3" name="star3" onChange={setScore} />
									<label htmlFor="star3-3" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={comfortScore == 2} id="star3-2" name="star3" onChange={setScore} />
									<label htmlFor="star3-2" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={comfortScore == 1} id="star3-1" name="star3" onChange={setScore} />
									<label htmlFor="star3-1" className={Style["EditStar-label"]}></label>
								</div>
								{/* .EditStar */}
							</dd>
						</dl>
					</li>
				)


			case '시설':
				return (
					<li className={Style["ReviewEditGrade-item"]}>
						<dl className={Style["ReviewEditGrade-inner"]}>
							<dt className={Style["ReviewEditGrade-title"]}>{type}</dt>
							<dd className={Style["ReviewEditGrade-cont"]}>
								{/* EditStar */}
								<div className={Style["EditStar"]}>
									<input type="radio" className={Style["EditStar-input"]} checked={facilityScore == 5} id="star4-5" name="star4" onChange={setScore} />
									<label htmlFor="star4-5" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={facilityScore == 4} id="star4-4" name="star4" onChange={setScore} />
									<label htmlFor="star4-4" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={facilityScore == 3} id="star4-3" name="star4" onChange={setScore} />
									<label htmlFor="star4-3" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={facilityScore == 2} id="star4-2" name="star4" onChange={setScore} />
									<label htmlFor="star4-2" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={facilityScore == 1} id="star4-1" name="star4" onChange={setScore} />
									<label htmlFor="star4-1" className={Style["EditStar-label"]}></label>
								</div>
								{/* .EditStar */}
							</dd>
						</dl>
					</li>

				)

			case '가격 대비 만족도':
				return (
					<li className={Style["ReviewEditGrade-item"]}>
						<dl className={Style["ReviewEditGrade-inner"]}>
							<dt className={Style["ReviewEditGrade-title"]}>{type}</dt>
							<dd className={Style["ReviewEditGrade-cont"]}>
								{/* EditStar */}
								<div className={Style["EditStar"]}>
									<input type="radio" className={Style["EditStar-input"]} checked={priceScore == 5} id="star5-5" name="star5" onChange={setScore} />
									<label htmlFor="star5-5" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={priceScore == 4} id="star5-4" name="star5" onChange={setScore} />
									<label htmlFor="star5-4" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={priceScore == 3} id="star5-3" name="star5" onChange={setScore} />
									<label htmlFor="star5-3" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={priceScore == 2} id="star5-2" name="star5" onChange={setScore} />
									<label htmlFor="star5-2" className={Style["EditStar-label"]}></label>
									<input type="radio" className={Style["EditStar-input"]} checked={priceScore == 1} id="star5-1" name="star5" onChange={setScore} />
									<label htmlFor="star5-1" className={Style["EditStar-label"]}></label>
								</div>
								{/* .EditStar */}
							</dd>
						</dl>
					</li>

				)
		}
	}

	useEffect(() => {

		if (imgFile) {
			const nowImgList = [];
			for (let image of imgFile) {
				const nowImgUrl = URL.createObjectURL(image);
				nowImgList.push(nowImgUrl);
			}
			setViewImgList(nowImgList);
		}

	}, [imgFile])

	useEffect(() => {
		// console.log(orderId);
		getReviewById();
	}, [reviewId]);

	useEffect(() => {
		// console.log(loading);
		dispatch(spinnerActions.setState(loading));
	}, [loading])

	useEffect(()=>{
		handleValidation('reviewContent',  reviewContent.length > 0 ? true : false);

	},[reviewContent])

	return (
		<div className="site">
			{/* Header */}
			<div className={Style["site-header"]}>
				<div className="site-container">
					<div className={Style["Header-inner"]}>
						<DetailTopNavbar HeaderTitle={'후기 수정'} />
					</div>
				</div>
			</div>
			{/* .Header */}
			{/* Body */}
			<div className="site-body">
				{/* 컨텐츠 시작 */}

				{(!loading && reviewData) ? (<div className={Style["ReviewEditPage"]}>
					{/* Body */}
					{/* ReviewEditHeader */}
					<div className={Style["ReviewEditHeader"]}>
						<div className="site-container">
							<div className={Style["ReviewEditHeaderMeta"]}>
								<span className={cx("ReviewEditHeaderMeta-item", "icoHotel")}>{propertyTypeFilter(reviewData.roomDocument.propertyType)}</span>
								<span className={Style["ReviewEditHeaderMeta-item"]}>{reviewData.roomDocument.propertyName}</span>
							</div>
							<div className={Style["ReviewEditHeaderTitle"]}>{reviewData.roomDocument.roomName}</div>
						</div>
					</div>
					{/* .ReviewEditHeader */}
					{/* ReviewEditGrade */}
					<div className={Style["ReviewEditGradeSection"]}>
						<div className="site-container">
							<div className={Style["ReviewEditGradeSection-title"]}>이곳에서의 경험은 어떠셨나요?</div>
							<div className="ReviewEditGrade">
								<ul className="ReviewEditGrade-list">
									{handleStarBar('친절함')}
									{handleStarBar('청결도')}
									{handleStarBar('편안함')}
									{handleStarBar('시설')}
									{handleStarBar('가격 대비 만족도')}
								</ul>
							</div>
						</div>
					</div>
					{/* .ReviewEditGrade */}
					{/* ReviewEditSection */}
					<div className={Style["ReviewEditSection"]}>
						<div className="site-container">
							<div className={Style["ReviewEditSection-title"]}>후기를 작성해 주세요</div>
							<div className="ReviewEditSectionArea">
								<textarea className={Style["ReservationInput-area"]} defaultValue={reviewContent} placeholder="개인 정보 보호를 위해 고객님의 개인 정보를 입력하지 마세요. (10자 이상 작성해주세요.)" onChange={setContentValue}></textarea>
								<div className={Style["ContactSectionCount"]}><span className={Style["ContactSectionCount-text"]}>0/1000</span></div>
							</div>
							{/* EditImageSec */}
							<div className={Style["EditImageSec"]}>
								<div className={Style["EditImageSecLink"]}>
									<input type="file" id="file" multiple={true} className={Style["EditImageSecLink-input"]} onChange={handleChangeFile} />
									<span className={Style["EditImageSecLinkText"]}>사진 첨부하기<br />(최대 5장)</span>
								</div>
								{/* Slide */}
								<Swiper
									modules={[Pagination]}
									pagination={true}
									spaceBetween={10}
									slidesPerView={3}
								>
									{viewImgList &&
										viewImgList.map((item, index) => (
											<SwiperSlide key={index}>
												<div className={Style["EditImageSlideItem"]}>
													<button type="button" className={Style["EditImageSlideItem-close"]}><span className={"ab-text"}>Close</span></button>
													<img
														src={item}
														alt="room-img"
													/>
												</div>
											</SwiperSlide>
										))}
								</Swiper>
								{/* .Slide */}
							</div>
							{/* .EditImageSec */}
						</div>
					</div>
					{/* .ReviewEditSection */}
					{/* .Body */}
					{/* BttonFixButton */}
					<div className={Style["BttonFixButton"]}>
						<div className="site-container">
							<button type="button"  className={(validationAllTrue()) ? Style["BttonFixButton-button"]  : cx("BttonFixButton-button", "is-disable")}
							disabled={!validationAllTrue()} onClick={()=>reviewUpdate()} >작성 완료</button>{/* 컨텐츠 등록할시 is-disable 클래스 삭제 클릭가능 */}
							{/*<button type="button" className={Style["BttonFixButton-button"]}>수정 완료</button]}>*/}
						</div>
					</div>
					{/* .BttonFixButton */}
				</div>) : ''}



				{/* .컨텐츠 끝 */}
			</div>
			{/* .Body */}
		</div>
	);
}
export default ModifyMyReview;
