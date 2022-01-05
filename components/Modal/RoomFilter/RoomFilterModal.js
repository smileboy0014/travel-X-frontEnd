import React from "react";
import RoomFilter from "./RoomFilter";

const RoomFilterModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();
  const handleSaveClick = (e) => {
    e.preventDefault();
    onRequestClose(false);
  };

  const handleCloseClick = () => {
    console.log("취소");
  };
  return (
    <div>
      <Modal isOpen={isOpen} ariaHideApp={false}>
        <label onClick={() => onRequestClose(false)}>X</label>
        <RoomFilter></RoomFilter>
        <button onClick={handleSaveClick}> 확인</button>
        <button onClick={handleCloseClick}> 취소</button>
      </Modal>
    </div>
  );
};

export default RoomFilterModal;
