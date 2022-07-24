import React, { useState } from "react";
import RoomFilter from "./RoomFilter";
import Modal from "react-modal";
import Style from "../../../styles/Component.module.css";

const RoomFilterModal = ({ isOpen, onRequestClose, callback }) => {
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
            <button
              className={Style["FilterPopHeader-reset"]}
              onClick={() => setClear(true)}
            >
              초기화
            </button>
            <div className={Style["FilterPopHeader-title"]}>숙소유형</div>
            <button
              className={Style["FilterPopHeader-close"]}
              onClick={() => onRequestClose(false)}
            ></button>
          </div>
          <RoomFilter
            onRequestClear={clear}
            onSetClear={(value) => {
              setClear(value);
            }}
            onRequestClose={() => onRequestClose(false)}
            callback={callback}
          ></RoomFilter>
        </div>
      </Modal>
    </div>
  );
};

export default RoomFilterModal;
