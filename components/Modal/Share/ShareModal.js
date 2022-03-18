import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Style from "../../../styles/Component.module.css";
import KakaoShre from "./KakaoShare";

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
        <label onClick={() => onRequestClose(false)}>X</label>

        <div>
          <KakaoShre
          // onRequestClose={(value) => {
          //   onRequestClose(value);

          //   console.log("value: " + value);
          // }}
          />
        </div>

        <button onClick={UrlCopy}>{"주소 복사"}</button>
      </Modal>
    </div>
  );
};

export default ShareModal;
