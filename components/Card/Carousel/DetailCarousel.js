import { useEffect, useState, useRef, forwardRef, Fragment } from "react";
import style from "../../../styles/Component.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const sampleImage =
  "http://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg";

const SearchResultCarousel = (props) => {
  const { items } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (props.initSlide) {
      setCurrentSlide(0);
    }
  }, [currentSlide, props.initSlide]);

  return (
    <>
      <div className={style["DetailSlide"]}>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={true}
          loop={true}
          className="DetailSlide-slide swiper-slide"
        >
          {items &&
            items.map((item, index) => (
              <SwiperSlide key={index} className={style["DetailSlide-thumb"]}>
                <img
                  src={item ? "http://" + item : sampleImage}
                  alt="room-img"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default SearchResultCarousel;
