import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import PersonalCounter from "./PersonalCounter";
import Style from "../../../styles/CommonModal.module.css";
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
      onClickReset();
      e.preventDefault();
      onRequestClose(false);
    },
    [dispatch]
  );

  const onClickReset = () => {
    dispatch(adultCounterActions.reset());
    dispatch(childCounterActions.reset());
  };

  return (
    <div>
      <Modal
        className={Style.Modal}
        overlayClassName={Style.Overlay}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
      >
        <div className={Style.site_container}>
          <div className={Style.FilterPopHeader}>
            <button
              className={Style.FilterPopHeader_reset}
              onClick={onClickReset}
            >
              초기화
            </button>
            <div className={Style.FilterPopHeader_title}>인원수 선택</div>
            <button
              className={Style.FilterPopHeader_close}
              onClick={handleCloseClick}
            ></button>
          </div>
          <PersonalCounter></PersonalCounter>
          <div className={Style.FilterPopFooter}>
            <button
              className={Style.FilterPopFooter_button}
              onClick={handleSaveClick}
            >
              선택하기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PersonalModal;
