import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Search from "../../../pages/search";

const SearchModal = ({ show, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    console.log(show);

    setModalIsOpen(show);
  }, [show]);

  useEffect(() => {
    console.log(modalIsOpen);
  }, [modalIsOpen]);

  return (
    <div>
      <Modal isOpen={modalIsOpen}>
        <Search />
        <button onClick={() => onClose(false)}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default SearchModal;
