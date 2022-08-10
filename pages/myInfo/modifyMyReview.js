import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Style from "../../styles/Component.module.css";
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

	const [imgBase64, setImgBase64] = useState([]); // 파일 base64
	const [imgFile, setImgFile] = useState(null);	//파일	
	const [viewImgList, setViewImgList] = useState([]);

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

	return (
		<div className="site">
			{/* Header */}
			<div className={Style["site-header"]}>
				<div className="site-container">
					<div className={Style["Header-inner"]}>
						<DetailTopNavbar HeaderTitle={'후기 작성'} />
					</div>
				</div>
			</div>
			{/* .Header */}
			{/* Body */}
			<div className="site-body">
				{/* 컨텐츠 시작 */}
				<div className={Style["ReviewEditPage"]}>
					{/* Body */}
					{/* ReviewEditHeader */}
					<div className={Style["ReviewEditHeader"]}>
						<div className="site-container">
							<div className={Style["ReviewEditHeaderMeta"]}>
								<span className={cx("ReviewEditHeaderMeta-item", "icoHotel")}>호텔</span>
								<span className={Style["ReviewEditHeaderMeta-item"]}>슈페리어 트윈 호텔</span>
							</div>
							<div className={Style["ReviewEditHeaderTitle"]}>슈페리어 트윈 (넷플릭스 - 숙소 문의)</div>
						</div>
					</div>
					{/* .ReviewEditHeader */}
					{/* ReviewEditGrade */}
					<div className={Style["ReviewEditGradeSection"]}>
						<div className="site-container">
							<div className={Style["ReviewEditGradeSection-title"]}>이곳에서의 경험은 어떠셨나요?</div>
							<div className="ReviewEditGrade">
								<ul className="ReviewEditGrade-list">
									<li className={Style["ReviewEditGrade-item"]}>
										<dl className={Style["ReviewEditGrade-inner"]}>
											<dt className={Style["ReviewEditGrade-title"]}>친절함</dt>
											<dd className={Style["ReviewEditGrade-cont"]}>
												{/* EditStar */}
												<div className={Style["EditStar"]}>
													<input type="radio" className={Style["EditStar-input"]} id="star1-5" name="start1" />
													<label htmlFor="star1-5" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="star1-4" name="start1" />
													<label htmlFor="star1-4" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="star1-3" name="start1" />
													<label htmlFor="star1-3" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="star1-2" name="start1" />
													<label htmlFor="star1-2" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="star1-1" name="start1" />
													<label htmlFor="star1-1" className={Style["EditStar-label"]}></label>
												</div>
												{/* .EditStar */}
											</dd>
										</dl>
									</li>
									<li className={Style["ReviewEditGrade-item"]}>
										<dl className={Style["ReviewEditGrade-inner"]}>
											<dt className={Style["ReviewEditGrade-title"]}>청결도</dt>
											<dd className={Style["ReviewEditGrade-cont"]}>
												{/* EditStar */}
												<div className={Style["EditStar"]}>
													<input type="radio" className={Style["EditStar-input"]} id="start2-5" name="start2" />
													<label htmlFor="start2-5" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start2-4" name="start2" />
													<label htmlFor="start2-4" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start2-3" name="start2" />
													<label htmlFor="start2-3" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start2-2" name="start2" />
													<label htmlFor="start2-2" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start2-1" name="start2" />
													<label htmlFor="start2-1" className={Style["EditStar-label"]}></label>
												</div>
												{/* .EditStar */}
											</dd>
										</dl>
									</li>
									<li className={Style["ReviewEditGrade-item"]}>
										<dl className={Style["ReviewEditGrade-inner"]}>
											<dt className={Style["ReviewEditGrade-title"]}>편안함</dt>
											<dd className={Style["ReviewEditGrade-cont"]}>
												{/* EditStar */}
												<div className={Style["EditStar"]}>
													<input type="radio" className={Style["EditStar-input"]} id="start3-5" name="start3" />
													<label htmlFor="start3-5" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start3-4" name="start3" />
													<label htmlFor="start3-4" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start3-3" name="start3" />
													<label htmlFor="start3-3" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start3-2" name="start3" />
													<label htmlFor="start3-2" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start3-1" name="start3" />
													<label htmlFor="start3-1" className={Style["EditStar-label"]}></label>
												</div>
												{/* .EditStar */}
											</dd>
										</dl>
									</li>
									<li className={Style["ReviewEditGrade-item"]}>
										<dl className={Style["ReviewEditGrade-inner"]}>
											<dt className={Style["ReviewEditGrade-title"]}>시설</dt>
											<dd className={Style["ReviewEditGrade-cont"]}>
												{/* EditStar */}
												<div className={Style["EditStar"]}>
													<input type="radio" className={Style["EditStar-input"]} id="start4-5" name="start4" />
													<label htmlFor="start4-5" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start4-4" name="start4" />
													<label htmlFor="start4-4" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start4-3" name="start4" />
													<label htmlFor="start4-3" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start4-2" name="start4" />
													<label htmlFor="start4-2" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start4-1" name="start4" />
													<label htmlFor="start4-1" className={Style["EditStar-label"]}></label>
												</div>
												{/* .EditStar */}
											</dd>
										</dl>
									</li>
									<li className={Style["ReviewEditGrade-item"]}>
										<dl className={Style["ReviewEditGrade-inner"]}>
											<dt className={Style["ReviewEditGrade-title"]}>가격 대비 만족도</dt>
											<dd className={Style["ReviewEditGrade-cont"]}>
												{/* EditStar */}
												<div className={Style["EditStar"]}>
													<input type="radio" className={Style["EditStar-input"]} id="start5-5" name="start5" />
													<label htmlFor="start5-5" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start5-4" name="start5" />
													<label htmlFor="start5-4" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start5-3" name="start5" />
													<label htmlFor="start5-3" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start5-2" name="start5" />
													<label htmlFor="start5-2" className={Style["EditStar-label"]}></label>
													<input type="radio" className={Style["EditStar-input"]} id="start5-1" name="start5" />
													<label htmlFor="start5-1" className={Style["EditStar-label"]}></label>
												</div>
												{/* .EditStar */}
											</dd>
										</dl>
									</li>
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
								<textarea className={Style["ReservationInput-area"]} placeholder="개인 정보 보호를 위해 고객님의 개인 정보를 입력하지 마세요. (10자 이상 작성해주세요.)"></textarea>
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
							<button type="button" className={Style["BttonFixButton-button"]}>작성 완료</button>{/* 컨텐츠 등록할시 is-disable 클래스 삭제 클릭가능 */}
							{/*<button type="button" className={Style["BttonFixButton-button"]}>수정 완료</button]}>*/}
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
export default ModifyMyReview;
