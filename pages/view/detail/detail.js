import React, { useEffect, useState } from "react";
import ReserveNavbar from "../../../components/NavBar/ReserveNavbar";
import NaverMap from "../../../components/Modal/Map/NaverMap";
import Styles from "../../../styles/DetailModal.module.css";
import { isMobile } from "react-device-detect";
import CarouselDetail from "../../../components/Card/Carousel/RoomDetailCarousel";
import Style from "../../../styles/Detail.module.css";
import Axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/router";
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar_test";

import { RiHotelLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";

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
    <div class={Style.site}>
      {/* <!-- Header --> */}
      <div class={changeStyle}>
        <div class={Style.site_container}>
          <div class={Style.Header_inner}>
            <DetailTopNavbar HeaderTitle={title} />
          </div>
        </div>
      </div>
      {/* <!-- .Header --> */}
      {/* <!-- Body --> */}
      <div class={Style.site_body}>
        {/* <!-- 컨텐츠 시작 --> */}
        <div class={Style.SinglePage}>
          {/* <!-- Slide --> */}
          <div class="DetailSlide">
            <CarouselDetail items={rooms.item} initSlide={slide} />
          </div>
          {/* <!-- .Slide -->
				<!-- DetailHeader --> */}
          <div class={Style.DetailHeader}>
            <div class={Style.site_container}>
              <div class={Style.DetailHeaderMeta}>
                <RiHotelLine size={10} />
                <span class={Style.DetailHeaderMeta_item}>호텔</span>

                <span class={Style.DetailHeaderMeta_item}>
                  슈페리어 트윈 호텔
                </span>
              </div>
              <div class={Style.DetailHeaderTitle}>
                슈페리어 트윈 (넷플릭스 - 숙소 문의)
              </div>
              <div class={Style.DetailHeaderInfo}>
                <div class={Style.DetailHeaderInfoAddress}>
                  <BsPerson size={15} />
                  {" 서울 강남구 논현동 201-11"}
                </div>
                <div class={Style.DetailHeaderInfoFilter}>
                  <span class={Style.DetailHeaderInfoFilter_item}>
                    <BsPerson size={1} /> 2인 기준 최대 4인
                  </span>
                  <span class={Style.DetailHeaderInfoFilter_item}>
                    숙박 17시부터
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- .DetailHeader -->
				<!-- .DetailPayment --> */}
          <div class={Style.DetailPayment}>
            <div class={Style.site_container}>
              <div class={Style.DetailPaymentDate}>
                <span class={Style.DetailPaymentDate_schedule}>
                  12.20(월) - 12.22(수)
                </span>
                <span class={Style.DetailPaymentDate_day}>2박</span>
                <button type="button" class={Style.DetailPaymentDate_button}>
                  변경
                </button>
              </div>
              <div class={Style.DetailPaymentFree}>
                <div class={Style.DetailPaymentFree_inner}>
                  <div class={Style.DetailPaymentFreeTotal}>
                    <dl class={Style.DetailPaymentFreeTotal_inner}>
                      <dt class={Style.DetailPaymentFreeTotal_title}>총요금</dt>
                      <dd class={Style.DetailPaymentFreeTotal_price}>
                        79,000원
                      </dd>
                    </dl>
                  </div>
                  <div class={Style.DetailPaymentFreeList}>
                    <ul class={Style.DetailPaymentFreeList_list}>
                      <li class={Style.DetailPaymentFreeList_item}>
                        <dl class={Style.DetailPaymentFreeList_inner}>
                          <dt class={Style.DetailPaymentFreeList_title}>
                            기본요금
                          </dt>
                          <dd class={Style.DetailPaymentFreeList_price}>
                            70,000원
                          </dd>
                        </dl>
                      </li>
                      <li class={Style.DetailPaymentFreeList_item}>
                        <dl class={Style.DetailPaymentFreeList_inner}>
                          <dt class={Style.DetailPaymentFreeList_title}>
                            추가요금
                          </dt>
                          <dd class={Style.DetailPaymentFreeList_price}>
                            9,000원
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
        <div class={Style.DetailInfo}>
          <div class={Style.site_container}>
            {/* <!-- item --> */}
            <div class={Style.DetailInfoItem}>
              <div class={Style.DetailInfoItem_title}>편의 시설 및 서비스</div>
              <ul class={Style.DetailInfoItem_list}>
                <li class={Style.DetailInfoItem_item}>
                  체크인 : 15:00 체크아웃 : 12:00
                </li>
                <li class={Style.DetailInfoItem_item}>
                  22시 이후 체크인 시 호텔 프론트 문의
                </li>
                <li class={Style.DetailInfoItem_item}>무료 Wi-Fi</li>
                <li class={Style.DetailInfoItem_item}>전 객실 금연</li>
                <li class={Style.DetailInfoItem_item}>
                  Bath Amenity (칫솔 무료)
                </li>
                <li class={Style.DetailInfoItem_item}>
                  주차 가능 (1일 12,000원 / 객실 당 1 대)
                </li>
              </ul>
            </div>
            {/* <!-- .item -->
						<!-- item --> */}
            <div class={Style.DetailInfoItem}>
              <div class={Style.DetailInfoItem_title}>공지사항</div>
              <p class={Style.DetailInfoItem_text}>
                사회적 거리두기 2단계 격상에 따라 11월 24일 0시부터 피드니스
                센터 운영이 일시적으로 중단됩니다.{" "}
              </p>
            </div>
            {/* <!-- .item -->
						<!-- item --> */}
            <div class={Style.DetailInfoItem}>
              <div class={Style.DetailInfoItem_title}>기본 정보</div>
              <p class={Style.DetailInfoItem_text}>전 객실 인원 추가 불가</p>
            </div>
            {/* <!-- .item -->
						<!-- item --> */}
            <div class={Style.DetailInfoItem}>
              <div class={Style.DetailInfoItem_title}>인원 추가 정보</div>
              <p class={Style.DetailInfoItem_text}>피트니스 센터 무료</p>
            </div>
            {/* <!-- .item -->
						<!-- item --> */}
            <div class={Style.DetailInfoItem}>
              <div class={Style.DetailInfoItem_title}>투숙객 혜택</div>
              <p class={Style.DetailInfoItem_text}>레스토랑 / 3층</p>
            </div>
            {/* <!-- .item -->
						<!-- item --> */}
            <div class={Style.DetailInfoItem}>
              <div class={Style.DetailInfoItem_title}>조식 정보</div>
              <p class={Style.DetailInfoItem_text}>
                레스토랑 (Bistro 860 by 신세계 푸드) / 3층 / 06:30~10:30 /
                2020년 2월 29일 부터 별도 공지일까지 조식당 미운영)
                <br />
                1인 22,000원 (만 11세 이상~ 성인), 11,000원(36개월 이상 ~ 만
                10세 이하), 36개월 미만 무료
              </p>
            </div>
            {/* <!-- .item -->
						<!-- item --> */}
            <div class={Style.DetailInfoItem}>
              <div class={Style.DetailInfoItem_title}>위치 정보</div>
              <div class="DetailInfoItem-map">
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.840102855145!2d127.0571507156064!3d37.51168923502441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d6bd01b%3A0x30702ebd32133065!2z7Iqk7YOA7ZWE65OcIOy9lOyXkeyKpOuqsA!5e0!3m2!1sko!2skr!4v1641260994254!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe> */}
              </div>
            </div>
            {/* <!-- .item --> */}
          </div>
        </div>
        {/* <!-- .DetailInfo -->
				<!-- BttonFixButton --> */}
        <div class={Style.BttonFixButton}>
          <div class={Style.site_container}>
            <button type="button" class={Style.BttonFixButton_button}>
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
