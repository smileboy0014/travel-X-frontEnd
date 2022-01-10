import { useEffect, useState, useRef, forwardRef, Fragment } from "react";
import Style from "../../../styles/SearchResult.module.css";
import DetailAllImageModal from "../../Modal/RoomDetail/DetailAllImageModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const sampleImage =
  "http://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg";

const SearchResultCarousel = (props, ref) => {
  const { items } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (props.initSlide) {
      setCurrentSlide(0);
    }
  }, [currentSlide, props.initSlide]);

  return (
    <>
      <div className={Style.ProductSlide}>
        <Swiper
          modules={[Pagination]}
          pagination={true}
          loop={true}
          className="swiper-container"
        >
          {items &&
            items.map((item, index) => (
              <SwiperSlide key={index} className="ProductSlide-slide">
                <div className={Style.ProductSlide_thumb}>
                  <a href="#" className={Style.ProductSlide_link}>
                    <img
                      className={Style.ProductSlide_link_img}
                      src={item ? "http://" + item : sampleImage}
                      alt="search-room-img"
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

SearchResultCarousel.displayName = "SearchResultCarousel";

export default forwardRef(SearchResultCarousel);
