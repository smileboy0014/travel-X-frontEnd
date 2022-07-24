import React, { useState } from "react";
import Style from "../../../styles/Component.module.css";
import classNames from 'classnames/bind';
import RoomOrderbyModal from "../../Modal/RoomOrderby/RoomOrderbyModal";

const OrderByFilterButton = (props) => {
  const [roomOrderbyModalOpen, setRoomOrderbyModalOpen] = useState(false);
  const [styleOn, setStyleOn] = useState(false);
  const cx = classNames.bind(Style);

  const onClickHandler = (type) => {
    if (type == 'on') {
      setRoomOrderbyModalOpen(true);
      setStyleOn(true);
    } else {
      setRoomOrderbyModalOpen(false);
      setStyleOn(false);
    }
  }

  return (
   <>
      <button
        className={styleOn ? cx("RadiusSelect","is-Current", "js-SortOpen") : cx("RadiusSelect", "js-SortOpen")}
        onClick={() => {onClickHandler('on')}}
      >
        정렬기준
      </button>
      <RoomOrderbyModal
        isOpen={roomOrderbyModalOpen}
        onRequestClose={() => onClickHandler('off')}
        callback={props.callback}
      ></RoomOrderbyModal>
   </>
  );
};

export default OrderByFilterButton;
