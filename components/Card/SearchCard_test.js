import React, { useEffect } from "react";
import style from "../../styles/SearchCard.module.css";
import { AiFillStar } from "react-icons/ai";
import { BsGeoAlt } from "react-icons/bs";
import SearchResultCarousel from "./Carousel/SearchResultCarousel";

function SearchResult_test() {
  {
  }

  return (
    <>
      <li className={style.ProductList_item}>
        <div className={style.ProductItem}>
          <div className={style.ProductItem_address}>
            <BsGeoAlt className={style.ProductItem_address_icon} />
            {테스트}
          </div>
          {/* <SearchResultCarousel items={props.images} /> */}
          <div className={style.ProductItemCont}>
            <div className={style.ProductItemMeta}>
              <span className={style.ProductItemMeta_item}>{테스트}</span>
              <span className={style.ProductItemMeta_item}>{테스트}</span>
            </div>
            <div className={style.ProductItemTitle}>{테스트}</div>
            <div className={style.ProductItemFilter}>
              <span className={style.ProductItemFilter_item}>테스트</span>
              <span className={style.ProductItemFilter_item}>테스트</span>
            </div>

            <div className={style.ProductItemPrice}>
              <div className={style.searchResult_stars}>
                <AiFillStar className={style.searchResult_star} />
                <strong>{테스트}</strong>
                <strong></strong>
                <span className={style.ProductItemFilter_item}>테스트</span>
              </div>
            </div>

            <div className={style.ProductItemPrice}>
              <span className={style.ProductItemPrice_current}>테스트</span>
              <span className={style.ProductItemPrice_condition}>{테스트}</span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default SearchResult_test;
