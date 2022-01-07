import React from "react";
import Modal from "react-modal";
import Style from "../../../styles/CommonModal.module.css";
import KakaoShre from "./KakaoShare";

const ShareModal = ({ isOpen, onRequestClose }) => {
  return (
    <div>
      <Modal
        className={Style.Modal}
        overlayClassName={Style.Overlay}
        isOpen={isOpen}
      >
        <label onClick={() => onRequestClose(false)}>X</label>

        <div>
          <KakaoShre /> 카카오
        </div>
        <div>URL</div>
      </Modal>
    </div>
  );
};

export default ShareModal;
