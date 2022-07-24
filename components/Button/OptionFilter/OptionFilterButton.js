import React, { useState } from "react";
import Style from "../../../styles/Component.module.css";
import classNames from 'classnames/bind';
import RoomFilterModal from "../../Modal/RoomFilter/RoomFilterModal";

const OptionFilterButton = (props) => {
  const [roomFilterModalOpen, setRoomFilterModalOpen] = useState(false);
  const [styleOn, setStyleOn] = useState(false);
  const cx = classNames.bind(Style);
  const onClickHandler = (type) => {
    if (type == 'on') {
      setRoomFilterModalOpen(true);
      setStyleOn(true);
    } else {
      setRoomFilterModalOpen(false);
      setStyleOn(false);
    }

  }

  return (
    <>
      <button
        className={styleOn ? cx("RadiusSelect", "is-Current", "js-FilterOpen") : cx("RadiusSelect", "js-FilterOpen")}
        onClick={() => onClickHandler('on')}
      >
        숙소유형 ({props.typeCount})
      </button>
      <RoomFilterModal
        isOpen={roomFilterModalOpen}
        onRequestClose={() => onClickHandler('off')}
        callback={props.callback}
      ></RoomFilterModal>
    </>
  );
};

export default OptionFilterButton;
