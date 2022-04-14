import React from "react";
import style from "../../styles/Component.module.css";
import SearchResultCarousel from "./Carousel/SearchResultCarousel";
import Link from 'next/link'
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function SearchResult(props) {
  console.log()
  return (
    <li className={style["ProductList-item"]}>
      <div className={style["ProductItem"]}>
        <div className={style["ProductItem-address"]}>
          {props.address}
        </div>
        
        <div className={style["ProductSlide"]}>
          <SearchResultCarousel items={props.images} roomId={props.id} useType={props.useType} />
          <div className={style["ProductItemCont"]}>
            <Link
              href={{
                pathname: "/view/detail/[id]",
                query: { id: props.id, useType: props.useType },
              }}
            >
              <a className={style["ProductItemCont-link"]}>
                <div className={style["ProductItemMeta"]}>
                  <span className={cx("ProductItemMeta-item", "icoHotel")}>
                    {props.propertyType}
                  </span>
                  <span className={style["ProductItemMeta-item"]}>
                    {props.propertyName}
                  </span>
                </div>
                <div className={style["ProductItemTitle"]}>{props.roomName}</div>
                <div className={style["ProductItemGrade"]}>
                  <span className={style["ProductItemGrade-current"]}>{props.averageScore}</span>
                  <span className={style["ProductItemGrade-total"]}>{"(" + props.reviewCount + ")"}</span>
                </div>
                <div className={style["ProductItemFilter"]}>
                  <span className={style["ProductItemFilter-item"]}>
                    기준: {props.baseUser}인 최대: {props.maxUser}인
                  </span>
                  <span className={style["ProductItemFilter-item"]}>
                    체크인: {props.checkinInfo} 체크아웃:{props.checkoutInfo}인
                  </span>
                </div>
                <div className={style["ProductItemPrice"]}>
                  <span className={style["ProductItemPrice-current"]}>
                    {props.totalPrice}원
                  </span>
                  <span className={style["ProductItemPrice-condition"]}>
                    {`${props.basePrice}+${props.extraPrice}원`}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SearchResult;
