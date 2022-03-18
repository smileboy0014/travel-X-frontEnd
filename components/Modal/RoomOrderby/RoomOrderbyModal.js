import React, { useState } from "react";
import Modal from "react-modal";
import Style from "../../../styles/Component.module.css";
import RoomOrderby from "./RoomOrderby";

const RoomOrderbyModal = ({ isOpen, onRequestClose }) => {
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
            <div className={Style["FilterPopHeader-title"]}>필터</div>
            <button
              className={Style["FilterPopHeader-close"]}
              onClick={() => onRequestClose(false)}
            ></button>
          </div>
          <RoomOrderby
            onRequestClose={(value) => onRequestClose(value)}
          ></RoomOrderby>
        </div>
      </Modal>
    </div>
  );
};

export default RoomOrderbyModal;
