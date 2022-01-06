import React, { useEffect, useState } from "react";
import NaverMap from "../../../components/Modal/Map/NaverMap";
import CarouselDetail from "../../../components/Card/Carousel/DetailCarousel";
import Style from "../../../styles/Detail.module.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";
import { RiHotelLine } from "react-icons/ri";
import { BsPerson, BsCalendar, BsGeoAlt } from "react-icons/bs";

const DetailView = () => {
  const [rooms, setRooms] = useState([]);
  const [slide, setSlide] = useState(false);
  const [title, setTitle] = useState("");
  const scrollYValue = useSelector(({ scrollY }) => scrollY.value);
  const [changeStyle, setChangeStyle] = useState(Style.site_header);
  const router = useRouter();

  useEffect(() => {
    if (scrollYValue.scrollYValue == 0) {
      setChangeStyle(Style.site_header);
      setTitle("");
    } else if (scrollYValue.scrollYValue <= 100) {
      setChangeStyle(Style.site_header1);
      setTitle("타이틀");
    } else {
      setChangeStyle(Style.site_header2);
      setTitle("타이틀");
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
    Axios({
      method: "GET",
      url: "http://shineware.iptime.org:5050/search",
      params: {
        checkinDate: "20211223",
        checkoutDate: "20211224",
        adult: "2",
        query: "강남",
        size: "10",
      },
    }).then((res) => {
      setRooms((prevState) => ({
        ...prevState,
        item: res.data.roomDocumentList[0].images
          ? res.data.roomDocumentList[0].images
          : [],
      }));
    });
  }, []);

  return (
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
                  {"숙박타입_DB"}
                </span>

                <span className={Style.DetailHeaderMeta_item}>
                  {"호텔명_DB"}
                </span>
              </div>
              <div className={Style.DetailHeaderTitle}>{"호텔명_DB"}</div>
              <div className={Style.DetailHeaderInfo}>
                <div className={Style.DetailHeaderInfoAddress}>
                  <BsGeoAlt className={Style.DetailHeaderInfoAddress_Icon} />
                  {"주소_DB"}
                </div>
                <div className={Style.DetailHeaderInfoFilter}>
                  <BsPerson className={Style.DetailHeaderInfoAddress_Icon} />
                  <span className={Style.DetailHeaderInfoFilter_item}>
                    {"기준인원_DB"}
                  </span>
                  <span className={Style.DetailHeaderInfoFilter_item}>
                    {"체크인 시간_DB"}
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
                <span className={Style.DetailPaymentDate_day}>{"일박_DB"}</span>
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
                        {"금액_DB"}
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
                            {"70000원_DB"}
                          </dd>
                        </dl>
                      </li>
                      <li className={Style.DetailPaymentFreeList_item}>
                        <dl className={Style.DetailPaymentFreeList_inner}>
                          <dt className={Style.DetailPaymentFreeList_title}>
                            추가요금
                          </dt>
                          <dd className={Style.DetailPaymentFreeList_price}>
                            {"90000원_DB"}
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
        <div className={Style.BttonFixButton}>
          <div className={Style.site_container}>
            <button type="button" className={Style.BttonFixButton_button}>
              예약하기
            </button>
          </div>
        </div>
        {/* <!-- .BttonFixButton --> */}
      </div>
      {/* <!-- .컨텐츠 끝 --> */}
    </div>
    // <!-- .Body -->
  );
};

export default DetailView;
