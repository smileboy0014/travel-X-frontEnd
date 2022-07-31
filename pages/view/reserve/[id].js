import React, { useEffect, useState } from "react";
import Style from "../../../styles/Component.module.css";
import axios from "axios";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import * as scrollY from "../../../redux/store/modules/scrollY";
import classNames from 'classnames/bind';
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";
import {priceComma}  from '../../../shared/js/CommonFun';


const cx = classNames.bind(Style);
const ReserveView = () => {
  const [rooms, setRooms] = useState([]);
  const [extraTotalPrice, setExtraTotalPrice] = useState(0);
  const [optionTotalPrice, setOptionTotalPrice] = useState(0);
  const [extraOptionStateList, setExtraOptionStateList] = useState([]);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  // const { id, useType } = router.query;
	const userInfo = useSelector((state) => state.userInfo.info);

  const [values, setValues] = useState({
    id: '',
    useType: '',
    name: '',
    phone: '',
    visitMethod: ''
  });

  const [isOpenReserveInfoStyle, setIsOpenReserveInfoStyle] = useState(true);
  const [isOpenExtraOptionStyle, setIsOpenExtraOptionStyle] = useState(true);

  const { detailDate } = useSelector((state) => state.date);
  const weekEng = new Array("SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY");

  const adultCounterValue = useSelector(({ adultCounter }) => adultCounter.value);
  const childCounterValue = useSelector(({ childCounter }) => childCounter.value);
  const babyCounterValue = useSelector(({ babyCounter }) => babyCounter.value);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  
  const handleSelectVisitMethod = (e) => {
    const { name } = e.target;
    setValues({...values, visitMethod: name});
	};

  const handleExtraOptionState = (index, value) => {

    setExtraOptionStateList((arr) => {
      if (index > 0) {
        return [
          ...arr.slice(0, index),
          { price: arr[index].price, count: arr[index].count + value },
          ...arr.slice(index + 1)
        ];
      } else if (index == values.length) {
        return [
          ...arr.slice(0, index),
          { price: arr[index].price, count: arr[index].count + value }
        ];
      } else {
        return [
          { price: arr[index].price, count: arr[index].count + value },
          ...arr.slice(index + 1)
        ];
      }
    });

  }

  const onClickHandler = (type) => {
    if (type === 'reserveInfo') {
      setIsOpenReserveInfoStyle(!isOpenReserveInfoStyle);
    } else {
      setIsOpenExtraOptionStyle(!isOpenExtraOptionStyle);
    }
  };

  const setFormData = (formData, data, parentKey) => {
    if (!(formData instanceof FormData)) return;
    if (!(data instanceof Object)) return;
    Object.keys(data).forEach((key) => {
      const val = data[key];
      if (parentKey) key = `${parentKey}[${key}]`;
      if (val instanceof Object && !Array.isArray(val)) {
        return setFormData(formData, val, key);
      }
      if (Array.isArray(val)) {
        val.forEach((v, idx) => {
          if (v instanceof Object) {
            setFormData(formData, v, `${key}[${idx}]`);
          } else {
            formData.append(`${key}[${idx}]`, v);
          }
        });
      } else {
        formData.append(key, val);
      }
    });
  }

  const handlePayButton = () => {
    const order = {
      // order: {
        "adult": adultCounterValue,
        "child": childCounterValue,
        "baby": babyCounterValue,
        "basePrice": rooms.priceDetails.BASE,
        "checkinDay": FormattingDate(new Date(detailDate.start)),
        "checkoutDay": FormattingDate(new Date(detailDate.end)),
        "extraPrice": rooms.priceDetails.EXTRA,
        "name": values.name,
        "optionPrice": optionTotalPrice,
        "orderDate": new Date().toString(),
        "phoneNumber": values.phone,
        "roomId": values.id,
        "useType": values.useType,
        "userId": userInfo.id,
        "authPublisher": userInfo.pub,
        "visitMethod": values.visitMethod
      // }
    };

    const formData = new FormData();
    setFormData(formData, order);

    console.log(formData);

    //TODO : API axios POST
    axios({
      method: "POST",
      url: "http://shineware.iptime.org:8081/order/reservation",
      data: formData
    }).then((res) => {
      console.log(res)
    }).catch((e) => {
      console.error(e);
    });
  };

  const fetchRoomInfo = () => {
    const { id, useType } = router.query;
    setValues({ ...values, id: id, useType: useType });

    if (id !== undefined) {
      axios({
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
        if (res.data.roomInfo.useType == 'NIGHT') {
          if (res.data.roomInfo && res.data.roomInfo.nightInfo && res.data.roomInfo.nightInfo.checkinInfo) {
            setCheckIn(res.data.roomInfo.nightInfo.checkinInfo[weekEng[new Date(detailDate.start).getDay()]]);
            setCheckOut(res.data.roomInfo.nightInfo.checkoutInfo[weekEng[new Date(detailDate.end).getDay()]]);
          }
        } else {
          if (res.data.roomInfo && res.data.roomInfo.dayInfo && res.data.roomInfo.dayInfo.checkinInfo) {
            setCheckIn(res.data.roomInfo.dayInfo.checkinInfo[weekEng[new Date(detailDate.start).getDay()]]);
            setCheckOut(res.data.roomInfo.dayInfo.checkoutInfo[weekEng[new Date(detailDate.end).getDay()]]);
          }
          
        }

        // 개발용 임시 데이터
        // res.data.roomInfo.extraOptionList = [
        //   { title: '바베큐', description: '구성 : 돼지생갈비, 생삼겹살, 닭봉, 대하, 소시지, 구이용야채, 쌈야채, 각종소스, 라면, 햇반', price: '10000' },
        //   { title: '조식', description: '구성 : 돼지생갈비, 생삼겹살, 닭봉, 대하, 소시지, 구이용야채, 쌈야채, 각종소스, 라면, 햇반', price: '10000' },
        //   { title: '중식', description: '구성 : 돼지생갈비, 생삼겹살, 닭봉, 대하, 소시지, 구이용야채, 쌈야채, 각종소스, 라면, 햇반', price: '10000' },
        //   { title: '야식', description: '구성 : 돼지생갈비, 생삼겹살, 닭봉, 대하, 소시지, 구이용야채, 쌈야채, 각종소스, 라면, 햇반', price: '10000' },
        // ];

        setRooms((prevState) => ({
          ...prevState,
          item: res.data.roomInfo.images ? res.data.roomInfo.images : [],
          roomInfo: res.data.roomInfo ? res.data.roomInfo : [],
          availableDates: res.data.availableDates
            ? res.data.availableDates
            : [],
          priceDetails: res.data.priceDetails ? res.data.priceDetails : [],
          propertyInfo: res.data.propertyInfo ? res.data.propertyInfo : [],
          reviewSummary: res.data.reviewSummary ? res.data.reviewSummary : []
        }));

        if (res.data.roomInfo.extraOptionList.length > 0) {
          let optionStateList = [];
          for (let option of res.data.roomInfo.extraOptionList) {
            optionStateList.push({
              price: option.price,
              count: 0
            });
          }
          setExtraOptionStateList(optionStateList);
        }

      });
    }
  }

  useEffect(() => {
    if(router.isReady){
      fetchRoomInfo();
      dispatch(scrollY.scrollY(0));
    }
  }, [router.isReady]);

  useEffect(() => {
    let totalPrice = 0;
    for (let option of extraOptionStateList) {
      totalPrice += option.price * option.count
    }
    setOptionTotalPrice(totalPrice);
  }, [extraOptionStateList])


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
                  <button 
                    className={Style["ResultSectionTitle-text"]} 
                    onClick={() => onClickHandler('reserveInfo')} 
                    type="button"
                  >예약 정보</button>
                </dt>
                <dd className={cx("ResultSectionCont", "SlideDrop")}>
                  <div className={Style["DetailHeaderMeta"]}>
                    <span className={cx("DetailHeaderMeta-item", "icoHotel")}>
                      {rooms.propertyInfo ? rooms.propertyInfo.type : "숙박 타입: N/A"}
                    </span>
                    <span className={Style["DetailHeaderMeta-item"]}>
                      {rooms.propertyInfo ? rooms.propertyInfo.name : ""}
                    </span>
                  </div>
                  <div className={Style["DetailHeaderTitle"]}>
                    {rooms.roomInfo && rooms.roomInfo.name ? 
                      rooms.roomInfo.name : ""}
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
                        {`${new Date(detailDate.start).getMonth() + 1}월 ${new Date(detailDate.start).getDate()}일 
                        - ${new Date(detailDate.end).getMonth() + 1}월 ${new Date(detailDate.end).getDate()}일 `}
                        <strong>
                          {Math.ceil(
                            (new Date(detailDate.end).getTime() -
                              new Date(detailDate.start).getTime()) /
                            (1000 * 60 * 60 * 24)
                          )}박
                        </strong>
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
                          {checkIn}
                        </dd>
                      </dl>
                    </div>
                    <div className={Style["ReservationCheck-item"]}>
                      <dl className="ReservationCheck-inner">
                        <dt className={Style["ReservationCheck-title"]}>체크아웃</dt>
                        <dd className={Style["ReservationCheck-text"]}>
                          {checkOut}

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
                        <input 
                          type="text"
                          name="name" 
                          className={Style["ReservationInput-input"]}
                          value={values.name}
                          onChange={handleChange}
                        />
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
                        <input 
                          type="tel" 
                          name="phone"
                          className={Style["ReservationInput-input"]}
                          value={values.phone}
                          onChange={handleChange}
                        />
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
                        <input 
                          type="radio" 
                          name="WALK" 
                          className={Style["BasicRadio-input"]} 
                          checked={values.visitMethod == 'WALK'} 
                          onClick={handleSelectVisitMethod}
                          readOnly
                        />
                        <span className={Style["BasicRadio-text"]}>도보</span>
                      </label>
                    </li>
                    <li className={Style["ResultSectionList-item"]}>
                      <label className={Style["BasicRadio"]}>
                        <input 
                          type="radio" 
                          name="CAR" 
                          className={Style["BasicRadio-input"]} 
                          checked={values.visitMethod == 'CAR'} 
                          onClick={handleSelectVisitMethod}
                          readOnly
                        />
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
                      {rooms.roomInfo && rooms.roomInfo.extraOptionList ? rooms.roomInfo.extraOptionList.map((option, index) => {
                        return (
                          <li className={Style["FilterNumberList-item"]} key={index}>
                            <dl className={Style["FilterNumberList-inner"]}>
                              <dt className={Style["FilterNumberListTitle"]}>
                                <span className={Style["FilterNumberListTitle-title"]}>{option.title}</span>
                                <span className={Style["FilterNumberListTitle-price"]}>{priceComma(option.price)}원</span>
                                <span className={Style["FilterNumberListTitle-text"]}>{option.description}</span>
                              </dt>
                              {extraOptionStateList[index] ? (
                                <dd className={Style["FilterNumberListCont"]}>
                                  <div className={Style["BasicCount"]}>
                                    <button
                                      disabled={extraOptionStateList[index].count == 0}
                                      onClick={() => handleExtraOptionState(index, -1)}
                                      type="button" className={extraOptionStateList[index].count == 0 ? cx("BasicCount-button", "minus", "is-disabled") : cx("BasicCount-button", "minus")}
                                    >
                                      <span className="ab-text">minus</span></button>
                                      <span className={Style["BasicCount-text"]}>{extraOptionStateList[index].count}</span>
                                    <button
                                      onClick={() => handleExtraOptionState(index, 1)}
                                      type="button" 
                                      className={cx("BasicCount-button", "plus")}
                                    >
                                      <span className="ab-text">plus</span>
                                    </button>
                                  </div>
                                </dd>
                              ) : null}
                            </dl>
                          </li>
                        )
                      })
                      : null}
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
                          <dd className={Style["OptionPriceSection-price"]}>{extraTotalPrice}원 (1인)</dd>
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
                                  : ""}원
                              </dd>
                            </dl>
                          </li>
                          <li className={Style["OptionPriceSum-item"]}>
                            <dl className="OptionPriceSum-inner">
                              <dt className={Style["OptionPriceSum-title"]}>추가옵션</dt>
                              <dd className={Style["OptionPriceSum-price"]}>
                                {priceComma(optionTotalPrice)}원
                              </dd>
                            </dl>
                          </li>
                          <li className={Style["OptionPriceSum-item"]}>
                            <dl className="OptionPriceSum-inner">
                              <dt className={Style["OptionPriceSum-title"]}>인원추가</dt>
                              <dd className={Style["OptionPriceSum-price"]}>
                                {rooms.priceDetails !== undefined
                                  ? priceComma(rooms.priceDetails.EXTRA)
                                  : ""}원
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
                          <label href="#" className={Style["PayMethodListItem"]}>
                            <input type="radio" className={Style["PayMethodListItem-radio"]} name="PayMethodList" readOnly />
                            <span className={Style["PayMethodListItem-inner"]}>
                              <span className={cx("PayMethodListItem-text", "ico-kakaopay")}>카카오페이</span>
                            </span>
                          </label>
                        </a>
                      </li>
                      <li className={Style["PayMethodList-item"]}>
                        <a className={Style["PayMethodListItem"]}>
                          <label href="#" className={Style["PayMethodListItem"]}>
                            <input type="radio" className={Style["PayMethodListItem-radio"]} name="PayMethodList" readOnly />
                            <span className={Style["PayMethodListItem-inner"]}>
                              <span className={cx("PayMethodListItem-text", "ico-toss")}>토스</span>
                            </span>
                          </label>
                        </a>
                      </li>
                      <li className={Style["PayMethodList-item"]}>
                        <a className={Style["PayMethodListItem"]}>
                          <label href="#" className={Style["PayMethodListItem"]}>
                            <input type="radio" className={Style["PayMethodListItem-radio"]} name="PayMethodList" readOnly />
                            <span className={Style["PayMethodListItem-inner"]}>
                              <span className={cx("PayMethodListItem-text", "ico-naverpay")}>네이버페이</span>
                            </span>
                          </label>
                        </a>
                      </li>
                      <li className={Style["PayMethodList-item"]}>
                        <a className={Style["PayMethodListItem"]}>
                          <label href="#" className={Style["PayMethodListItem"]}>
                            <input type="radio" className={Style["PayMethodListItem-radio"]} name="PayMethodList" readOnly />
                            <span className={Style["PayMethodListItem-inner"]}>
                              <span className={cx("PayMethodListItem-text", "ico-payco")}>페이코</span>
                            </span>
                          </label>
                        </a>
                      </li>
                      <li className={Style["PayMethodList-item"]}>
                        <a className={Style["PayMethodListItem"]}>
                          <label href="#" className={Style["PayMethodListItem"]}>
                            <input type="radio" className={Style["PayMethodListItem-radio"]} name="PayMethodList" readOnly />
                            <span className={Style["PayMethodListItem-inner"]}>
                              <span className={cx("PayMethodListItem-text")}>신용/체크카드</span>
                            </span>
                          </label>
                        </a>
                      </li>
                      <li className={Style["PayMethodList-item"]}>
                        <a className={Style["PayMethodListItem"]}>
                          <label href="#" className={Style["PayMethodListItem"]}>
                            <input type="radio" className={Style["PayMethodListItem-radio"]} name="PayMethodList" readOnly />
                            <span className={Style["PayMethodListItem-inner"]}>
                              <span className={Style["PayMethodListItem-text"]}>무통장입금</span>
                            </span>
                          </label>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className={Style["PayMethodListForm"]}>
                    <label className={Style["PayMethodListCheck"]}>
                      <input type="checkbox" name="PayMethodListCheck" className={Style["PayMethodListCheck-input"]} readOnly />
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
              <button 
                type="button" 
                className={Style["FilterPopFooter-button"]}
                onClick={handlePayButton}
              >
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