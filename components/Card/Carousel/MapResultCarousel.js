import { useEffect, useState, useRef, forwardRef, Fragment } from "react";
import SwipStyle from "../../../styles/SearchResult.module.css";
import CardStyle from "../../../styles/SearchMobileCard.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';
// import 'swiper/css/virtual';

const sampleImage =
  "http://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg";

const MapResultCarousel = (props, ref) => {
  const { data } = props;
  // console.log(`map data is ${data}`)
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (props.initSlide) {
    setCurrentSlide(0);
    console.log(`initSlide!!!`)
  }
  }, [currentSlide, props.initSlide]);

  return (
    <>
      <div className={CardStyle.MapList}>
        <div className={CardStyle.MapList_link}>
        <Swiper
          // modules={[Pagination]}
          // pagination={true}
          loop={true}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          
          className="swiper-container"
        >
          {data &&
            data.map((item, index) => (
              <SwiperSlide key={index} className="ProductSlide-slide">
                <div className={CardStyle.MapListThumb}>
                    <img
                      className={CardStyle.MapListThumb_img}
                      src={"http://" + item.images[0]}
                      alt="room-img"
                    />
                
                </div>
                <div className={CardStyle.MapListCont}>
                  <div className={CardStyle.MapListCont_meta}>{item.propertyType}</div>
                  <div className={CardStyle.MapListCont_title}>{item.propertyName}</div>
                  <div className={CardStyle.MapListContGrade}>
                    <span className={CardStyle.MapListContGrade_current}>
                      {item.reviewSummary.averageScore.toFixed(1)}
                    </span>
                    <span className={CardStyle.MapListContGrade_total}>
                      {"(" + item.reviewSummary.reviewCount + ")"}
                    </span>
                  </div>
                  <div className={CardStyle.MapListCont_price}>
                    {item.basePrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        </div>
      </div>
    </>
  );
};

MapResultCarousel.displayName = "MapResultCarousel";

export default forwardRef(MapResultCarousel);
