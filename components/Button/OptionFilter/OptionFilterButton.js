import React, { useState } from "react";
import Style from "../../../styles/FilterButton.module.css";
import RoomFilterModal from "../../Modal/RoomFilter/RoomFilterModal";

const OptionFilterButton = () => {
  const [roomFilterModalOpen, setRoomFilterModalOpen] = useState(false);

  return (
    <li className={Style.ListFilterButton_item}>
      <button
        className={Style.ListFilterButton_filter}
        onClick={() => {
          setRoomFilterModalOpen(true);
        }}
      >
        필터
      </button>
      <RoomFilterModal
        isOpen={roomFilterModalOpen}
        onRequestClose={() => setRoomFilterModalOpen(false)}
      ></RoomFilterModal>
    </li>
  );
};

export default OptionFilterButton;
