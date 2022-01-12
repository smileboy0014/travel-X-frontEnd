import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import Style from "../../../styles/CommonModal.module.css";
import DetailMap from "./DetailMap";

const SearchMapModal = ({ isOpen, onRequestClose }) => {
  const markerArr = [
    {
      price: "1,000원",
      location: "불정로 6",
      lat: "37.4959854",
      lng: "127.0664091",
    }, // 강남구 중심좌표
    {
      price: "12,000원",
      location: "강동",
      lat: "37.5492077",
      lng: "127.1464824",
    }, // 강동구 중심좌표
    {
      price: "13,000원",
      location: "강북",
      lat: "37.6469954",
      lng: "127.0147158",
    }, // 강북구 중심좌표
    {
      price: "14,000원",
      location: "강서",
      lat: "37.5657617",
      lng: "126.8226561",
    }, // 강서구 중심좌표
    {
      price: "15,000원",
      location: "관악",
      lat: "37.4603732",
      lng: "126.9536086",
    }, // 관악구 중심좌표
    {
      price: "16,000원",
      location: "광진",
      lat: "37.5574120",
      lng: "127.0796211",
    }, // 광진구 중심좌표
    {
      price: "17,000원",
      location: "구로",
      lat: "37.4954856",
      lng: "126.858121",
    }, // 구로구 중심좌표
    {
      price: "18,000원",
      location: "금천",
      lat: "37.4600969",
      lng: "126.9001546",
    }, // 금천구 중심좌표
    {
      price: "19,000원",
      location: "노원",
      lat: "37.6377533",
      lng: "127.0754623",
    }, // 노원구 중심좌표
    {
      price: "10,000원",
      location: "도봉",
      lat: "37.6658609",
      lng: "127.0317674",
    }, // 도봉구 중심좌표
    {
      price: "21,000원",
      location: "동대문",
      lat: "37.5838012",
      lng: "127.0507003",
    }, // 동대문구 중심좌표
    {
      price: "31,000원",
      location: "동작",
      lat: "37.4965037",
      lng: "126.9443073",
    }, // 동작구 중심좌표
    {
      price: "31,000원",
      location: "마포",
      lat: "37.5676507",
      lng: "126.8854549",
    }, // 마포구 중심좌표
    {
      price: "41,000원",
      location: "서대문",
      lat: "37.5820369",
      lng: "126.9356665",
    }, // 서대문구 중심좌표
    {
      price: "51,000원",
      location: "서초",
      lat: "37.4769528",
      lng: "127.0378103",
    }, // 서초구 중심좌표
    {
      price: "61,000원",
      location: "성동",
      lat: "37.5506753",
      lng: "127.0409622",
    }, // 성동구 중심좌표
    {
      price: "71,000원",
      location: "성북",
      lat: "37.606991",
      lng: "127.0232185",
    }, // 성북구 중심좌표
    {
      price: "81,000원",
      location: "송파",
      lat: "37.5177941",
      lng: "127.1127078",
    }, // 송파구 중심좌표
    {
      price: "91,000원",
      location: "양천",
      lat: "37.5270616",
      lng: "126.8561534",
    }, // 양천구 중심좌표
    {
      price: "111,000원",
      location: "영등포",
      lat: "37.520641",
      lng: "126.9139242",
    }, // 영등포구 중심좌표
    {
      price: "112,000원",
      location: "용산",
      lat: "37.5311008",
      lng: "126.9810742",
    }, // 용산구 중심좌표
    {
      price: "113,000원",
      location: "은평",
      lat: "37.6176125",
      lng: "126.9227004",
    }, // 은평구 중심좌표
    {
      price: "114,000원",
      location: "종로",
      lat: "37.5990998",
      lng: "126.9861493",
    }, // 종로구 중심좌표
    {
      price: "115,000원",
      location: "중구",
      lat: "37.5579452",
      lng: "126.9941904",
    }, // 중구 중심좌표
    {
      price: "116,000원",
      location: "중랑구",
      lat: "37.598031",
      lng: "127.092931",
    }, // 중랑구 중심좌표
  ];

  return (
    <div>
      <Modal
        className={Style.Modal}
        overlayClassName={Style.Overlay}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
      >
        <label onClick={() => onRequestClose(false)}>X</label>

        <DetailMap lat={37.4959854} lng={127.0664091} markerArr={markerArr} />
      </Modal>
    </div>
  );
};

export default SearchMapModal;
