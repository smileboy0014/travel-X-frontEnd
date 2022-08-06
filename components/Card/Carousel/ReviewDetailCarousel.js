import { useEffect, useState, Fragment } from "react";
import Style from "../../../styles/Component.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Axios from "axios";
import Modal from "react-modal";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';

const swiperStyle = {
  width: "100%",
  height: "100%",
  marginLeft: "0px"
}

const ReviewDetailCarousel = ({ data, galleryData }) => {
  // console.log(`props data is ${data}`);

  const onClickHandler = (data) => {
    // console.log(data);
    galleryData(data);
  }

  return (
    <Swiper
      style={swiperStyle}
      modules={[Pagination]}
      pagination={true}
      spaceBetween={10}
      slidesPerView={3}
    >
      {data && data.map((item, index) => (
        <SwiperSlide key={index}>
          <div className={Style["ReviewList"]}>
            <div className={Style["Review-link"]}>
              <div className={Style["ReviewThumb"]}>
                <a href="#" className="ReviewSlide-link" onClick={() => onClickHandler(data)}>
                  <img
                    src={"http://" + item}
                    alt="room-img"
                  />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewDetailCarousel;