import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Style from "../../../styles/Component.module.css";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const MyReviewDeleteModal = ({ selectReview, isOpen, onRequestClose, methodCallBack }) => {
  const [clear, setClear] = useState(false);
  // debugger;
  // console.log(selectReview);
  const onClickHandler = (type) =>{
      if(type == 'delete') {
        deleteReview();
      }
  }

  const deleteReview = () =>{

    axios({
      method: "DELETE",
      url: "http://shineware.iptime.org:8081/review/delete",
      params: {
        reviewId: selectReview.id,
      },
    
    }).then((res) => {
      console.log(`delete review successed!!`);
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        onRequestClose(false);
        methodCallBack(true);
      })
  }

  return (
    <div>
      <Modal
        className={Style["CenterPop"]}
        overlayClassName={Style["CenterPopDim"]}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
        closeTimeoutMS={200}
      >

        <div className={Style["CenterPopBox"]}>
          <div className={Style["CenterPopBoxHeader"]}>
            <div className={Style["CenterPopBoxHeader-title"]}>알림</div>
            <button
              className={Style["CenterPopBoxHeader-close"]}
              onClick={() => onRequestClose(false)}
            ></button>
          </div>

          <div className={Style["CenterPopBoxBody"]}>
            <p className={Style["CenterPopBoxBody-text"]}>삭제된 후기는 복구할 수 없습니다.<br />삭제하시겠습니까?</p>
          </div>

          <div className="CenterPopBoxBtn">
            <ul className={Style["CenterPopBoxBtn-inner"]}>
              <li className={Style["CenterPopBoxBtn-item"]}>
                <button type="button" className={cx("FilterPopFooter-button", "color-Gray")}
                 onClick={() => onRequestClose(false)}>아니오</button>
              </li>
              <li className={Style["CenterPopBoxBtn-item"]}>
                <button type="button" className={Style["FilterPopFooter-button"]} onClick={() => onClickHandler('delete')}>예</button>
              </li>
            </ul>
          </div>
        </div>


      </Modal>
    </div>
  );
};

export default MyReviewDeleteModal;
