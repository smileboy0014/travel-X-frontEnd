import React, { useState } from "react";
import Modal from "react-modal";
import Style from "../../../styles/Component.module.css";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const MyReviewDeleteModal = ({ isOpen, onRequestClose }) => {
  const [clear, setClear] = useState(false);

  return (
    <div>
      <Modal
        className={Style["CenterPop"]}
        overlayClassName={Style["CenterPopDim"]}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
        closeTimeoutMS={200}
      >

        <div className={Style["CenterPopBox"]}>
          <div className={Style["CenterPopBoxHeader"]}>
            <div className={Style["CenterPopBoxHeader-title"]}>알림</div>
            <button
              className={Style["CenterPopBoxHeader-close"]}
              onClick={() => onRequestClose(false)}
            ></button>
          </div>

          <div class={Style["CenterPopBoxBody"]}>
            <p class={Style["CenterPopBoxBody-text"]}>삭제된 후기는 복구할 수 없습니다.<br />삭제하시겠습니까?</p>
          </div>

          <div class="CenterPopBoxBtn">
            <ul class={Style["CenterPopBoxBtn-inner"]}>
              <li class={Style["CenterPopBoxBtn-item"]}>
                <button type="button" className={cx("FilterPopFooter-button", "color-Gray")}
                 onClick={() => onRequestClose(false)}>아니오</button>
              </li>
              <li class={Style["CenterPopBoxBtn-item"]}>
                <button type="button" className={Style["FilterPopFooter-button"]}>예</button>
              </li>
            </ul>
          </div>
        </div>


      </Modal>
    </div>
  );
};

export default MyReviewDeleteModal;
