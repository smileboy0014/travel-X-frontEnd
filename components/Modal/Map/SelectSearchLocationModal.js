import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as mapActions from "../../../redux/store/modules/map";

const SelectSearchLocationModal = ({ show, onClose, children, title, showSearchMapModal }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const dispatch = useDispatch();

  const SearchCurLocation = (e) => {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(mapActions.setPos({latitude: position.coords.latitude, longitde: position.coords.longitude}));
        
        searchCoordinateToAddress({
          x: position.coords.longitude,
          y: position.coords.latitude,
          _lat: position.coords.latitude,
          _lng: position.coords.longitude
        });
        
      }, (error) => {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
    handleCloseClick(e);
  }

  function searchCoordinateToAddress(latlng) {
    naver.maps.Service.reverseGeocode({
      coords: latlng,
      orders: [
        naver.maps.Service.OrderType.ADDR,
        naver.maps.Service.OrderType.ROAD_ADDR
      ].join(',')
    }, function (status, response) {
      if (status === naver.maps.Service.Status.ERROR) {
        return alert('Something Wrong!');
      }

      const items = response.v2.results,
        addresses = [],
        address = '';

      for (let i = 0, ii = items.length, item, addrType; i < ii; i++) {
        item = items[i];
        address = makeAddress(item) || '';
        addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

        addresses.push((i + 1) + '. ' + addrType + ' ' + address);
      }
      
      dispatch(mapActions.setAddr(addresses));
    });
  }

  function makeAddress(item) {
    if (!item) {
      return;
    }

    var name = item.name,
      region = item.region,
      land = item.land,
      isRoadAddress = name === 'roadaddr';

    var sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

    if (hasArea(region.area1)) {
      sido = region.area1.name;
    }

    if (hasArea(region.area2)) {
      sigugun = region.area2.name;
    }

    if (hasArea(region.area3)) {
      dongmyun = region.area3.name;
    }

    if (hasArea(region.area4)) {
      ri = region.area4.name;
    }

    if (land) {
      if (hasData(land.number1)) {
        if (hasData(land.type) && land.type === '2') {
          rest += '산';
        }

        rest += land.number1;

        if (hasData(land.number2)) {
          rest += ('-' + land.number2);
        }
      }

      if (isRoadAddress === true) {
        if (checkLastString(dongmyun, '면')) {
          ri = land.name;
        } else {
          dongmyun = land.name;
          ri = '';
        }

        if (hasAddition(land.addition0)) {
          rest += ' ' + land.addition0.value;
        }
      }
    }

    return [sido, sigugun, dongmyun, ri, rest].join(' ');
  }

  function hasArea(area) {
    return !!(area && area.name && area.name !== '');
  }

  function hasData(data) {
    return !!(data && data !== '');
  }

  function checkLastString(word, lastString) {
    return new RegExp(lastString + '$').test(word);
  }

  function hasAddition(addition) {
    return !!(addition && addition.value);
  }

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleSelectMap = (e) => {
    handleCloseClick(e);
    showSearchMapModal();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        <StyledModalBody>
          <button onClick={SearchCurLocation}>현재 내 위치 검색</button>
          <button onClick={handleSelectMap}>지도에서 선택</button>
        </StyledModalBody>
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
  width: 300px;
  height: 100px;
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

export default SelectSearchLocationModal;
