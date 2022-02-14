import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import Review from "../../Review/Review";
import Style from "../../../styles/CommonModal.module.css";

const ReviewModal = ({ isOpen, onRequestClose}) => {

  // 모달 오버레이에서 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  
  return (
    <div>
      <Modal
        className={Style.ReveiwModal}
        overlayClassName={Style.OverlayReview}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
      >
        <label onClick={() => onRequestClose(false)}>X</label>

        <Review />
      </Modal>
    </div>
  );
};

export default ReviewModal;
