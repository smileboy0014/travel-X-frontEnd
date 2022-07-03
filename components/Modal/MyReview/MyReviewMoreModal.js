import React, { useState } from "react";
import Modal from "react-modal";
import Style from "../../../styles/Component.module.css";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const MyReviewMoreModal = ({ isOpen, onRequestClose, returnType}) => {
  // const [returnType, setReturnType] = useState('');
  // debugger;
  const onClickHandler = (type) =>{
    if(type === 'delete'){
      // debugger;
      returnType('delete');
    } else {
      returnType('modify');
    }
  }


  return (
    <div>
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
            <div className={Style["FilterPopHeader-title"]}>더보기</div>
            <button
              className={Style["FilterPopHeader-close"]}
              onClick={() => onRequestClose(false)}
            ></button>
          </div>
          <div className={cx("FilterPopFooter", "flex-Row")}>
							<button type="button" className={cx("FilterPopFooter-button", "color-Gray")} onClick={() => onClickHandler('delete')}>
                삭제하기
                </button>
							<button type="button" className={Style["FilterPopFooter-button"]} onClick={() => onClickHandler('modify')}>
                수정하기
                </button>
						</div>
        </div>
      </Modal>
    </div>
  );
};

export default MyReviewMoreModal;
