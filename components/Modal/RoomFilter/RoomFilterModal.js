import React from "react";
import RoomFilter from "./RoomFilter";
import Modal from "react-modal";
import Style from "../../../styles/CommonModal.module.css";

const RoomFilterModal = ({ isOpen, onRequestClose }) => {
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
              // onClick={onClickReset}
            >
              초기화
            </button>
            <div className={Style.FilterPopHeader_title}>필터</div>
            <button
              className={Style.FilterPopHeader_close}
              onClick={() => onRequestClose(false)}
            ></button>
          </div>
          <RoomFilter></RoomFilter>
          <div className={Style.FilterPopFooter}>
            <button
              className={Style.FilterPopFooter_button}
              // onClick={handleSaveClick}
            >
              선택하기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RoomFilterModal;
