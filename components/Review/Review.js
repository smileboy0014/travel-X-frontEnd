import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import reviewStyle from "../../styles/Review.module.css";
import ReviewCard from "../Card/Review/ReviewCard";
import AddReviewModal from "../Modal/Review/AddReviewModal";
import ReviewDetailModal from "../Modal/Review/ReviewDetailModal";
import ProgressBar from "../Progress/ProgressBar";
import * as reviewData from "../../redux/store/modules/reviewContent";
import { useSelector, useDispatch } from "react-redux";

const Review = () => {
  
  // const {id} = props;
  const router = useRouter();
  const { id } = router.query;
  const [totalPoint, setTotalPoint] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [point1, setPoint1] = useState(0);
  const [point2, setPoint2] = useState(0);
  const [point3, setPoint3] = useState(0);
  const [point4, setPoint4] = useState(0);
  const [point5, setPoint5] = useState(0);
  const [review, setReview] = useState(false);
  const [AddReviewModalOpen, setAddReviewModalOpen] = useState(false);
  const [reviewDetailModalOpen, setReviewDetailModalOpen] = useState(false);
  const dispatch = useDispatch();
  // const data = useSelector(({ reviewContent }) => reviewContent.data);

  const [viewContent, setViewContent] = useState([]);

  useEffect(() => {
    if (id !== undefined) {
      setReview(false);
      
      Axios({
        method: "GET",
        url: "http://shineware.iptime.org:8081/review/get",
        params: {
          roomId: id,
          useType: "NIGHT",
          from: "0",
          size: "100",
        },
      }).then((res) => {
        console.log(res.data);
        setViewContent(res.data);
      });
    }
  }, [id, review]);


  // useEffect(() => {
  //   // console.log(data);
  //   if (data.content != "" && data.title != "") {
  //     setViewContent(
  //       viewContent.concat({
  //         ...data,
  //       })
  //     );
  //     dispatch(reviewData.setData({ title: "", content: "" }));
  //   }
  // }, [data]);

  useEffect(() => {
  handleScore();
  }, [viewContent]);

  const handleOpenModal = (type) => {
    if (type == "view") {
      setReviewDetailModalOpen(true);
    } else if (type == "add") {
      setAddReviewModalOpen(true);
    }
  };

  const handleScore = () =>{

    let kindnessScore = 0;
    let cleanScore = 0;
    let comfortScore = 0;
    let facilityScore = 0;
    let priceScore = 0;

    if (viewContent != undefined && viewContent.length > 0) {
      for (let scores of viewContent) {
        kindnessScore += scores.kindnessScore;
        cleanScore += scores.cleanScore;
        comfortScore += scores.comfortScore;
        facilityScore += scores.facilityScore;
        priceScore += scores.priceScore;
      }

    comfortScore = (comfortScore / viewContent.length).toFixed(2) > 5 ? 5 : (comfortScore / viewContent.length).toFixed(2);
    kindnessScore = (kindnessScore / viewContent.length).toFixed(2) > 5 ? 5 : (kindnessScore / viewContent.length).toFixed(2);
    cleanScore = (cleanScore / viewContent.length).toFixed(2) > 5 ? 5 : (cleanScore / viewContent.length).toFixed(2);
    facilityScore = (facilityScore / viewContent.length).toFixed(2) > 5 ? 5 : (facilityScore / viewContent.length).toFixed(2);
    priceScore = (priceScore / viewContent.length).toFixed(2) > 5 ? 5 : (priceScore / viewContent.length).toFixed(2);

   

    setPoint1(comfortScore);
    setPoint2(kindnessScore);
    setPoint3(cleanScore);
    setPoint4(facilityScore);
    setPoint5(priceScore);
    setTotalPoint(((Number(comfortScore) + Number(kindnessScore) + Number(cleanScore) + Number(facilityScore) + Number(priceScore)) / 5).toFixed(2));
    setTotalCount(viewContent.length);
  }
}

  const handleProgressBar = (type) => {
    switch (type) {
      case 1:
        return (
          <div className={reviewStyle.progressBarForm}>
            만족도
            <ProgressBar width={300} percent={point1 * 0.2} /> {point1}
          </div>
        );
      case 2:
        return (
          <div className={reviewStyle.progressBarForm}>
            친절도
            <ProgressBar width={300} percent={point2 * 0.2} /> {point2}
          </div>
        );
      case 3:
        return (
          <div className={reviewStyle.progressBarForm}>
            청결도
            <ProgressBar width={300} percent={point3 * 0.2} /> {point3}
          </div>
        );
      case 4:
        return (
          <div className={reviewStyle.progressBarForm}>
            편의성
            <ProgressBar width={300} percent={point4 * 0.2} /> {point4}
          </div>
        );
      case 5:
        return (
          <div className={reviewStyle.progressBarForm}>
            접근성
            <ProgressBar width={300} percent={point5 * 0.2} /> {point5}
          </div>
        );
    }
  };

  const reviewCard = viewContent.map((review, index) =>
    index < 3 ? <ReviewCard key={index} {...review} /> : null
  );

  return (
    <div className={reviewStyle.App}>
      <h1>[ 숙소 후기 ]</h1>
      {/* <div className={reviewStyle.HeaderBack} onClick={() => router.back()} /> */}
      <div className={reviewStyle.formHeader}>
        <svg
          className="w-6 h-6"
          fill="red"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          ></path>
        </svg>
        <label className={reviewStyle.starPoint}>{totalPoint}</label>
        <label className={reviewStyle.starPoint}>후기 {totalCount}</label>
      </div>
      <div>
        {handleProgressBar(1)}
        {handleProgressBar(2)}
        {handleProgressBar(3)}
        {handleProgressBar(4)}
        {handleProgressBar(5)}
      </div>

      <div className={reviewStyle.reviewCotent}>{reviewCard}</div>

      <button onClick={() => handleOpenModal("view")}>전체 리뷰 보기</button>
      <button onClick={() => handleOpenModal("add")}>리뷰 작성 하기</button>

      <AddReviewModal
        isOpen={AddReviewModalOpen}
        onRequestClose={() => setAddReviewModalOpen(false)}
        isSave={() =>setReview(true)}
        myStyle={reviewStyle}
      />

      <ReviewDetailModal
        data={viewContent}
        point1={point1}
        point2={point2}
        point3={point3}
        point4={point4}
        point5={point5}
        totalPoint={totalPoint}
        totalCount={totalCount}
        isOpen={reviewDetailModalOpen}
        onRequestClose={() => setReviewDetailModalOpen(false)}
      />
    </div>
  );
};
export default Review;
