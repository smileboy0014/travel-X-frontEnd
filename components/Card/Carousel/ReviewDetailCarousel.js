import { useEffect, useState } from "react";
import Style from "../../../styles/Component.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';


const ReviewDetailCarousel = ({ data, clickPicture }) => {
  console.log(typeof(clickPicture));
  // debugger;
  // const { data, galleryData } = props;
  // console.log(`review data is ${data}`)
  const [currentSlide, setCurrentSlide] = useState(0);
  

  const swiperStyle = {
    width: "40%",
    height: "100%",
    marginLeft: "0px"
  }

  const onClickHandler = (data) =>{
    
    clickPicture(data);
  }

  return (
    <Swiper
      style={swiperStyle}
      modules={[Pagination]}
      pagination={true}
      spaceBetween={10}
      slidesPerView={3}
    >
      {data &&
        data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={Style["ReviewList"]}>
              <div className={Style["Review-link"]}>
                <div className={Style["ReviewThumb"]}>
                  <a href="#;" className="ReviewSlide-link" onClick={() => clickPicture(data)}>
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
