import React, { useState } from "react";
import RoomFilter from "./RoomFilter";
import Modal from "react-modal";
import Style from "../../../styles/Component.module.css";
import '../../../public/js/swiper-4.5.0.min.js';
import '../../../public/js/jquery.min.js';
import '../../../public/js/common.js';

const RoomFilterModal = ({ isOpen, onRequestClose, callback }) => {
  const [clear, setClear] = useState(false);

  return (
    <div>
      <Modal
        className={Style["Modal"]}
        overlayClassName={Style["Overlay"]}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
        closeTimeoutMS={200}
      >
        {/* <!-- BirthdayPop --> */}
        <div id="BirthdayPop" className={Style["BirthdayPop"]}>
          <div className={Style["BirthdayPopDim"]}></div>
          <div className={Style["BirthdayPopSection"]}>
            <div className={Style["site-container"]}>
              <div className={Style["BirthdayPopHeader"]}>
                <div className={Style["BirthdayPopHeader-title"]}>생년월일</div>
                <button type="button" className={Style["BirthdayPopHeader-close"]} onClick={() => onRequestClose(false)}><span className={"ab-text"}>close</span></button>
              </div>
              <div className={Style["BirthdayPopBody"]}>
                <div className={Style["BirthdaySelectList"]}>
                  <div className={Style["BirthdaySelectList-inner"]}>
                    {/* <!-- 년 --> */}
                    <div className={Style["BirthdaySelectList-item"]}>
                      <div className={Style["BirthdaySlide"]}>
                        <div className={cx("swiper-container", "BirthdaySlide-container")}>
                          <div className={cx("swiper-wrapper", "BirthdaySlide-wrapper")}>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>1990</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>1991</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>1992</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>1993</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>1994</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>1995</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>1996</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- .년 --> */}
                    {/* <!-- 월 --> */}
                    <div className={Style["BirthdaySelectList-item"]}>
                      <div className={Style["BirthdaySlide"]}>
                        <div className={cx("swiper-container", "BirthdaySlide-container")}>
                          <div className={cx("swiper-wrapper", "BirthdaySlide-wrapper")}>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>1</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>2</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>3</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>4</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>5</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>6</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>7</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>8</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>9</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>10</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>11</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>12</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- .월 --> */}
                    {/* <!-- 일 --> */}
                    <div className={Style["BirthdaySelectList-item"]}>
                      <div className={Style["BirthdaySlide"]}>
                        <div className={cx("swiper-container", "BirthdaySlide-container")}>
                          <div className={cx("swiper-wrapper", "BirthdaySlide-wrapper")}>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>01</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>02</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>03</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>04</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>05</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>06</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>07</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>08</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>09</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>10</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>11</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>12</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>13</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>14</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>15</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>16</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>17</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>18</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>19</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>20</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>21</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>22</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>23</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>24</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>25</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>26</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>27</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>28</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>29</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>30</div>
                            </div>
                            <div className={cx("BirthdaySlide-slide", "swiper-slide")}>
                              <div className={Style["BirthdaySlideText"]}>31</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- .일 --> */}
                  </div>
                </div>
              </div>
              <div className={Style["BirthdayPopFooter"]}>
                <button type="button" className={Style["BirthdayPopFooter-button"]}>입력하기</button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- .BirthdayPop --> */}
      </Modal>
    </div>
  );
};

export default RoomFilterModal;
