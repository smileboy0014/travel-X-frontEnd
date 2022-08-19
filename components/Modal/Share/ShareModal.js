import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Style from "../../../styles/Component.module.css";
import classNames from 'classnames/bind';
import KakaoShre from "./KakaoShare";
const cx = classNames.bind(Style);

const ShareModal = ({ isOpen, onRequestClose }) => {

  function UrlCopy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    onRequestClose(false);
    alert("주소 복사 완료");
  }

  const onClickHandler = (type) =>{
   return (  <KakaoShre></KakaoShre>)
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
            <div className={Style["FilterPopHeader-title"]}>공유하기</div>
            <button
              className={Style["FilterPopHeader-close"]}
              onClick={() => onRequestClose(false)}
            ></button>
          </div>
          <div className={cx("FilterPopFooter", "flex-Row")}>
							<button type="button" className={cx("FilterPopFooter-button", "color-Gray")} onClick={() => onClickHandler()}>
                <KakaoShre/>
                </button>
							<button type="button" className={Style["FilterPopFooter-button"]} onClick={() => UrlCopy()}>
                주소 복사
                </button>
						</div>
        </div>
      </Modal>
    </div>
  );
};

export default ShareModal;
