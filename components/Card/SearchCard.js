import React, { useEffect } from "react";
import style from "../../styles/SearchCard.module.css";
import { AiFillStar } from "react-icons/ai";
import { BsGeoAlt } from "react-icons/bs";
import SearchResultCarousel from "./Carousel/SearchResultCarousel";

function SearchResult(props) {
  {
  }

  return (
    <>
      <li className={style.ProductList_item}>
        <div className={style.ProductItem}>
          <div className={style.ProductItem_address}>
            <BsGeoAlt className={style.ProductItem_address_icon} />
            {props.address}
          </div>
          <SearchResultCarousel items={props.images} />
          <div className={style.ProductItemCont}>
            <div className={style.ProductItemMeta}>
              <span className={style.ProductItemMeta_item}>
                {props.propertyType}
              </span>
              <span className={style.ProductItemMeta_item}>
                {props.propertyName}
              </span>
            </div>
            <div className={style.ProductItemTitle}>{props.roomName}</div>
            <div className={style.ProductItemFilter}>
              <span className={style.ProductItemFilter_item}>
                기준: {props.baseUser}인 최대: {props.maxUser}인
              </span>
              <span className={style.ProductItemFilter_item}>
                체크인: {props.checkinInfo} 체크아웃:{props.checkoutInfo}인
              </span>
            </div>

            <div className={style.ProductItemPrice}>
              <div className={style.searchResult_stars}>
                <AiFillStar className={style.searchResult_star} />
                <strong>{props.ratingScoreAvg}</strong>
                <strong></strong>
                <span className={style.ProductItemFilter_item}>
                  (1000)_DB연동
                </span>
              </div>
            </div>

            <div className={style.ProductItemPrice}>
              <span className={style.ProductItemPrice_current}>
                ₩{props.price}원
              </span>
              <span className={style.ProductItemPrice_condition}>
                {"추가요금 관련"}
              </span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default SearchResult;
