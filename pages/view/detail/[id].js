import React, { useEffect } from "react";
import ReserveNavbar from "../../../components/NavBar/ReserveNavbar";
import NaverMap from "../../../components/Modal/Map/NaverMap";
import Styles from "../../../styles/DetailModal.module.css";

const DetailView = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("모바일");
    } else {
      console.log("윈도우");
    }
  }, []);
  return (
    <div>
      <div>사진</div>
      <div>위치</div>
      <div>날짜</div>
      <div>총금액</div>
      <div>편의시설 및 서비스</div>
      <div>공지사항</div>
      <div>기본정보</div>
      <div>인원추가정보</div>
      <div>투숙객 혜택</div>
      <div>조식정보</div>
      <div>위치정보</div>
      <div>사진</div>
      <div>위치</div>
      <div>날짜</div>
      <div>총금액</div>
      <div>편의시설 및 서비스</div>
      <div>공지사항</div>
      <div>기본정보</div>
      <div>인원추가정보</div>
      <div>투숙객 혜택</div>
      <div>조식정보</div>
      <div>위치정보</div>
      <div>사진</div>
      <div>위치</div>
      <div>날짜</div>
      <div>총금액</div>
      <div>편의시설 및 서비스</div>
      <div>공지사항</div>
      <div>기본정보</div>
      <div>인원추가정보</div>
      <div>투숙객 혜택</div>
      <div>조식정보</div>
      <div>위치정보</div>
      <div>사진</div>
      <div>위치</div>
      <div>날짜</div>
      <div>총금액</div>
      <div>편의시설 및 서비스</div>
      <h2>공지사항</h2>
      <div>블라블라블라</div>
      <h2>기본정보</h2>
      <div>블라블라블라</div>
      <h2>인원추가정보</h2>
      <div>블라블라블라</div>
      <h2>투숙객 혜택</h2>
      <div>블라블라블라</div>
      <h2>조식정보</h2>
      <div>블라블라블라</div>
      <h2>위치정보</h2>
      <div className={Styles.map}>
        <NaverMap />
      </div>
      <ReserveNavbar />
    </div>
  );
};

export default DetailView;
