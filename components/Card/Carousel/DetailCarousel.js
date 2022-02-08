import { useEffect, useState, useRef, forwardRef, Fragment } from "react";
import Image from "next/image";
import style from "../../../styles/Carousel.module.css";
import Style from "../../../styles/Detail.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const sampleImage =
  "http://image.goodchoice.kr/resize_490x348/adimg_new/891/279402/934791805cb0b0b25a27081f1dd3f584.jpg";

const Btn = ({ direction, onClick, end, curSlide }) => {
  return (
    <button
      className={
        direction === "prev" ? style.pdpSlidePrevBtn : style.pdpSlideNextBtn
      }
      onClick={onClick}
      direction={direction}
      style={{
        left: direction === "prev" && "1%",
        right: direction === "next" && "1%",
      }}
      disabled={
        (direction === "prev" && curSlide === 0) ||
        (direction === "next" && curSlide === end)
      }
    />
  );
};

const SearchResultCarousel = (props, ref) => {
  const { items } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailAllImageModal, setOpenDetailAllImageModal] = useState(false);
  const slideRef = useRef(null);
  const itemLength = items ? items.length : 0;

  const handleNext = () => {
    if (currentSlide >= itemLength) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide === 0) {
      setCurrentSlide(itemLength);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // const pagination = {
  //   "clickable": true,
  //   "renderBullet": function (index, className) {
  //     return '<span className=\"' + 'DetailSlide_pagination ' + className + '\">' + '</span>';
  //   }
  // }

  useEffect(() => {
    // slideRef.current.style.transition = 'all 300ms ease 0s';
    // slideRef.current.style.transform = `translate3d(-${(currentSlide) * slideRef.current.style.width}px, 0px, 0px)`;
    if (props.initSlide) {
      setCurrentSlide(0);
    }
  }, [currentSlide, props.initSlide]);

  useEffect(() => {
    if (openDetailAllImageModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [openDetailAllImageModal]);

  return (
    <>
      <div className={Style.DetailSlide}>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={true}
          loop={true}
          className="DetailSlide-slide swiper-slide"
        >
          {items &&
            items.map((item, index) => (
              <SwiperSlide key={index} className={Style.DetailSlide_thumb}>
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

SearchResultCarousel.displayName = "SearchResultCarousel";

export default forwardRef(SearchResultCarousel);
