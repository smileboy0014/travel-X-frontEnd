import { useEffect, useState } from "react";
import Style from "../../../styles/Component.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';
import Link from "next/link";


const MapResultCarousel = (props) => {
  // debugger;
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
    <Swiper
      modules={[Pagination]}
      pagination={true}
      // loop={true}
      spaceBetween={50}
      // slidesPerView={1}
      // navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
      
      // className="swiper-container"
    >
      {data &&
        data.map((item, index) => (
          <SwiperSlide key={index}>
            <Link
              href={{
                pathname: "/view/detail/[id]",
                query: { id: item.id, useType: item.useType },
              }}
            >
              <div className={Style["MapList"]} style={{width: '100%'}}>
                <div className={Style["MapList-link"]} style={{ cursor: "pointer" }}>
                  <div className={Style["MapListThumb"]}>
                    <img
                      src={"http://" + item.img}
                      alt="room-img"
                    />
                  </div>
                  <div className={Style["MapListCont"]}>
                    <div className={Style["MapListCont-meta"]}>{item.type}</div>
                    <div className={Style["MapListCont-title"]}>{item.name}</div>
                    <div className={Style["MapListContGrade"]}>
                      <span className={Style["MapListContGrade-current"]}>
                        {/* {item.averageReviewScore.toFixed(1)} */}
                        {item.averageScore != undefined ? item.averageScore : 0}
                      </span>
                      <span className={Style["MapListContGrade-total"]}>
                        {/* {"(" + item.reviewCount + ")"} */}
                        {"("+(item.reviewCount !== undefined ? item.reviewCount  : 0) + ")"} 
                      </span>
                    </div>
                    <div className={Style["MapListCont-price"]}>
                      {item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default MapResultCarousel;
