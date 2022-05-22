import React, { useState } from "react";
import Style from "../../../styles/Component.module.css";
import RoomFilterModal from "../../Modal/RoomFilter/RoomFilterModal";

const OptionFilterButton = (props) => {
  const [roomFilterModalOpen, setRoomFilterModalOpen] = useState(false);

  return (
    <li className={Style["ListFilterButton-item"]}>
      <button
        className={Style["ListFilterButton-filter"]}
        onClick={() => {
          setRoomFilterModalOpen(true);
        }}
      >
        필터
      </button>
      <RoomFilterModal
        isOpen={roomFilterModalOpen}
        onRequestClose={() => setRoomFilterModalOpen(false)}
        callback={props.callback}
      ></RoomFilterModal>
    </li>
  );
};

export default OptionFilterButton;
