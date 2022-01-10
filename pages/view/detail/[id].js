import React, { useEffect, useState } from "react";
import NaverMap from "../../../components/Modal/Map/NaverMap";
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

const DetailView = () => {
  const [rooms, setRooms] = useState([]);
  const [slide, setSlide] = useState(false);
  const [title, setTitle] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const scrollYValue = useSelector(({ scrollY }) => scrollY.value);
  const [changeStyle, setChangeStyle] = useState(Style.site_header);
  const router = useRouter();
  const { id } = router.query;

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
          checkinDate: "20220109",
          checkoutDate: "20220110",
          children: "0",
          baby: "0",
          adult: "2",
        },
      }).then((res) => {
        console.log("전체: " + res.data);
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
                    <strong>100_DB 연동</strong>
                    <span className={Style.ProductItemFilter_item}>
                      (1000)_DB연동
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
                      {"일자_DB"}
                    </span>
                    <span className={Style.DetailPaymentDate_day}>
                      {"일박_DB"}
                    </span>
                    <button
                      type="button"
                      className={Style.DetailPaymentDate_button}
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
                    편의 시설 및 서비스
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
                    {
                      "사회적 거리두기 2단계 격상에 따라 11월 24일 0시부터 피드니스 센터 운영이 일시적으로 중단됩니다._DB"
                    }
                  </p>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}
                <div className={Style.DetailInfoItem}>
                  <div className={Style.DetailInfoItem_title}>기본 정보</div>
                  <p className={Style.DetailInfoItem_text}>
                    전 객실 인원 추가 불가_DB
                  </p>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}
                <div className={Style.DetailInfoItem}>
                  <div className={Style.DetailInfoItem_title}>조식 정보</div>
                  <p className={Style.DetailInfoItem_text}>
                    {
                      " 레스토랑 (Bistro 860 by 신세계 푸드) / 3층 / 06:30~10:30 /  2020년 2월 29일 부터 별도 공지일까지 조식당 미운영_DB"
                    }
                  </p>
                </div>
                {/* <!-- .item -->
						<!-- item --> */}
                <div className={Style.DetailInfoItem}>
                  <div className={Style.DetailInfoItem_title}>위치 정보</div>
                </div>
                {/* <!-- .item --> */}
              </div>
            </div>
            {/* <!-- .DetailInfo -->
				<!-- BttonFixButton --> */}

            <ReserveButton></ReserveButton>

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
