import React, { useRef } from "react";
import Carousel from "./Carousel/Carousel_test";
import style from "../../styles/Carousel.module.css";

const SearchResultList = ({ items }) => {
  const carouselRef = useRef(null);

  return (
    <div className={style.container}>
      <div>
        <div>
          <Carousel ref={carouselRef} items={items.images} />
          <p>CSS 조정 필요</p>
          <p>CSS 조정 필요</p>
          <p>CSS 조정 필요</p>
        </div>
        <div>
          <p>주소: {items.address}</p>
          <h3>이름: {items.propertyName}</h3>
          <p>룸이름: {items.roomName}</p>
        </div>

        <div>
          <div>
            <p>
              <strong>타입: {items.propertyType}</strong>
            </p>
          </div>
          <div>
            <h2>가격: {items.price}</h2>
          </div>
        </div>
      </div>
      <p>____</p>
    </div>
  );
};

export default SearchResultList;
