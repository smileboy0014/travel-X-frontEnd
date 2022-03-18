import React, { useEffect, useState } from "react";
import Style from "../../styles/Component.module.css";
import MapResultCarousel from "./Carousel/MapResultCarousel";

const SearchMobileCard = ({ data, closeModal, initSlide }) => {
  // const [slide, setSlide] = useState(false);

  useEffect(() => {
    // console.log("data: " + JSON.stringify(data));
    // setSlide(false);
    // return () =>{
    //   setSlide(true);
    // }
  }, [data]);

  const onClickClosed = () => {
    if (closeModal !== undefined) {
      closeModal(true);
    }
  };

  return (
    <>
      <button className={Style["ListFixButton"]} onClick={onClickClosed}>
        리스트 보기
      </button>
      <button className={Style["ChangeIcon"]}>
        <span className="ab-text">아이콘 위치변경</span>
      </button>
      {data[0] !== undefined && 
      <MapResultCarousel
        data={data}
        initSlide={initSlide}
      />}
      {/* {data[0] !== undefined && (
        <div className={Style.MapList}>
          <div className={Style.MapList_link}>
            <div className={Style.MapListThumb}>
              <img
                className={Style.MapListThumb_img}
                src={"http://" + data[0].img}
                alt="room-img"
              />
            </div>
            <div className={Style.MapListCont}>
              <div className={Style.MapListCont_meta}>{data[0].tpye}</div>
              <div className={Style.MapListCont_title}>{data[0].name}</div>
              <div className={Style.MapListContGrade}>
                <span className={Style.MapListContGrade_current}>
                  {data[0].averageScore.toFixed(1)}
                </span>
                <span className={Style.MapListContGrade_total}>
                  {"(" + data[0].reviewCount + ")"}
                </span>
              </div>
              <div className={Style.MapListCont_price}>
                {data[0].price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default SearchMobileCard;
