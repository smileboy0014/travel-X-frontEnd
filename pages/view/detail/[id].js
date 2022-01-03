import React, { useEffect, useState } from "react";
import ReserveNavbar from "../../../components/NavBar/ReserveNavbar";
import NaverMap from "../../../components/Modal/Map/NaverMap";
import Styles from "../../../styles/DetailModal.module.css";
import { isMobile } from "react-device-detect";
import CarouselDetail from "../../../components/Card/Carousel/RoomDetailCarousel";
import Style from "../../../styles/BackLayout.module.css";
import Axios from "axios";
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";

const DetailView = () => {
  const [rooms, setRooms] = useState([]);
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://shineware.iptime.org:5050/search",
      params: {
        checkinDate: "20211223",
        checkoutDate: "20211224",
        adult: "2",
        query: "강남",
        size: "10",
      },
    }).then((res) => {
      setRooms((prevState) => ({
        ...prevState,
        item: res.data.roomDocumentList[0].images
          ? res.data.roomDocumentList[0].images
          : [],
      }));
    });
  }, [isMobile]);

  // useEffect(() => {
  //   if (isMobile) {
  //     console.log("모바일");
  //   } else {
  //     console.log("WEB");
  //   }
  // }, [isMobile]);

  useEffect(() => {
    setSlide(false);
    return () => {
      setSlide(true);
    };
  }, []);

  return (
    <div className={Style.main}>
      <div className={Style.subMain}>
        <CarouselDetail items={rooms.item} initSlide={slide} />
        <DetailTopNavbar />

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
    </div>
  );
};

export default DetailView;
