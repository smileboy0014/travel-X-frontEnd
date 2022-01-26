import React, { useEffect, useState } from "react";
import DetailMap from "../../../components/Modal/Map/DetailMap";
import CarouselDetail from "../../../components/Card/Carousel/DetailCarousel";
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";
import ReserveButton from "../../../components/Button/Reserve/ReserveButton";
import Style from "../../../styles/Detail.module.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RiHotelLine } from "react-icons/ri";
import { BsPerson, BsCalendar, BsGeoAlt } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import ReviewModal from "../../../components/Modal/Review/ReviewModal";
import DetailCalendarModal from "../../../components/Modal/Calendar/DetailCalendarModal";

const DetailView = () => {
  const [rooms, setRooms] = useState([]);
  const [slide, setSlide] = useState(false);
  const [title, setTitle] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const scrollYValue = useSelector(({ scrollY }) => scrollY.value);
  const [changeStyle, setChangeStyle] = useState(Style.site_header);
  const router = useRouter();
  const { id } = router.query;
  const { detailDate } = useSelector((state) => state.date);
  const week = new Array("일", "월", "화", "수", "목", "금", "토");
 
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
        setChangeStyle(Style.site_header);
        setTitle("");
      } else if (scrollYValue.scrollYValue <= 100) {
        setChangeStyle(Style.site_header1);
        setTitle(rooms.roomInfo.propertyName);
      } else {
        setChangeStyle(Style.site_header2);
        setTitle(rooms.roomInfo.propertyName);
      }
    }
  }, [scrollYValue]);

  useEffect(() => {
    if (scrollYValue.scrollYValue > 0) {
      setChangeStyle(Style.site_header);
      setTitle("");
    }
  }, []);

  useEffect(() => {
    setSlide(false);
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
          useType: "NIGHT",
          checkinDate: FormattingDate(new Date(detailDate.start)),
          checkoutDate: FormattingDate(new Date(detailDate.end)),
          children: "0",
          baby: "0",
          adult: "2",
        },
      }).then((res) => {
        console.log(res.data);
        console.log(res.data.availableDates);
        console.log(res.data.priceDetails);
        console.log(res.data.propertyInfo);
        console.log(res.data.roomInfo);
        setRooms((prevState) => ({
          ...prevState,
          item: res.data.roomInfo.images ? res.data.roomInfo.images : [],
          roomInfo: res.data.roomInfo ? res.data.roomInfo : [],
          availableDates: res.data.availableDates
            ? res.data.availableDates
            : [],
          priceDetails: res.data.priceDetails ? res.data.priceDetails : [],
          propertyInfo: res.data.propertyInfo ? res.data.propertyInfo : [],
        }));
      });
    }
  }, [id]);

  return (
    <>
      {rooms.roomInfo == undefined ? (
        "로딩중"
      ) : (
        <div className={Style.site}>
          {/* <!-- Header --> */}
          <div className={changeStyle}>
            <div className={Style.site_container}>
              <div className={Style.Header_inner}>
                <DetailTopNavbar HeaderTitle={title} />
              </div>
            </div>
          </div>
          {/* <!-- .Header --> */}
          {/* <!-- Body --> */}
          <div className={Style.site_body}>
            {/* <!-- 컨텐츠 시작 --> */}
            <div className={Style.SinglePage}>
              {/* <!-- Slide --> */}
              <div className="DetailSlide">
                <CarouselDetail items={rooms.item} initSlide={slide} />
              </div>
              {/* <!-- .Slide -->
				<!-- DetailHeader --> */}
              <div className={Style.DetailHeader}>
                <div className={Style.site_container}>
                  <div className={Style.DetailHeaderMeta}>
                    <RiHotelLine size={10} />
                    <span className={Style.DetailHeaderMeta_item}>
                      {rooms.propertyInfo.type !== undefined
                        ? rooms.propertyInfo.type
                        : "숙박 타입: N/A"}
                    </span>

                    <span className={Style.DetailHeaderMeta_item}>
                      {rooms.roomInfo.propertyName}
                    </span>
                  </div>
                  <div className={Style.DetailHeaderTitle}>
                    {rooms.roomInfo.propertyName}
                  </div>

                  <button
                    className={Style.searchResult_stars}
                    onClick={() => {
                      setReviewModalOpen(true);
                    }}
                  >
                    <AiFillStar className={Style.searchResult_star} />
                    <strong>5.0_DB</strong>
                    <span className={Style.DetailHeaderInfoAddress}>
                      {"후기 1000개 >_DB"}
                    </span>
                  </button>

                  <ReviewModal
                    isOpen={reviewModalOpen}
                    onRequestClose={() => setReviewModalOpen(false)}
                  ></ReviewModal>

                  <div className={Style.DetailHeaderInfo}>
                    <div className={Style.DetailHeaderInfoAddress}>
                      <BsGeoAlt
                        className={Style.DetailHeaderInfoAddress_Icon}
                      />
                      {rooms.propertyInfo.address !== undefined
                        ? rooms.propertyInfo.address
                        : "주소: N/A"}
                    </div>
                    <div className={Style.DetailHeaderInfoFilter}>
                      <BsPerson
                        className={Style.DetailHeaderInfoAddress_Icon}
                      />
                      <span className={Style.DetailHeaderInfoFilter_item}>
                        기준: {rooms.roomInfo.baseUser}인, 최대:{" "}
                        {rooms.roomInfo.maxUser}인
                      </span>
                      <span className={Style.DetailHeaderInfoFilter_item}>
                        체크인: {rooms.roomInfo.nightInfo.checkinInfo.MONDAY}{" "}
                        체크아웃:{rooms.roomInfo.nightInfo.checkoutInfo.MONDAY}
                        인
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- .DetailHeader -->
				<!-- .DetailPayment --> */}
              <div className={Style.DetailPayment}>
                <div className={Style.site_container}>
                  <div className={Style.DetailPaymentDate}>
                    <span className={Style.DetailPaymentDate_schedule}>
                      <BsCalendar
                        className={Style.DetailPaymentDate_schedule_Icon}
                      />
                      {`${new Date(detailDate.start).getMonth() + 1}.${new Date(
                        detailDate.start
                      ).getDate()}(${
                        week[new Date(detailDate.start).getDay()]
                      }) - ${
                        new Date(detailDate.end).getMonth() + 1
                      }.${new Date(detailDate.end).getDate()}(${
                        week[new Date(detailDate.end).getDay()]
                      })`}
                    </span>
                    <span className={Style.DetailPaymentDate_day}>
                      {Math.ceil(
                        (new Date(detailDate.end).getTime() -
                          new Date(detailDate.start).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}
                      박
                    </span>
                    <button
                      type="button"
                      className={Style.DetailPaymentDate_button}
                      onClick={() => setCalendarModalOpen(true)}
                    >
                      변경
                    </button>
                  </div>
                  <div className={Style.DetailPaymentFree}>
                    <div className={Style.DetailPaymentFree_inner}>
                      <div className={Style.DetailPaymentFreeTotal}>
                        <dl className={Style.DetailPaymentFreeTotal_inner}>
                          <dt className={Style.DetailPaymentFreeTotal_title}>
                            총요금
                          </dt>
                          <dd className={Style.DetailPaymentFreeTotal_price}>
                            {rooms.priceDetails.BASE} 원
                          </dd>
                        </dl>
                      </div>
                      <div className={Style.DetailPaymentFreeList}>
                        <ul className={Style.DetailPaymentFreeList_list}>
                          <li className={Style.DetailPaymentFreeList_item}>
                            <dl className={Style.DetailPaymentFreeList_inner}>
                              <dt className={Style.DetailPaymentFreeList_title}>
                                기본요금
                              </dt>
                              <dd className={Style.DetailPaymentFreeList_price}>
                                {rooms.priceDetails.BASE} 원
                              </dd>
                            </dl>
                          </li>
                          <li className={Style.DetailPaymentFreeList_item}>
                            <dl className={Style.DetailPaymentFreeList_inner}>
                              <dt className={Style.DetailPaymentFreeList_title}>
                                추가요금
                              </dt>
                              <dd className={Style.DetailPaymentFreeList_price}>
                                {rooms.priceDetails.EXTRA} 원
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
            {/* <!-- .DetailPayment -->
				<!-- DetailInfo --> */}
            <div className={Style.DetailInfo}>
              <div className={Style.site_container}>
                {/* <!-- item --> */}
                <div className={Style.DetailInfoItem}>
                  <div className={Style.DetailInfoItem_title}>
                    편의 시설 및 서비스_DB
                  </div>
                  <ul className={Style.DetailInfoItem_list}>
                    <li className={Style.DetailInfoItem_item}>
                      {"체크인 : 15:00 체크아웃 : 12:00_DB"}
                    </li>
                    <li className={Style.DetailInfoItem_item}>
                      {"22시 이후 체크인 시 호텔 프론트 문의_DB"}
                    </li>
                  </ul>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}
                <div className={Style.DetailInfoItem}>
                  <div className={Style.DetailInfoItem_title}>공지사항</div>
                  <p className={Style.DetailInfoItem_text}>
                    {rooms.roomInfo.notice}
                  </p>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}
                <div className={Style.DetailInfoItem}>
                  <div className={Style.DetailInfoItem_title}>기본 정보</div>
                  <p className={Style.DetailInfoItem_text}>
                    {rooms.roomInfo.basicInfo}
                  </p>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}
                <div className={Style.DetailInfoItem}>
                  <div className={Style.DetailInfoItem_title}>교통 정보</div>
                  <p className={Style.DetailInfoItem_text}>
                    {rooms.roomInfo.trafficInfo}
                  </p>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}

                <div className={Style.DetailInfoItem}>
                  <div className={Style.DetailInfoItem_title}>기타 정보</div>
                  <p className={Style.DetailInfoItem_text}>
                    {rooms.roomInfo.etcInfo}
                  </p>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}
                <div className={Style.DetailInfoItem}>
                  <div className={Style.DetailInfoItem_title}>위치 정보</div>
                  <DetailMap
                    lat={rooms.propertyInfo.locationLat}
                    lng={rooms.propertyInfo.locationLon}
                  />
                </div>
                {/* <!-- .item --> */}
              </div>
            </div>
            {/* <!-- .DetailInfo -->
				<!-- BttonFixButton --> */}

            <ReserveButton></ReserveButton>

            <DetailCalendarModal
              isOpen={calendarModalOpen}
              onRequestClose={() => setCalendarModalOpen(false)}
              availableDates={rooms.availableDates}
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
