import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Style from "../../../styles/Component.module.css";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const AddressModal = ({ isOpen, onRequestClose, callback, initValue }) => {

  const [addressList, setAddressList] = useState([
    '서울시', '경기도', '인천시', '강원도', '대전시', '세종시', '충청남도', '충청북도', 
    '부산시', '울산시', '경상남도', '경상북도', '대구시', '광주시', '전라남도', '전라북도',
    '제주시'
  ]);

  const [address, setAddress] = useState('');

  const handleAddressClick = (e) => {
    const { value } = e.target;
    setAddress(value);
  };

  const handleConfirm = () => {
    callback(address);
    onRequestClose(true);
  };

  useEffect(() => {
    setAddress(initValue);
  }, []);

  return (
    <Modal
      className={Style["CalenderPop"]}
      overlayClassName={Style["Overlay"]}
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => onRequestClose(false)}
      closeTimeoutMS={200}
    >
      {/* <!-- Header --> */}
      <div className={Style["AddressPopHeader"]}>
        <div className="site-container">
          <div className={Style["AddressPopHeaderTitle"]}>
            <div className={Style["AddressPopHeaderTitle-title"]}>현 주소 입력</div>
            <button type="button" className={Style["AddressPopHeaderTitle-close"]} onClick={() => onRequestClose(true)}><span className={"ab-text"}>Close</span></button>
          </div>
        </div>
      </div>
      {/* <!-- .Header --> */}
      {/* <!-- Body --> */}
      <div className={Style["AddressPopBody"]}>
        <div className="site-container">
          <div className={Style["AddressPopBody-title"]}>현재 거주하는 곳을 선택해 주세요.</div>
          <div className={Style["AddressPopList"]}>
            <ul className={Style["AddressPopList-list"]}>
              {addressList.map((name, index) => {
                return (
                  <li key={index} className={Style["AddressPopList-item"]}>
                    <label className={Style["AddressPopLabel"]}>
                      <input 
                        type="radio" 
                        value={name}
                        checked={address == name}
                        className={Style["AddressPopLabel-input"]} 
                        onClick={handleAddressClick} 
                        readOnly
                      />
                      <span className={Style["AddressPopLabel-text"]}>{name}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- .Body --> */}
      <div className={Style["AddressPopFooter"]}>
        <button 
          type="button" 
          className={address ? Style["BttonFixButton-button"] : cx("BttonFixButton-button", "is-disable")}
          onClick={handleConfirm}
        >입력하기</button>
      </div>
    </Modal>
  );
};

export default AddressModal;
