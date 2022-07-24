import { useEffect, useState, useRef } from "react";
import Style from "../../../styles/Component.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from 'styled-components';
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const StyledRoot = styled.div`
  .swiper {
    &-wrapper {
      flex-direction: column;
      height:3.75rem;
    },
    &-container {
      padding: 3.75rem 0;
    }
  }
`;

const SignUpBirthdayCarousel = ({ items, setValue, indexState }) => {

  const handleSlideChange = (e) => {
    const tmout = setTimeout(() => {
      setValue(e.snapIndex);
      clearTimeout(tmout);
    }, 100)
  }

  useEffect(() => {
    // console.log(indexState);
  }, [indexState]);

  return (
    <StyledRoot>
      <div className={Style["BirthdaySlide"]}>
        <Swiper
          modules={[]}
          observer={true}
          observeParents={true}
          watchOverflow={true}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => swiper.slideTo(indexState)}
          direction="vertical"
          className={Style["BirthdaySlide-container"]}
        >
          {items &&
            items.map((item, index) => (
            <SwiperSlide key={index} className={cx("BirthdaySlide-slide", "swiper-slide")}>
              {({ isActive }) => (
                <div className={isActive ? cx("BirthdaySlideText", "swiper-slide-active") : Style["BirthdaySlideText"]}>{item}</div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </StyledRoot>
  );
};

export default SignUpBirthdayCarousel;
