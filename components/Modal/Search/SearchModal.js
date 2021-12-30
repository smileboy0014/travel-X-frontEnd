import React from "react";
import Modal from "react-modal";
import Styles from "../../../styles/SearchModal.module.css";
import Search from "./Search";

const SearchModal = ({ isOpen, onRequestClose }) => {
  return (
    <div>
      <Modal
        className={Styles.Modal}
        overlayClassName={Styles.Overlay}
        closeTimeoutMS={500}
        isOpen={isOpen}
      >
        <label onClick={() => onRequestClose(false)}>X 키워드 검색</label>
        <Search getClose={() => onRequestClose(true)} />
      </Modal>
    </div>
  );
};

export default SearchModal;
