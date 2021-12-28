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
        isOpen={isOpen}
      >
        <label onClick={() => onRequestClose(false)}>X</label>
        <Search onRequestClose={() => onRequestClose(false)} />
      </Modal>
    </div>
  );
};

export default SearchModal;
