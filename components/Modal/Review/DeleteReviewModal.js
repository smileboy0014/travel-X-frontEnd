import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import axios from "axios";
import Style from "../../../styles/Component.module.css";

const DeleteReviewModal = ({ isSave, isOpen, onRequestClose, ...updateData }) => {
  debugger;
  const onClickHandler = (type) => {
    if (type === 'delete') {
      deleteReview();
    }
  }

  const deleteReview = (data) => {
    axios({
      method: "DELETE",
      url: "http://shineware.iptime.org:8081/review/delete",
      params: {
        reviewId:  updateData.updateData.id
      },
    }).then((res) => {
      if (res.data !== undefined) {
        isSave(true);
      }
    }).catch((error)=>{
      console.log(error);
    })
    .finally(()=>{
      onRequestClose(false);
    });
  };

  return (
    <Modal
      className={Style["Modal"]}
      overlayClassName={Style["Overlay"]}
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => onRequestClose(false)}
      closeTimeoutMS={200}
    >
      <div className="site-container">
        <div className={Style["FilterPopHeader"]}>
          <div className={Style["FilterPopHeader-title"]}>리뷰 삭제</div>
          <button
            className={Style["FilterPopHeader-close"]}
            onClick={() => onRequestClose(false)}
          ></button>
        </div>
        <div className={Style["FilterPopBody"]}>
          <ul className={Style["FilterPopList"]}>
            <div>
              해당 리뷰를 삭제하시겠습니까?
            </div>
          </ul>
        </div>

        <div className={Style["FilterPopFooter"]}>
          <button
            className={Style["FilterPopFooter-button"]}
            onClick={() => onClickHandler('delete')}
          >
            삭제하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteReviewModal;
