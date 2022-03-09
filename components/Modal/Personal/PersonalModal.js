import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import PersonalCounter from "./PersonalCounter";
import Style from "../../../styles/CommonModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as adultCounterActions from "../../../redux/store/modules/adultCounter";
import * as childCounterActions from "../../../redux/store/modules/chlidCounter";

const PersonalModal = ({ isOpen, onRequestClose }) => {

  const [clear, setClear] = useState(false);
  const dispatch = useDispatch();



  return (
    <div>
      <Modal
        className={Style.Modal}
        overlayClassName={Style.Overlay}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
        closeTimeoutMS={200}
      >
        <div className={Style.site_container}>
          <div className={Style.FilterPopHeader}>
            <button
              className={Style.FilterPopHeader_reset}
              onClick={() => setClear(true)}
            >
              초기화
            </button>
            <div className={Style.FilterPopHeader_title}>인원수 선택</div>
            <button
              className={Style.FilterPopHeader_close}

              onClick={() => onRequestClose(false)}
            ></button>
          </div>
          <PersonalCounter
            onRequestClear={clear}
            onSetClear={(value) => {
              setClear(value);
            }}

            onRequestClose={(value) => onRequestClose(value)}

          ></PersonalCounter>

        </div>
      </Modal>
    </div>
  );
};

export default PersonalModal;
