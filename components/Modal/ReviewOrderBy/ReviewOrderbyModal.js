import React, { useState } from "react";
import Modal from "react-modal";
import Style from "../../../styles/Component.module.css";
import ReviewOrderby from "./ReviewOrderby";

const ReviewOrderbyModal = ({ isOpen, onRequestClose }) => {
  const [clear, setClear] = useState(false);

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
            <div className={Style["FilterPopHeader-title"]}>정렬기준</div>
            <button
              className={Style["FilterPopHeader-close"]}
              onClick={() => onRequestClose(false)}
            ></button>
          </div>
          <ReviewOrderby
            onRequestClose={(value) => onRequestClose(value)}
          ></ReviewOrderby>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewOrderbyModal;
