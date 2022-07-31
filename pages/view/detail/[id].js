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
import { propertyTypeFilter } from '../../../shared/js/CommonFilter';
import classNames from 'classnames/bind';
import { priceComma, splitDateForm } from '../../../shared/js/CommonFun';
import { useTypeFilter } from '../../../shared/js/CommonFilter';

const cx = classNames.bind(Style);

const DetailView = () => {
  const [rooms, setRooms] = useState([]);
  const [userWish, setUserWish] = useState(false);
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
  const userInfo = useSelector((state) => state.userInfo.info);
  const week = new Array("일", "월", "화", "수", "목", "금", "토");
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );
  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );
  const babyCounterValue = useSelector(
    ({ babyCounter }) => babyCounter.value
  );

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

  const handleMyWish = (e) => {
    e.preventDefault();

    let wish;
    const formData = new FormData();

    if (rooms && rooms.userWish) {
      wish = {
        method: "DELETE",
        url: "/wish/delete",
        userWish: false
      };

      formData.append('wishId', userInfo.id);
    } else {
      wish = {
        method: "POST",
        url: "/wish/register",
        userWish: true
      };

      formData.append('userId', userInfo.id);
      formData.append('roomId', id);
      formData.append('useType', useType);
    }

    Axios({
      method: wish.method,
      url: `http://shineware.iptime.org:8081${wish.url}`,
      data: formData,
    }).then((res) => {
      setUserWish(wish.userWish);
      console.log(res.data);
    }).catch((e) => {
      console.error(e);
    });

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
          adult: adultCounterValue,
          children: childCounterValue,
          baby: babyCounterValue,
          userId: userInfo.id
        },
      }).then((res) => {
        console.log(res.data);
        // console.log(res.data.availableDates);
        // console.log(res.data.priceDetails);
        // console.log(res.data.propertyInfo);
        // console.log(res.data.roomInfo);

        // 이미지 수가 너무 많을 경우, 보기 불편해서 최대 SRP에서 보이는 이미지 갯수를 10개로 제한함 by gt.park
        let imgs = null;
        if(res.data.roomInfo.images && res.data.roomInfo.images.length > 10){
          imgs = res.data.roomInfo.images.slice(0,10);
        }

        setRooms((prevState) => ({
          ...prevState,
          item: res.data.roomInfo.images ? (imgs ? imgs: res.data.roomInfo.images) : [],
          roomInfo: res.data.roomInfo ? res.data.roomInfo : [],
          availableDates: res.data.availableDates
            ? res.data.availableDates
            : [],
          priceDetails: res.data.priceDetails ? res.data.priceDetails : [],
          propertyInfo: res.data.propertyInfo ? res.data.propertyInfo : [],
          reviewSummary: res.data.reviewSummary ? res.data.reviewSummary : [],
        }));
        setUserWish(res.data.userWish);
      });
    }
  }, [id,
    detailDate.start,
    detailDate.end,
    adultCounterValue,
    childCounterValue,
    babyCounterValue,

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
                      {propertyTypeFilter(rooms.propertyInfo.type)}
                      {/* {rooms.propertyInfo.type !== undefined
                        ? rooms.propertyInfo.type
                        : "숙박 타입: N/A"} */}
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
                    <span className={(rooms.reviewSummary && rooms.reviewSummary.reviewCount == 0) ? cx("DetailHeaderGrade-current", "no-Review") : Style["DetailHeaderGrade-current"]}>{rooms.reviewSummary.averageReviewScore}</span>
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
                        <span className={Style["DetailHeaderInfoFilter-tit"]}>
                          {useTypeFilter(rooms.roomInfo.useType)}
                        </span>
                        {' '+splitDateForm(rooms.roomInfo.useType == 'NIGHT' ? rooms.roomInfo.nightInfo && rooms.roomInfo.nightInfo.checkinInfo.MONDAY : rooms.roomInfo.dayInfo && rooms.roomInfo.dayInfo.maxUseTimeInfo.MONDAY, rooms.roomInfo.useType)}</span>

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
                      {babyCounterValue > 0 ? `, ` : ""}
                      {babyCounterValue > 0 ? `유아 ${babyCounterValue}명` : ""}
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
                            {priceComma(rooms.priceDetails.BASE + rooms.priceDetails.EXTRA)} 원
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
                    {
                      (rooms.roomInfo != undefined
                        && (rooms.roomInfo.extraOptionList.length > 0)) ?
                        rooms.roomInfo.extraOptionList.map((item, index) => (
                          <li className={Style["DetailInfoItemService-item"]} key={index}>
                            <dl className={Style["DetailInfoItemService-inner"]}>
                              <dt className={Style["DetailInfoItemService-title"]}>{item.title}</dt>
                              <dd className={Style["DetailInfoItemService-text"]}>{priceComma(item.price)}원</dd>
                            </dl>
                          </li>
                        )) :
                        <p className={Style["DetailInfoItem-text"]}>
                          {"추가 가능 옵션이 없습니다."}
                        </p>

                    }
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
            <div className={cx("BttonFixButton", "with-Like")}>
              <div className="site-container">
                <button type="button" className={userWish ? cx("BttonFixButton-like", "is-Active") : Style["BttonFixButton-like"]} onClick={handleMyWish}><span className="ab-text">좋아요</span></button>
                <Link
                  href={{
                    pathname: "/view/reserve/[id]",
                    query: { id: id, useType: useType },
                  }}
                >
                  <button type="button" className={Style["BttonFixButton-button"]}>
                    예약하기
                  </button>
                </Link>
              </div>
            </div>


            <DetailCalendarModal
              isOpen={calendarModalOpen}
              onRequestClose={() => setCalendarModalOpen(false)}
              availableDates={rooms.availableDates}
            />



            <PesonalModal
              isOpen={personalModalOpen}
              maxUser={rooms.roomInfo.maxUser}
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
