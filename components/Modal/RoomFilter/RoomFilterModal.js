import React from "react";
import RoomFilter from "./RoomFilter";
import Modal from "react-modal";
import Style from "../../../styles/CommonModal.module.css";

const RoomFilterModal = ({ isOpen, onRequestClose }) => {
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
        <RoomFilter></RoomFilter>
      </Modal>
    </div>
  );
};

export default RoomFilterModal;
