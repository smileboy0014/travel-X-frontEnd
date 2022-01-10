import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import Style from "../../../styles/CommonModal.module.css";
import DetailMap from "./DetailMap";

const SearchMapModal = ({ isOpen, onRequestClose }) => {
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

        <DetailMap lat={37.3595704} lng={127.105399} />
      </Modal>
    </div>
  );
};

export default SearchMapModal;
