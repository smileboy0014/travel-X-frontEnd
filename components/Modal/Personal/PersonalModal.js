import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PersonalCounter from "./PersonalCounter";
import { useSelector, useDispatch } from "react-redux";
import * as adultCounterActions from "../../../redux/store/modules/adultCounter";
import * as childCounterActions from "../../../redux/store/modules/chlidCounter";

const PersonalModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleSaveClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleCloseClick = useCallback(
    (e) => {
      dispatch(adultCounterActions.reset());
      dispatch(childCounterActions.reset());
      e.preventDefault();
      onClose();
    },
    [dispatch]
  );

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        <StyledModalBody>{<PersonalCounter></PersonalCounter>}</StyledModalBody>

        <button onClick={handleSaveClick}> 확인</button>
        <button onClick={handleCloseClick}> 취소</button>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;
`;
const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default PersonalModal;
