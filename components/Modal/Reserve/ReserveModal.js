import React from "react";
import Modal from "react-modal";
import Style from "../../../styles/ReserveModal.module.css";

const ReserveModal = ({ isOpen, onRequestClose }) => {
  return (
    <div>
      <Modal
        className={Style.Modal}
        overlayClassName={Style.Overlay}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
      >
        <label onClick={() => onRequestClose(false)}>X</label>

        <div>여행</div>
        <div>체크인..... 체크아웃....</div>
        <div>게스트 1명</div>

        <div>가격</div>
        <div>10000원</div>
        <div>총합계: 2950000</div>
      </Modal>
    </div>
  );
};

export default ReserveModal;
