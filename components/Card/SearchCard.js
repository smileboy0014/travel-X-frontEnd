import React, { useEffect } from "react";
import style from "../../styles/SearchCard.module.css";
import { AiFillStar } from "react-icons/ai";
import { BsGeoAlt } from "react-icons/bs";

function SearchResult(props) {
  {
  }

  return (
    <>
      <li className={style.ProductList_item}>
        <div className={style.ProductItem}>
          <div className={style.ProductItem_address}>
            <BsGeoAlt className={style.ProductItem_address_icon} />
            {"주소 입력 부분"}
          </div>

          <div className={style.ProductSlide}>
            <div className={style.ProductSlide_link}>
              <img
                className={style.ProductSlide_link_img}
                src={"http://" + props.images[0]}
                alt=""
              />
            </div>
          </div>

          <div className={style.ProductItemCont}>
            <div className={style.ProductItemMeta}>
              <span className={style.ProductItemMeta_item}>{"숙소 타입"}</span>
              <span className={style.ProductItemMeta_item}>{"숙소명"}</span>
            </div>
            <div className={style.ProductItemTitle}>{props.roomName}</div>
            <div className={style.ProductItemFilter}>
              <span className={style.ProductItemFilter_item}>
                2인 기준 최대 {props.maxUser}인
              </span>
              <span className={style.ProductItemFilter_item}>
                {"숙박시간 입력"}
              </span>
            </div>

            <div className={style.ProductItemPrice}>
              <div className={style.searchResult__stars}>
                <AiFillStar className={style.searchResult_star} />
                <strong>{props.ratingScoreAvg} rating 값이 계속 변경됨 </strong>
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