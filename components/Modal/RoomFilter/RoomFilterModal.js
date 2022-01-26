import React, { useState } from "react";
import RoomFilter from "./RoomFilter";
import Modal from "react-modal";
import Style from "../../../styles/CommonModal.module.css";

const RoomFilterModal = ({ isOpen, onRequestClose }) => {
  const [clear, setClear] = useState(false);

  return (
    <div>
      <Modal
        className={Style.Modal}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
      >
        <div className={Style.site_container}>
          <div className={Style.FilterPopHeader}>
            <button
              className={Style.FilterPopHeader_reset}
              onClick={() => setClear(true)}
            >
              초기화
            </button>
            <div className={Style.FilterPopHeader_title}>필터</div>
            <button
              className={Style.FilterPopHeader_close}
              onClick={() => onRequestClose(false)}
            ></button>
          </div>
          <RoomFilter
            onRequestClear={clear}
            onSetClear={(value) => {
              setClear(value);
            }}
          ></RoomFilter>
        </div>
      </Modal>
    </div>
  );
};

export default RoomFilterModal;
