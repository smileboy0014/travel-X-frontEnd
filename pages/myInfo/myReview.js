import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Style from "../../styles/Component.module.css";
import DetailTopNavbar from "../../components/NavBar/DetailTopNavbar";
import MyReviewMoreModal from "../../components/Modal/MyReview/MyReviewMoreModal";
import MyReviewDeleteModal from "../../components/Modal/MyReview/MyReviewDeleteModal";
import classNames from 'classnames/bind';
import Link from 'next/link';

const cx = classNames.bind(Style);

const MyReview = () => {
	const router = useRouter();
	const [myReviewMoreModalOpen, setMyReviewMoreModalOpen] = useState(false);
	const [myReviewDeleteModalOpen, setMyReviewDeleteModalOpen] = useState(false);

	const onClickHadler = (type) => {
		if (type === 'moreView') {
			setMyReviewMoreModalOpen(true);
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
					{/* ReviewPost */}
					<div className="ReviewPost">
						{/* item */}
						<div className={Style["MyReviewPostItem"]}>
							<div className={Style["ReviewPostItemSecHead"]}>
								<button type="button" className={Style["ReviewPostMore"]} onClick={() => onClickHadler('moreView')}>
									<span className="ab-text">
										더보기
									</span
									></button>
								<div className={Style["ReviewPostItemSecHeadMeta"]}>
									<span className={cx("ReviewPostItemSecHeadMeta-item", "icoHotel")}>호텔</span>
									<span className={Style["ReviewPostItemSecHeadMeta-item"]}>슈페리어 트윈 호텔</span>
								</div>
								<div className={Style["ReviewPostItemSecHeadTitle"]}>슈페리어 트윈 (넷플릭스 - 숙소 문의)</div>
							</div>
							<div className={Style["ReviewPostItemMeta"]}>
								<div className="ReviewPostItemMetaHead">
									<div className={Style["ReviewPostItemMetaHead-name"]}>김00</div>
									<div className={Style["BasicGrade"]}>
										<div className={Style["BasicGradeStar"]}>
											<span className={cx("BasicGradeStar-item", "check")}></span>
											<span className={cx("BasicGradeStar-item", "check")}></span>
											<span className={cx("BasicGradeStar-item", "check")}></span>
											<span className={cx("BasicGradeStar-item", "check")}></span>
											<span className={cx("BasicGradeStar-item")}></span>
										</div>
										<div className={Style["BasicGradeCount"]}>4.0 /5</div>
									</div>
								</div>
								<div className={Style["ReviewPostItemMeta-date"]}>12월 7일</div>
							</div>
							<div className={Style["ReviewPostItemText"]}>
								<button type="button" className={Style["ReviewPostItemTextBtn"]}>...<span className={Style["ReviewPostItemTextBtn-text"]}>더읽기</span></button>{/* 글이 5줄을 넘을시 노출 */}
								<div className={Style["ReviewPostItemText-crop"]}>제 첫 호텔이었는데 진짜 좋았습니다! 침대랑 티비 사이 공간이 넓어서 이동하기 편했고 화장실도 깨끗하고 다른 시설들도 깨끗해서 너무 좋았습니다. 침대도 푹신하고 뷰맛집이라고하시네요ㅎㅎ
									다음에 서울가게되면 또 가고싶은곳이라고하십니다ㅎㅎ잘쉬다갑니다? 제 첫 호텔이었는데 진짜 좋았습니다! 침대랑 티비 사이 공간이 넓어서 이동하기 편했고 화장실도 깨끗하고 다른 시설들도 깨끗해서 너무 좋았습니다. 침대도 푹신하고 뷰맛집이라고하시네요ㅎㅎ
									다음에 서울가게되면 또 가고싶은곳이라고하십니다ㅎㅎ잘쉬다갑니다?</div>
							</div>
							{/* slide */}
							<div className="ReviewSlide">
								<div className="swiper-container ReviewSlide-container">
									<div className="swiper-wrapper ReviewSlide-wrapper">
										<div className="ReviewSlide-slide swiper-slide">
											<div className="ReviewSlide-thumb">
												<a href="#;" className="ReviewSlide-link">
													<img src="../assets/images/dummy/Mask Group@2x.png" alt="" />
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* .slide */}
							{/* RewviewAnswer */}
							<div className={Style["RewviewAnswer"]}>
								<div className={Style["RewviewAnswerHeader"]}>
									<div className={Style["RewviewAnswerHeader-name"]}>호텔주인</div>
									<div className={Style["RewviewAnswerHeader-date"]}>2주 전</div>
								</div>
								<div className={Style["RewviewAnswerText"]}>감사합니다. 다음에도 또 방문해주세요 :)
								</div>
							</div>
							{/* .RewviewAnswer */}
						</div>
						{/* .item */}
					</div>
					{/* .ReviewPost */}
				</div>
				{/* .컨텐츠 끝 */}
			</div>
			{/* .Body */}
			<MyReviewMoreModal isOpen={myReviewMoreModalOpen} onRequestClose={() => setMyReviewMoreModalOpen(false)} returnType={(type) => execReturnType(type)} />
			<MyReviewDeleteModal isOpen={myReviewDeleteModalOpen} onRequestClose={() => setMyReviewDeleteModalOpen(false)} />
		</div>
	);
}
export default MyReview;
