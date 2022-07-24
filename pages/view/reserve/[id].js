import React, { useEffect, useState } from "react";
import Style from "../../../styles/Component.module.css";
import Axios from "axios";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from 'classnames/bind';
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";
import {priceComma}  from '../../../shared/js/CommonFun';


const cx = classNames.bind(Style);
const ReserveView = () => {
  const [rooms, setRooms] = useState([]);
  const [optionTotalPrice, setOptionTotalPrice] = useState(0);
  const [optionPrice1, setOptionPrice1] = useState(1);
  const [optionPrice2, setOptionPrice2] = useState(1);
  const [optionPrice3, setOptionPrice3] = useState(1);
  const [optionPrice4, setOptionPrice4] = useState(1);
  const [basePrice1, setbasePrice1] = useState(0);
  const [basePrice2, setbasePrice2] = useState(0);
  const [basePrice3, setbasePrice3] = useState(0);
  const [basePrice4, setbasePrice4] = useState(0);
  const [extraOptionList, setExtraOptionList] = useState([]);

  const [chekIn, setCheckIn] = useState("");
  const [chekOut, setCheckOut] = useState("");

  const [roomId, setRommId] = useState("");
  const [roomUseType, setRoomUseType] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const { id, useType, person } = router.query;
  const [isOpenReserveInfoStyle, setIsOpenReserveInfoStyle] = useState(true);
  const [isOpenExtraOptionStyle, setIsOpenExtraOptionStyle] = useState(true);
  const { detailDate } = useSelector((state) => state.date);
  const week = new Array("일", "월", "화", "수", "목", "금", "토");
  const weekEng = new Array("SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY");
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

  const onClickHandler = (type) => {
    if (type === 'reserveInfo') {
      setIsOpenReserveInfoStyle(!isOpenReserveInfoStyle);
    } else {
      setIsOpenExtraOptionStyle(!isOpenExtraOptionStyle);
    }
  };

  useEffect(() => {
    var price1 = basePrice1 * optionPrice1;
    var price2 = basePrice2 * optionPrice2;
    var price3 = basePrice3 * optionPrice3;
    var price4 = basePrice4 * optionPrice4;
    setOptionTotalPrice(price1 + price2 + price3 + price4)
  }, [optionPrice1, optionPrice2, optionPrice3, optionPrice4]);



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

        },
      }).then((res) => {

        setCheckIn(res.data.roomInfo.nightInfo.checkinInfo[weekEng[new Date(detailDate.start).getDay()]]);
        setCheckOut(res.data.roomInfo.nightInfo.checkoutInfo[weekEng[new Date(detailDate.end).getDay()]]);

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


        if (res.data.roomInfo.extraOptionList.length > 0) {

          setExtraOptionList(res.data.roomInfo.extraOptionList)


          console.log(res.data.roomInfo.extraOptionList);

          if (res.data.roomInfo.extraOptionList[0] != undefined) {
            setbasePrice1(res.data.roomInfo.extraOptionList[0].price)
          }
          if (res.data.roomInfo.extraOptionList[1] != undefined) {
            setbasePrice2(res.data.roomInfo.extraOptionList[1].price)
          }
          if (res.data.roomInfo.extraOptionList[2] != undefined) {
            setbasePrice3(res.data.roomInfo.extraOptionList[2].price)
          }
          if (res.data.roomInfo.extraOptionList[3] != undefined) {
            setbasePrice4(res.data.roomInfo.extraOptionList[3].price)
          }
        }

      });
    }
  }, []);


  return (
    <div className="site">
      {/* <!-- Header --> */}
      <div className={Style["site-header"]}>
        <div className="site-container">
          <div className={Style["Header-inner"]}>
            <DetailTopNavbar HeaderTitle={`예약 정보`} />
          </div>
        </div>
      </div>
      {/* <!-- .Header --> */}
      {/* <!-- Body --> */}
      <div className="site-body">
        {/* <!-- 컨텐츠 시작 --> */}
        <div className={Style["ResultPage"]}>
          {/* <!-- ResultSection --> */}
          <div className={Style["ResultSection"]}>
            <div className="site-container">
              <dl className={isOpenReserveInfoStyle ? cx("ResultSection-inner", "is-Open") : "ResultSection-inner"}>
                <dt className="ResultSectionTitle">
                  <button className={Style["ResultSectionTitle-text"]} onClick={() => onClickHandler('reserveInfo')} type="button">예약 정보</button>
                </dt>
                <dd className={cx("ResultSectionCont", "SlideDrop")}>
                  <div className={Style["DetailHeaderMeta"]}>
                    <span className={cx("DetailHeaderMeta-item", "icoHotel")}>
                      {rooms.propertyInfo !== undefined
                        ? rooms.propertyInfo.type
                        : "숙박 타입: N/A"}
                    </span>
                    <span className={Style["DetailHeaderMeta-item"]}>

                      {rooms.propertyInfo !== undefined
                        ? rooms.propertyInfo.propertyName
                        : ""}

                    </span>
                  </div>
                  <div className={Style["DetailHeaderTitle"]}>

                    {rooms.propertyInfo !== undefined
                      ? rooms.propertyInfo.name
                      : ""}


                  </div>
                  <div className={Style["DetailHeaderInfo"]}>
                    <div className={Style["DetailHeaderInfoAddress"]}>
                      {rooms.propertyInfo !== undefined
                        ? rooms.propertyInfo.address
                        : "주소: N/A"}

                    </div>
                  </div>
                  {/* <!-- ReservationInfo --> */}
                  <div className={Style["ReservationInfo"]}>
                    <div className={Style["ReservationInfo-item"]}>
                      <span className={cx("ReservationInfo-text", "ico-Cal")}>
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
                    </div>
                    <div className={Style["ReservationInfo-item"]}>
                      <span className={cx("ReservationInfo-text", "ico-User")}>
                        {adultCounterValue > 0 ? `성인 ${adultCounterValue}명` : ""}
                        {childCounterValue > 0 ? `, ` : ""}
                        {childCounterValue > 0 ? `어린이 ${childCounterValue}명` : ""}
                        {babyCounterValue > 0 ? `, ` : ""}
                        {babyCounterValue > 0 ? `유아 ${babyCounterValue}명` : ""}
                      </span>
                    </div>
                  </div>
                  {/* <!-- ReservationInfo --> */}
                  {/* <!-- ReservationCheck --> */}
                  <div className={Style["ReservationCheck"]}>
                    <div className={Style["ReservationCheck-item"]}>
                      <dl className="ReservationCheck-inner">
                        <dt className={Style["ReservationCheck-title"]}>체크인</dt>
                        <dd className={Style["ReservationCheck-text"]}>
                          {chekIn}
                        </dd>
                      </dl>
                    </div>
                    <div className={Style["ReservationCheck-item"]}>
                      <dl className="ReservationCheck-inner">
                        <dt className={Style["ReservationCheck-title"]}>체크아웃</dt>
                        <dd className={Style["ReservationCheck-text"]}>
                          {chekOut}

                        </dd>
                      </dl>
                    </div>
                  </div>
                  {/* <!-- ReservationCheck --> */}
                </dd>
              </dl>
            </div>
          </div>
          {/* <!-- .ResultSection --> */}
          {/* <!-- ResultSection --> */}
          <div className={cx("ResultSection", "Box-UserInfo")}>
            <div className="site-container">
              <dl className="ResultSection-inner">
                <dt className={Style["ResultSectionTitle"]}>
                  <div className={Style["ResultSectionTitle-text"]}>예약자 정보 <span className="necessary">*</span></div>
                </dt>
                <dd className={Style["ResultSectionCont"]}>
                  {/* <!-- ReservationInput --> */}
                  <div className={Style["ReservationInput"]}>
                    <dl className="ReservationInput-inner">
                      <dt className={Style["ReservationInput-title"]}>
                        <label className={Style["ReservationInput-label"]}>
                          성명
                          <span className={Style["necessary"]}>*</span></label>
                      </dt>
                      <dd className="ReservationInput-text">
                        <input type="text" className={Style["ReservationInput-input"]} />
                      </dd>
                    </dl>
                  </div>
                  {/* <!-- .ReservationInput --> */}
                  {/* <!-- ReservationInput --> */}
                  <div className={Style["ReservationInput"]}>
                    <dl className="ReservationInput-inner">
                      <dt className={Style["ReservationInput-title"]}>
                        <label className={Style["ReservationInput-label"]}>휴대폰 번호 <span className={Style["necessary"]}>*</span></label>
                      </dt>
                      <dd className="ReservationInput-text">
                        <input type="tel" className={Style["ReservationInput-input"]} />
                      </dd>
                    </dl>
                  </div>
                  {/* <!-- .ReservationInput --> */}
                </dd>
              </dl>
            </div>
          </div>
          {/* <!-- .ResultSection --> */}
          {/* <!-- ResultSection --> */}
          <div className={cx("ResultSection", "Box-Transportation")}>
            <div className="site-container">
              <dl className={Style["ResultSection-inner"]}>
                <dt className={Style["ResultSectionTitle"]}>
                  <div className={Style["ResultSectionTitle-text"]}>숙소 방문 수단 <span className="necessary">*</span></div>
                </dt>
                <dd className={Style["ResultSectionCont"]}>
                  <ul className={Style["ResultSectionList"]}>
                    <li className={Style["ResultSectionList-item"]}>
                      <label className={Style["BasicRadio"]}>
                        <input type="radio" name="BasicRadio" className={Style["BasicRadio-input"]} />
                        <span className={Style["BasicRadio-text"]}>도보</span>
                      </label>
                    </li>
                    <li className={Style["ResultSectionList-item"]}>
                      <label className={Style["BasicRadio"]}>
                        <input type="radio" name="BasicRadio" className={Style["BasicRadio-input"]} />
                        <span className={Style["BasicRadio-text"]}>자동차</span>
                      </label>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
          {/* <!-- .ResultSection --> */}
          {/* <!-- ResultSection --> */}
          <div className={Style["ResultSection"]}>
            <div className="site-container">
              <dl className={isOpenExtraOptionStyle ? cx("ResultSection-inner", "is-Open") : "ResultSection-inner"}>
                <dt className={Style["ResultSectionTitle"]}>
                  <button className={Style["ResultSectionTitle-text"]} onClick={() => onClickHandler('extraOption')} type="button">옵션 추가</button>
                </dt>
                <dd className={cx("ResultSectionCont", "SlideDrop")}>
                  {/* <!-- OptionFilter --> */}
                  <div className={Style["OptionFilter"]}>
                    <ul className={Style["FilterNumberList"]}>

                      {basePrice1 != 0 ?
                        <li className={Style["FilterNumberList-item"]}>
                          <dl className={Style["FilterNumberList-inner"]}>
                            <dt className={Style["FilterNumberListTitle"]}>
                              <span className={Style["FilterNumberListTitle-title"]}>{extraOptionList[0].title}</span>
                              <span className={Style["FilterNumberListTitle-price"]}>{priceComma(basePrice1)}원</span>
                              <span className={Style["FilterNumberListTitle-text"]}>{extraOptionList[0].description}</span>
                            </dt>
                            <dd className={Style["FilterNumberListCont"]}>
                              <div className={Style["BasicCount"]}>
                                <button
                                  disabled={optionPrice1 == 0}
                                  onClick={() => setOptionPrice1(optionPrice1 - 1)}
                                  type="button" className={optionPrice1 == 0 ? cx("BasicCount-button", "minus") : cx("BasicCount-button", "minus")}>
                                  <span className="ab-text">minus</span></button>
                                <span className="BasicCount-text">{optionPrice1}</span>
                                <button
                                  onClick={
                                    () => setOptionPrice1(optionPrice1 + 1)
                                  }
                                  type="button" className={cx("BasicCount-button", "plus")}><span className="ab-text">plus</span>
                                </button>
                              </div>
                            </dd>
                          </dl>
                        </li>

                        : ""}
                      {basePrice2 != 0 ?
                        <li className={Style["FilterNumberList-item"]}>
                          <dl className={Style["FilterNumberList-inner"]}>
                            <dt className={Style["FilterNumberListTitle"]}>

                              <span className={Style["FilterNumberListTitle-title"]}>{extraOptionList[1].title}</span>
                              <span className={Style["FilterNumberListTitle-price"]}>{priceComma(basePrice2)}원</span>
                              <span className={Style["FilterNumberListTitle-text"]}>{extraOptionList[1].description}</span>



                            </dt>
                            <dd className={Style["FilterNumberListCont"]}>
                              <div className={Style["BasicCount"]}>
                                <button
                                  disabled={optionPrice2 == 0}
                                  onClick={() => setOptionPrice2(optionPrice2 - 1)}
                                  type="button" className={optionPrice2 == 0 ? cx("BasicCount-button", "minus") : cx("BasicCount-button", "minus")}>
                                  <span className="ab-text">minus</span></button>
                                <span className="BasicCount-text">{optionPrice2}</span>
                                <button
                                  onClick={
                                    () => setOptionPrice2(optionPrice2 + 1)
                                  }
                                  type="button" className={cx("BasicCount-button", "plus")}><span className="ab-text">plus</span></button>
                              </div>
                            </dd>
                          </dl>
                        </li>

                        : ""}
                      {basePrice3 != 0 ?
                        <li className={Style["FilterNumberList-item"]}>
                          <dl className={Style["FilterNumberList-inner"]}>
                            <dt className={Style["FilterNumberListTitle"]}>


                              <span className={Style["FilterNumberListTitle-title"]}>{extraOptionList[2].title}</span>
                              <span className={Style["FilterNumberListTitle-price"]}>{priceComma(basePrice3)}원</span>
                              <span className={Style["FilterNumberListTitle-text"]}>{extraOptionList[2].description}</span>



                            </dt>
                            <dd className={Style["FilterNumberListCont"]}>
                              <div className={Style["BasicCount"]}>
                                <button
                                  disabled={optionPrice3 == 0}
                                  onClick={() => setOptionPrice3(optionPrice3 - 1)}
                                  type="button" className={optionPrice3 == 0 ? cx("BasicCount-button", "minus") : cx("BasicCount-button", "minus")}>
                                  <span className="ab-text">minus</span></button>
                                <span className="BasicCount-text">{optionPrice3}</span>
                                <button
                                  onClick={
                                    () => setOptionPrice3(optionPrice3 + 1)
                                  }
                                  type="button" className={cx("BasicCount-button", "plus")}><span className="ab-text">plus</span></button>
                              </div>
                            </dd>
                          </dl>
                        </li>

                        : ""}
                      {basePrice4 != 0 ?
                        <li className={Style["FilterNumberList-item"]}>
                          <dl className={Style["FilterNumberList-inner"]}>
                            <dt className={Style["FilterNumberListTitle"]}>

                              <span className={Style["FilterNumberListTitle-title"]}>{extraOptionList[3].title}</span>
                              <span className={Style["FilterNumberListTitle-price"]}>{priceComma(basePrice4)}원</span>
                              <span className={Style["FilterNumberListTitle-text"]}>{extraOptionList[3].description}</span>



                            </dt>
                            <dd className={Style["FilterNumberListCont"]}>
                              <div className={Style["BasicCount"]}>
                                <button
                                  disabled={optionPrice4 == 0}
                                  onClick={() => setOptionPrice4(optionPrice4 - 1)}
                                  type="button" className={optionPrice4 == 0 ? cx("BasicCount-button", "minus") : cx("BasicCount-button", "minus")}>
                                  <span className="ab-text">minus</span></button>
                                <span className="BasicCount-text">{optionPrice4}</span>
                                <button
                                  onClick={
                                    () => setOptionPrice4(optionPrice4 + 1)
                                  }
                                  type="button" className={cx("BasicCount-button", "plus")}><span className="ab-text">plus</span></button>
                              </div>
                            </dd>
                          </dl>
                        </li>
                        : ""}

                    </ul>
                  </div>
                  {/* <!-- .OptionFilter --> */}
                  {/* <!-- OptionPriceSection --> */}
                  <div className={Style["OptionPriceSection"]}>
                    <ul className={Style["OptionPriceSection-list"]}>
                      <li className={Style["OptionPriceSection-item"]}>
                        <dl className={Style["OptionPriceSection-inner"]}>
                          <dt className={Style["OptionPriceSection-title"]}>옵션 추가</dt>
                          <dd className={Style["OptionPriceSection-price"]}> {priceComma(optionTotalPrice)}원</dd>
                        </dl>
                      </li>
                      <li className={Style["OptionPriceSection-item"]}>
                        <dl className={Style["OptionPriceSection-inner"]}>
                          <dt className={Style["OptionPriceSection-title"]}>인원 추가</dt>
                          <dd className={Style["OptionPriceSection-price"]}>10,000원 (1인)</dd>
                        </dl>
                      </li>
                    </ul>
                    <div className={Style["OptionPriceTotal"]}>
                      <div className={Style["OptionPriceSum"]}>
                        <ul className={Style["OptionPriceSum-list"]}>
                          <li className={Style["OptionPriceSum-item"]}>
                            <dl className="OptionPriceSum-inner">
                              <dt className={Style["OptionPriceSum-title"]}>예약금액</dt>
                              <dd className={Style["OptionPriceSum-price"]}>
                                {rooms.priceDetails !== undefined
                                  ? priceComma(rooms.priceDetails.BASE)
                                  : ""} 원
                              </dd>
                            </dl>
                          </li>
                          <li className={Style["OptionPriceSum-item"]}>
                            <dl className="OptionPriceSum-inner">
                              <dt className={Style["OptionPriceSum-title"]}>추가옵션</dt>
                              <dd className={Style["OptionPriceSum-price"]}>

                                {priceComma(optionTotalPrice)}

                              </dd>
                            </dl>
                          </li>
                          <li className={Style["OptionPriceSum-item"]}>
                            <dl className="OptionPriceSum-inner">
                              <dt className={Style["OptionPriceSum-title"]}>인원추가</dt>
                              <dd className={Style["OptionPriceSum-price"]}>
                                {rooms.priceDetails !== undefined
                                  ? priceComma(rooms.priceDetails.EXTRA)
                                  : ""} 원
                              </dd>
                            </dl>
                          </li>
                        </ul>
                      </div>
                      <div className={Style["OptionTotalPrice"]}>
                        <dl className={Style["OptionTotalPrice-inner"]}>
                          <dt className={Style["OptionTotalPrice-title"]}>총 금액</dt>
                          <dd className={Style["OptionTotalPrice-text"]}>


                            {rooms.priceDetails !== undefined
                              ? priceComma(rooms.priceDetails.BASE + optionTotalPrice + rooms.priceDetails.EXTRA)
                              : ""} 원


                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  {/* <!-- .OptionPriceSection --> */}
                </dd>
              </dl>
            </div>
          </div>
          {/* <!-- .ResultSection --> */}
          {/* <!-- ResultSection --> */}
          <div className={cx("ResultSection", "Pay-Method")}>
            <div className="site-container">
              <dl className="ResultSection-inner">
                <dt className="ResultSectionTitle">
                  <div className={Style["ResultSectionTitle-text"]}>결제 수단 선택</div>
                </dt>
                <dd className={Style["ResultSectionCont"]}>
                  <div className="PayMethodList">
                    <ul className={Style["PayMethodList-list"]}>
                      <li className={Style["PayMethodList-item"]}>
                        <a className={Style["PayMethodListItem"]}>
                          <span className={cx("PayMethodListItem-text", "ico-kakaopay")}>카카오페이</span>
                        </a>
                      </li>
                      <li className={Style["PayMethodList-item"]}>
                        <a className={Style["PayMethodListItem"]}>
                          <span className={cx("PayMethodListItem-text", "ico-toss")}>토스</span>
                        </a>
                      </li>
                      <li className={Style["PayMethodList-item"]}>
                        <a className={Style["PayMethodListItem"]}>
                          <span className={cx("PayMethodListItem-text", "ico-naverpay")}>네이버페이</span>
                        </a>
                      </li>
                      <li className={Style["PayMethodList-item"]}>
                        <a className={Style["PayMethodListItem"]}>
                          <span className={cx("PayMethodListItem-text", "ico-payco")}>페이코</span>
                        </a>
                      </li>
                      <li className={Style["PayMethodList-item"]}>
                        <a className={Style["PayMethodListItem"]}>
                          <span className={Style["PayMethodListItem-text"]}>신용/체크카드</span>
                        </a>
                      </li>
                      <li className={Style["PayMethodList-item"]}>
                        <a className={Style["PayMethodListItem"]}>
                          <span className={Style["PayMethodListItem-text"]}>무통장입금</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className={Style["PayMethodListForm"]}>
                    <label className={Style["PayMethodListCheck"]}>
                      <input type="checkbox" name="PayMethodListCheck" className={Style["PayMethodListCheck-input"]} />
                      <span className={Style["PayMethodListCheck-text"]}>이 결제수단을 다음에도 사용</span>
                    </label>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          {/* <!-- .ResultSection --> */}
          {/* <!-- .ResultLastSection --> */}
          <div className={Style["ResultLastSection"]}>
            <div className="site-container">
              <p className={Style["ResultInfoText"]}><span className={Style["color-blue"]}>이용규칙, 취소 및 환불 규칙, 개인정보 수집 및 이용 및 개인정보 제3자 제공</span> 에 동의하실 경우 결제하기를 클릭해주세요.</p>
              <button type="button" className={Style["FilterPopFooter-button"]}>
                {rooms.priceDetails !== undefined
                  ? priceComma(rooms.priceDetails.BASE + optionTotalPrice + rooms.priceDetails.EXTRA)
                  : ""} 원 결제하기
              </button>
              <p className={Style["ResultInfoText-sub"]}>는 통신판매중개업자로서, 통신판매의 당사자가 아니라는 사실을 고지하며 상품의 결제, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.</p>
            </div>
          </div>
          {/* <!-- .ResultLastSection --> */}
        </div>
        {/* <!-- .컨텐츠 끝 --> */}
      </div>
      {/* <!-- .Body --> */}
    </div>
  )

}

export default ReserveView;