import React, { useState } from "react";
import Style from "../../../styles/Component.module.css";
import RoomOrderbyModal from "../../Modal/RoomOrderby/RoomOrderbyModal";

const OrderByFilterButton = () => {
  const [roomOrderbyModalOpen, setRoomOrderbyModalOpen] = useState(false);
  return (
    <li className={Style["ListFilterButton-item"]}>
      <button
        className={Style["ListFilterButtonItem-select"]}
        onClick={() => {
          setRoomOrderbyModalOpen(true);
        }}
      >
        정렬기준
      </button>
      <RoomOrderbyModal
        isOpen={roomOrderbyModalOpen}
        onRequestClose={() => setRoomOrderbyModalOpen(false)}
      ></RoomOrderbyModal>
    </li>
  );
};

export default OrderByFilterButton;
