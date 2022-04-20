import React, { useEffect, useState } from "react";
import DetailMap from "../../../components/Modal/Map/DetailMap";
import CarouselDetail from "../../../components/Card/Carousel/DetailCarousel";
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";
import ReserveButton from "../../../components/Button/Reserve/ReserveButton";
import Style from "../../../styles/Component.module.css";
import Axios from "axios";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import * as scrollY from "../../../redux/store/modules/scrollY";
import DetailCalendarModal from "../../../components/Modal/Calendar/DetailCalendarModal";
import PesonalModal from "../../../components/Modal/Personal/PersonalModal";

import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const DetailView = () => {
  const [rooms, setRooms] = useState([]);
  const [slide, setSlide] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [personalModalOpen, setPersonalModalOpen] = useState(false);
  const scrollYValue = useSelector(({ scrollY }) => scrollY.value);
  const [changeStyle, setChangeStyle] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, useType, person } = router.query;
  const { detailDate } = useSelector((state) => state.date);
  const week = new Array("일", "월", "화", "수", "목", "금", "토");
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );
  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );

  const priceComma = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  function addZero(value) {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  }

  function FormattingDate(date) {
    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (rooms.roomInfo !== undefined) {
      if (scrollYValue.scrollYValue == 0) {
        setChangeStyle(false);
      } else {
        setChangeStyle(true);
      }
    }
  }, [scrollYValue]);

  useEffect(() => {
    setSlide(false);
    dispatch(scrollY.scrollY(0));
    console.log(rooms);

    return () => {
      setSlide(true);
    };
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      Axios({
        method: "GET",
        url: "http://shineware.iptime.org:8081/pdp/info",
        params: {
          roomId: id,
          useType: useType,
          checkinDate: FormattingDate(new Date(detailDate.start)),
          checkoutDate: FormattingDate(new Date(detailDate.end)),
          children: childCounterValue,
          baby: "0",
          adult: adultCounterValue,
        },
      }).then((res) => {
        console.log(res.data);
        // console.log(res.data.availableDates);
        // console.log(res.data.priceDetails);
        // console.log(res.data.propertyInfo);
        // console.log(res.data.roomInfo);
        setRooms((prevState) => ({
          ...prevState,
          item: res.data.roomInfo.images ? res.data.roomInfo.images : [],
          roomInfo: res.data.roomInfo ? res.data.roomInfo : [],
          availableDates: res.data.availableDates
            ? res.data.availableDates
            : [],
          priceDetails: res.data.priceDetails ? res.data.priceDetails : [],
          propertyInfo: res.data.propertyInfo ? res.data.propertyInfo : [],
          reviewSummary: res.data.reviewSummary ? res.data.reviewSummary : [],
        }));
      });
    }
  }, [id,
    detailDate.start,
    detailDate.end,
    adultCounterValue,
    childCounterValue,

  ]);

  return (
    <>
      {rooms.roomInfo == undefined ? (
        "로딩중"
      ) : (
        <div className="site">
          {/* <!-- Header --> */}
          <div className={changeStyle ? cx("site-header", "Transparent") : cx("site-header", "Transparent", "is-Transparent")}>
            <div className="site-container">
              <div className={Style["Header-inner"]}>
                <DetailTopNavbar HeaderTitle={rooms.roomInfo.propertyName} />
              </div>
            </div>
          </div>
          {/* <!-- .Header --> */}
          {/* <!-- Body --> */}
          <div className="site-body">
            {/* <!-- 컨텐츠 시작 --> */}
            <div className={Style["SinglePage"]}>
              {/* <!-- Slide --> */}
              <div className="DetailSlide">
                <CarouselDetail items={rooms.item} initSlide={slide} />
              </div>
              {/* <!-- .Slide -->*/}
              {/*<!-- DetailHeader --> */}
              <div className={Style["DetailHeader"]}>
                <div className="site-container">
                  <div className={Style["DetailHeaderMeta"]}>
                    {/* <RiHotelLine size={10} /> */}
                    <span className={cx("DetailHeaderMeta-item", "icoHotel")}>
                      {rooms.propertyInfo.type !== undefined
                        ? rooms.propertyInfo.type
                        : "숙박 타입: N/A"}
                    </span>

                    <span className={Style["DetailHeaderMeta-item"]}>
                      {rooms.roomInfo.propertyName}
                    </span>
                  </div>
                  <div className={Style["DetailHeaderTitle"]}>
                    {rooms.roomInfo.name}
                  </div>

                  {/* 필터 페이지로 이동하는 부분  */}

                  <div className={Style["DetailHeaderGrade"]}>
                    <span className={Style["DetailHeaderGrade-current"]}>{rooms.reviewSummary.averageReviewScore}</span>
                    <Link
                      href={{
                        pathname: "/view/review/[id]",
                        query: { id: id },
                      }}
                    ><a>
                        <span className={Style["DetailHeaderGrade-link"]}>후기 {rooms.reviewSummary.reviewCount}개</span>
                      </a></Link>
                  </div>

                  {/*  // 필터 페이지로 이동하는 부분  */}
                  {/* <ReviewModal
                    isOpen={reviewModalOpen}
                    onRequestClose={() => setReviewModalOpen(false)}
                    id={id}
                  ></ReviewModal> */}

                  <div className={Style["DetailHeaderInfo"]}>
                    <div className={Style["DetailHeaderInfoAddress"]}>
                      {rooms.propertyInfo.address !== undefined
                        ? rooms.propertyInfo.address
                        : "주소: N/A"}
                    </div>
                    <div className={Style["DetailHeaderInfoFilter"]}>
                      <span className={Style["DetailHeaderInfoFilter-item"]}>
                        {rooms.roomInfo.baseUser}인 기준
                        최대 {` ${rooms.roomInfo.maxUser}`}인
                      </span>
                      <span className={Style["DetailHeaderInfoFilter-item"]}>
                        체크인: {rooms.roomInfo.nightInfo.checkinInfo.MONDAY}{" "}
                        체크아웃:{rooms.roomInfo.nightInfo.checkoutInfo.MONDAY}
                        인
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- .DetailHeader --> */}
              {/* <!-- .DetailPayment --> */}
              <div className={Style["DetailPayment"]}>
                <div className="site-container">
                  <div className={Style["DetailPaymentDate"]}>
                    <span className={Style["DetailPaymentDate-schedule"]}>
                      {`${new Date(detailDate.start).getMonth() + 1}.${new Date(
                        detailDate.start
                      ).getDate()}(${week[new Date(detailDate.start).getDay()]
                        }) - ${new Date(detailDate.end).getMonth() + 1
                        }.${new Date(detailDate.end).getDate()}(${week[new Date(detailDate.end).getDay()]
                        })`}
                    </span>
                    <span className={Style["DetailPaymentDate-day"]}>
                      {Math.ceil(
                        (new Date(detailDate.end).getTime() -
                          new Date(detailDate.start).getTime()) /
                        (1000 * 60 * 60 * 24)
                      )}
                      박
                    </span>
                    <button
                      type="button"
                      className={Style["DetailPaymentDate-button"]}
                      onClick={() => setCalendarModalOpen(true)}
                    >
                      변경
                    </button>
                  </div>

                  <div className={Style["DetailPaymentPersonnel"]}>
                    <span className={Style["DetailPaymentPersonnel-schedule"]}>
                      {adultCounterValue > 0 ? `성인 ${adultCounterValue}명` : ""}
                      {childCounterValue > 0 ? `, ` : ""}
                      {childCounterValue > 0 ? `어린이 ${childCounterValue}명` : ""}
                    </span>
                    <button
                      type="button"
                      className={Style["DetailPaymentPersonnel-button"]}
                      onClick={() => setPersonalModalOpen(true)}
                    >
                      변경
                    </button>
                  </div>

                  <div className={Style["DetailPaymentFree"]}>
                    <div className={Style["DetailPaymentFree-inner"]}>
                      <div className={Style["DetailPaymentFreeTotal"]}>
                        <dl className={Style["DetailPaymentFreeTotal-inner"]}>
                          <dt className={Style["DetailPaymentFreeTotal-title"]}>
                            총요금
                          </dt>
                          <dd className={Style["DetailPaymentFreeTotal-price"]}>
                            {priceComma(rooms.priceDetails.BASE)} 원
                          </dd>
                        </dl>
                      </div>
                      <div className={Style["DetailPaymentFreeList"]}>
                        <ul className={Style["DetailPaymentFreeList-list"]}>
                          <li className={Style["DetailPaymentFreeList-item"]}>
                            <dl className={Style["DetailPaymentFreeList-inner"]}>
                              <dt className={Style["DetailPaymentFreeList-title"]}>
                                기본요금
                              </dt>
                              <dd className={Style["DetailPaymentFreeList-price"]}>
                                {priceComma(rooms.priceDetails.BASE)} 원
                              </dd>
                            </dl>
                          </li>
                          <li className={Style["DetailPaymentFreeList-item"]}>
                            <dl className={Style["DetailPaymentFreeList-inner"]}>
                              <dt className={Style["DetailPaymentFreeList-title"]}>
                                추가요금
                              </dt>
                              <dd className={Style["DetailPaymentFreeList-price"]}>
                                {priceComma(rooms.priceDetails.EXTRA)} 원
                              </dd>
                            </dl>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- .DetailPayment --> */}
            {/* <!-- DetailInfo --> */}
            <div className={Style["DetailInfo"]}>
              <div className="site-container">
                {/* <!-- item --> */}
                <div className={Style["DetailInfoItem"]}>
                  <div className={Style["DetailInfoItem-title"]}>
                    추가 가능 옵션
                  </div>
                  <ul className={Style["DetailInfoItemService"]}>
                    <li className={Style["DetailInfoItemService-item"]}>
                      <dl className={Style["DetailInfoItemService-inner"]}>
                        <dt className={Style["DetailInfoItemService-title"]}>와이파이</dt>
                        <dd className={Style["DetailInfoItemService-text"]}>100,000</dd>
                      </dl>
                    </li>
                    <li className={Style["DetailInfoItemService-item"]}>
                      <dl className={Style["DetailInfoItemService-inner"]}>
                        <dt className={Style["DetailInfoItemService-title"]}>조식</dt>
                        <dd className={Style["DetailInfoItemService-text"]}>80,000</dd>
                      </dl>
                    </li>
                  </ul>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}
                <div className={Style["DetailInfoItem"]}>
                  <div className={Style["DetailInfoItem-title"]}>공지사항</div>
                  <p className={Style["DetailInfoItem-text"]}>
                    {rooms.roomInfo.notice}
                  </p>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}
                <div className={Style["DetailInfoItem"]}>
                  <div className={Style["DetailInfoItem-title"]}>기본 정보</div>
                  <p className={Style["DetailInfoItem-text"]}>
                    {rooms.roomInfo.basicInfo}
                  </p>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}
                <div className={Style["DetailInfoItem"]}>
                  <div className={Style["DetailInfoItem-title"]}>교통 정보</div>
                  <p className={Style["DetailInfoItem-text"]}>
                    {rooms.roomInfo.trafficInfo}
                  </p>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}

                <div className={Style["DetailInfoItem"]}>
                  <div className={Style["DetailInfoItem-title"]}>기타 정보</div>
                  <p className={Style["DetailInfoItem-text"]}>
                    {rooms.roomInfo.etcInfo}
                  </p>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}
                <div className={Style["DetailInfoItem"]}>
                  <div className={Style["DetailInfoItem-title"]}>위치 정보</div>
                  <div className={Style["DetailInfoItem-map"]}>
                    <DetailMap
                      lat={rooms.propertyInfo.locationLat}
                      lng={rooms.propertyInfo.locationLon}
                    />
                  </div>
                </div>
                {/* <!-- .item --> */}
              </div>
            </div>
            {/* <!-- .DetailInfo --> */}
            {/* <!-- .DetailReview --> */}
            <div className={Style["DetailReview"]}>
              <Link
                href={{
                  pathname: "/view/review/[id]",
                  query: { id: id },
                }}
              >
                <a href="#;" className={Style["DetailReview-link"]}>
                  <div className="site-container">
                    <div className={Style["DetailReview-score"]}>{rooms.reviewSummary.averageReviewScore}</div>
                    <div className={Style["DetailReview-title"]}>{rooms.reviewSummary.reviewCount}개 상세 후기 보기</div>
                  </div>
                </a>
              </Link>
            </div>

            {/* <ReserveButton></ReserveButton> */}

            <Link
              href={{
                pathname: "/view/reserve/[id]",
                query: { id: id },
              }}
            >
              <div className={Style["BttonFixButton"]}>
                <div className="site-container">
                  <button type="button" className={Style["BttonFixButton-button"]}>
                    예약하기
                  </button>
                </div>
              </div>
            </Link>


            <DetailCalendarModal
              isOpen={calendarModalOpen}
              onRequestClose={() => setCalendarModalOpen(false)}
              availableDates={rooms.availableDates}
            />



            <PesonalModal
              isOpen={personalModalOpen}
              onRequestClose={() => setPersonalModalOpen(false)}
            />

            {/* <!-- .BttonFixButton --> */}
          </div>
          {/* <!-- .컨텐츠 끝 --> */}
        </div>
      )}
    </>
    // <!-- .Body -->
  );
};

export default DetailView;
