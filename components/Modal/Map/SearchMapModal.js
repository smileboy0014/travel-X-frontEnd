import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import ModalStyle from "../../../styles/CommonModal.module.css";
import ListDetailMap from "./ListDetailMap";

const SearchMapModal = ({ isOpen, onRequestClose }) => {
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
        <ListDetailMap
          lat={37.4959854}
          lng={127.0664091}
          onRequestClosed={(value) => {
            if (value) {
              onRequestClose(false);
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default SearchMapModal;
