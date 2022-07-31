import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import PersonalCounter from "./PersonalCounter";
import Style from "../../../styles/Component.module.css";
import { useSelector, useDispatch } from "react-redux";

const PersonalModal = ({ isOpen, onRequestClose, maxUser }) => {
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
            <div className={Style["FilterPopHeader-title"]}>인원수 선택</div>
            <button
              className={Style["FilterPopHeader-close"]}

              onClick={() => onRequestClose(false)}
            ></button>
          </div>
          <PersonalCounter
            onRequestClear={clear}
            onSetClear={(value) => {
              setClear(value);
            }}
            onRequestClose={(value) => onRequestClose(value)}
            maxUser={maxUser}
          ></PersonalCounter>

        </div>
      </Modal>
    </div>
  );
};

export default PersonalModal;
