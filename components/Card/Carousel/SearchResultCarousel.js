import { useEffect, useState } from "react";
import Style from "../../../styles/Component.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Link from 'next/link'
import "swiper/css";
import "swiper/css/pagination";

const sampleImage =
  "http://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg";

const SearchResultCarousel = (props) => {
  const { items, roomId } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (props.initSlide) {
      setCurrentSlide(0);
    }
  }, [currentSlide, props.initSlide]);

  return (
    <Swiper
      modules={[Pagination]}
      pagination={true}
      loop={true}
      className="swiper-container"
    >
      {items &&
        items.map((item, index) => (
          <SwiperSlide key={index} className={Style["ProductSlide-slide"]}>
            <div className={Style["ProductSlide-thumb"]}>
              <Link
                href={{
                  pathname: "/view/detail/[id]",
                  query: { id: roomId },
                }}
              >
                <a className={Style["ProductSlide-link"]}>
                  <img
                    src={item ? "http://" + item : sampleImage}
                    alt="search-room-img"
                  />
                </a>
              </Link>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SearchResultCarousel;
