import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Style from "../../../styles/ReviewDetail.module.css";
import ReviewCard from "../../../components/Card/Review/ReviewCard";
import ProgressBar from "../../Progress/ProgressBar";
import ReviewSearchBar from "../../SearchBar/ReveiwSearchBar";

const ReviewDetailModal = (props) => {
  const {
    data,
    isOpen,
    onRequestClose,
    point1,
    point2,
    point3,
    point4,
    point5,
    totalPoint,
    totalCount,
  } = props;
  const [searchValue, setSearchValue] = useState();
  const { content, setContent } = useState();

  const handleProgressBar = (type) => {
    switch (type) {
      case 1:
        return (
          <div className={Style.progressBarForm}>
            만족도
            <ProgressBar width={300} percent={point1 * 0.2} /> {point1}
          </div>
        );
      case 2:
        return (
          <div className={Style.progressBarForm}>
            친절도
            <ProgressBar width={300} percent={point2 * 0.2} /> {point2}
          </div>
        );
      case 3:
        return (
          <div className={Style.progressBarForm}>
            청결도
            <ProgressBar width={300} percent={point3 * 0.2} /> {point3}
          </div>
        );
      case 4:
        return (
          <div className={Style.progressBarForm}>
            편의성
            <ProgressBar width={300} percent={point4 * 0.2} /> {point4}
          </div>
        );
      case 5:
        return (
          <div className={Style.progressBarForm}>
            접근성
            <ProgressBar width={300} percent={point5 * 0.2} /> {point5}
          </div>
        );
    }
  };

  return (
    <>
      <Modal
        className={Style["Modal"]}
        overlayClassName={Style["Overlay"]}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
      >
        <label onClick={() => onRequestClose(false)}>X</label>
        <div className={Style["Modal"]}>
          <div className={Style.leftDetail}>
            <div className={Style.formHeader}>
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
              <label className={Style.starPoint}>{totalPoint}</label>
              <label className={Style.starPoint}>후기 {totalCount}</label>
            </div>
            {handleProgressBar(1)}
            {handleProgressBar(2)}
            {handleProgressBar(3)}
            {handleProgressBar(4)}
            {handleProgressBar(5)}
          </div>
          <div className={Style.rightDetailDialog}>
            <div className="keywordSearch">
              <ReviewSearchBar />
            </div>
            <div className={Style.rightDetail}>
              {content
                ? content.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                  ))
                : data.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                  ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ReviewDetailModal;
