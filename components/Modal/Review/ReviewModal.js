import React from "react";
import Modal from "react-modal";
import Review from "../../Review/Review";
import Style from "../../../styles/CommonModal.module.css";

const ReviewModal = ({ isOpen, onRequestClose }) => {
  return (
    <div>
      <Modal
        className={Style.Modal}
        overlayClassName={Style.Overlay}
        isOpen={isOpen}
        ariaHideApp={false}
      >
        <label onClick={() => onRequestClose(false)}>X</label>

        <Review />
      </Modal>
    </div>
  );
};

export default ReviewModal;
