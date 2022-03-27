import React, { useEffect, useState } from "react";
import Style from "../../../styles/Component.module.css";
import Axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import classNames from 'classnames/bind';
import DetailTopNavbar from "../../../components/NavBar/DetailTopNavbar";

const cx = classNames.bind(Style);

const ReserveView = () => {

  const [isOpenReserveInfoStyle, setIsOpenReserveInfoStyle] = useState(true);
  const [isOpenExtraOptionStyle, setIsOpenExtraOptionStyle] = useState(true);

  const onClickHandler = (type) =>{
    
    if(type === 'reserveInfo'){
      setIsOpenReserveInfoStyle(!isOpenReserveInfoStyle);
    } else {
      setIsOpenExtraOptionStyle(!isOpenExtraOptionStyle);
    }
  };

  useEffect(()=>{
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
                    <span className={cx("DetailHeaderMeta-item", "icoHotel")}>호텔</span>
                    <span className={Style["DetailHeaderMeta-item"]}>슈페리어 트윈 호텔</span>
                  </div>
                  <div className={Style["DetailHeaderTitle"]}>슈페리어 트윈 (넷플릭스 - 숙소 문의)</div>
                  <div className={Style["DetailHeaderInfo"]}>
                    <div className={Style["DetailHeaderInfoAddress"]}>서울 강남구 논현동 201-11</div>
                  </div>
                  {/* <!-- ReservationInfo --> */}
                  <div className={Style["ReservationInfo"]}>
                    <div className={Style["ReservationInfo-item"]}>
                      <span className={cx("ReservationInfo-text", "ico-Cal")}>12월 26일 ~ 27일 <strong>1박</strong></span>
                    </div>
                    <div className={Style["ReservationInfo-item"]}>
                      <span className={cx("ReservationInfo-text", "ico-User")}>성인 1명, 유아 1명</span>
                    </div>
                  </div>
                  {/* <!-- ReservationInfo --> */}
                  {/* <!-- ReservationCheck --> */}
                  <div className={Style["ReservationCheck"]}>
                    <div className={Style["ReservationCheck-item"]}>
                      <dl className="ReservationCheck-inner">
                        <dt className={Style["ReservationCheck-title"]}>체크인</dt>
                        <dd className={Style["ReservationCheck-text"]}>15:00</dd>
                      </dl>
                    </div>
                    <div className={Style["ReservationCheck-item"]}>
                      <dl className="ReservationCheck-inner">
                        <dt className={Style["ReservationCheck-title"]}>체크아웃</dt>
                        <dd className={Style["ReservationCheck-text"]}>15:00</dd>
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
                        <input type="text"  className={Style["ReservationInput-input"]} />
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
                        <input type="tel"  className={Style["ReservationInput-input"]} />
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
              <dl className={isOpenExtraOptionStyle ? cx("ResultSection-inner", "is-Open")  : "ResultSection-inner" }>
                <dt className={Style["ResultSectionTitle"]}>
                  <button className={Style["ResultSectionTitle-text"]} onClick={()=> onClickHandler('extraOption')} type="button">옵션 추가</button>
                </dt>
                <dd className={cx("ResultSectionCont", "SlideDrop")}>
                  {/* <!-- OptionFilter --> */}
                  <div className={Style["OptionFilter"]}>
                    <ul className={Style["FilterNumberList"]}>
                      <li className={Style["FilterNumberList-item"]}>
                        <dl className={Style["FilterNumberList-inner"]}>
                          <dt className={Style["FilterNumberListTitle"]}>
                            <span className={Style["FilterNumberListTitle-title"]}>바베큐</span>
                            <span className={Style["FilterNumberListTitle-price"]}>0원</span>
                            <span className={Style["FilterNumberListTitle-text"]}>구성 : 돼지생갈비, 생삼겹살, 닭봉, 대하, 소시지, 구이용야채, 쌈야채, 각종소스, 라면, 햇반</span>
                          </dt>
                          <dd className={Style["FilterNumberListCont"]}>
                            <div className={Style["BasicCount"]}>
                              {/* <!-- 버튼 최대, 최소값일시 is-disabled 클래스 추가 --> */}
                              <button type="button" className={cx("BasicCount-button", "minus", "is-disabled")}><span className="ab-text">minus</span></button>
                              <span className="BasicCount-text">0</span>
                              <button type="button" className={cx("BasicCount-button", "plus")}><span className="ab-text">plus</span></button>
                            </div>
                          </dd>
                        </dl>
                      </li>
                      <li className={Style["FilterNumberList-item"]}>
                        <dl className={Style["FilterNumberList-inner"]}>
                          <dt className={Style["FilterNumberListTitle"]}>
                            <span className={Style["FilterNumberListTitle-title"]}>조식</span>
                            <span className={Style["FilterNumberListTitle-price"]}>10,000원</span>
                            <span className={Style["FilterNumberListTitle-text"]}>구성 : 돼지생갈비, 생삼겹살, 닭봉, 대하, 소시지, 구이용야채, 쌈야채, 각종소스, 라면, 햇반</span>
                          </dt>
                          <dd className={Style["FilterNumberListCont"]}>
                            <div className={Style["BasicCount"]}>
                              <button type="button" className={cx("BasicCount-button", "minus", "is-disabled")}><span className="ab-text">minus</span></button>
                              <span className={Style["BasicCount-text"]}>0</span>
                              <button type="button" className={cx("BasicCount-button", "plus")}><span className="ab-text">plus</span></button>
                            </div>
                          </dd>
                        </dl>
                      </li>
                      <li className={Style["FilterNumberList-item"]}>
                        <dl className={Style["FilterNumberList-inner"]}>
                          <dt className={Style["FilterNumberListTitle"]}>
                            <span className={Style["FilterNumberListTitle-title"]}>중식</span>
                            <span className={Style["FilterNumberListTitle-price"]}>10,000원</span>
                            <span className={Style["FilterNumberListTitle-text"]}>구성 : 돼지생갈비, 생삼겹살, 닭봉, 대하, 소시지, 구이용야채, 쌈야채, 각종소스, 라면, 햇반</span>
                          </dt>
                          <dd className={Style["FilterNumberListCont"]}>
                            <div className={Style["BasicCount"]}>
                              <button type="button" className={cx("BasicCount-button", "minus", "is-disabled")}><span className="ab-text">minus</span></button>
                              <span className={Style["BasicCount-text"]}>0</span>
                              <button type="button" className={cx("BasicCount-button", "plus")}><span className="ab-text">plus</span></button>
                            </div>
                          </dd>
                        </dl>
                      </li>
                      <li className={Style["FilterNumberList-item"]}>
                        <dl className={Style["FilterNumberList-inner"]}>
                          <dt className={Style["FilterNumberListTitle"]}>
                            <span className={Style["FilterNumberListTitle-title"]}>야식</span>
                            <span className={Style["FilterNumberListTitle-price"]}>10,000원</span>
                            <span className={Style["FilterNumberListTitle-text"]}>구성 : 돼지생갈비, 생삼겹살, 닭봉, 대하, 소시지, 구이용야채, 쌈야채, 각종소스, 라면, 햇반</span>
                          </dt>
                          <dd className={Style["FilterNumberListCont"]}>
                            <div className={Style["BasicCount"]}>
                              <button type="button" className={cx("BasicCount-button", "minus", "is-disabled")}><span className="ab-text">minus</span></button>
                              <span className="BasicCount-text">0</span>
                              <button type="button" className={cx("BasicCount-button", "plus")}><span className="ab-text">plus</span></button>
                            </div>
                          </dd>
                        </dl>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- .OptionFilter --> */}
                  {/* <!-- OptionPriceSection --> */}
                  <div className={Style["OptionPriceSection"]}>
                    <ul className={Style["OptionPriceSection-list"]}>
                      <li className={Style["OptionPriceSection-item"]}>
                        <dl className={Style["OptionPriceSection-inner"]}>
                          <dt className={Style["OptionPriceSection-title"]}>옵션 추가</dt>
                          <dd className={Style["OptionPriceSection-price"]}>140,000원</dd>
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
                              <dd className={Style["OptionPriceSum-price"]}>70,000원</dd>
                            </dl>
                          </li>
                          <li className={Style["OptionPriceSum-item"]}>
                            <dl className="OptionPriceSum-inner">
                              <dt className={Style["OptionPriceSum-title"]}>추가옵션</dt>
                              <dd className={Style["OptionPriceSum-price"]}>70,000원</dd>
                            </dl>
                          </li>
                          <li className={Style["OptionPriceSum-item"]}>
                            <dl className="OptionPriceSum-inner">
                              <dt className={Style["OptionPriceSum-title"]}>인원추가</dt>
                              <dd className={Style["OptionPriceSum-price"]}>10,000원</dd>
                            </dl>
                          </li>
                        </ul>
                      </div>
                      <div className={Style["OptionTotalPrice"]}>
                        <dl className={Style["OptionTotalPrice-inner"]}>
                          <dt className={Style["OptionTotalPrice-title"]}>총 금액</dt>
                          <dd className={Style["OptionTotalPrice-text"]}>140,000원</dd>
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
              <button type="button" className={Style["FilterPopFooter-button"]}>140,000원 결제하기</button>
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