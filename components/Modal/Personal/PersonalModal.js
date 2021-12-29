import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import PersonalCounter from "./PersonalCounter";
import Styles from "../../../styles/PersonalModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as adultCounterActions from "../../../redux/store/modules/adultCounter";
import * as childCounterActions from "../../../redux/store/modules/chlidCounter";

const PersonalModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();
  const handleSaveClick = (e) => {
    e.preventDefault();
    onRequestClose(false);
  };

  const handleCloseClick = useCallback(
    (e) => {
      dispatch(adultCounterActions.reset());
      dispatch(childCounterActions.reset());
      e.preventDefault();
      onRequestClose(false);
    },
    [dispatch]
  );

  return (
    <div>
      <Modal
        className={Styles.Modal}
        overlayClassName={Styles.Overlay}
        isOpen={isOpen}
      >
        <label onClick={() => onRequestClose(false)}>X</label>
        <PersonalCounter></PersonalCounter>
        <button onClick={handleSaveClick}> 확인</button>
        <button onClick={handleCloseClick}> 취소</button>
      </Modal>
    </div>
  );
};

export default PersonalModal;
