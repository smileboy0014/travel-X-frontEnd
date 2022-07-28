import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Style from "../../../styles/Component.module.css";
import SignUpBirthdayCarousel from "../../Card/Carousel/SignUpBirthdayCarousel";

const BirthdayModal = ({ isOpen, onRequestClose, callback, values }) => {
  const [birthdayIndex, setBirthdayIndex] = useState({
    year: 52,
    month: 0,
    day: 0
  });

  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [dayList, setDayList] = useState([]);

  const lastday = () => {
    if (dayList.length == 0) return;

    let year = yearList[birthdayIndex.year];
    let month = monthList[birthdayIndex.month];
    let day = new Date(new Date(year, month, 1) - 86400000).getDate();
    let tmpDayList = [...dayList];
    let dayindex_len = tmpDayList.length;

    if (day > dayindex_len) {
      for (let i = (dayindex_len + 1); i <= day; i++) {
        tmpDayList.push(i);
      }
    } else if (day < dayindex_len) {
      for (let i = dayindex_len; i > day; i--) {
        tmpDayList.pop();
      }
    }

    setDayList([...tmpDayList]);


  };

  const correctValue = (birthday) => {

    let correctObj = {
      year: birthday.year - 1940, month: birthday.month - 1, day: birthday.day - 1
    };
    return correctObj;
  }

  const handleConfirm = () => {
    callback({
      year: yearList[birthdayIndex.year],
      month: monthList[birthdayIndex.month],
      day: dayList[birthdayIndex.day],
    });

    onRequestClose(false);
  }

  useEffect(() => {

    const START_YEAR = 1940;
    const END_YEAR = (new Date()).getFullYear() - 7;
    const yearList = [];
    const monthList = [];
    const dayList = [];
    for (let i = START_YEAR; i < END_YEAR; i++) {
      yearList.push(i);
    }
    for (let i = 1; i < 13; i++) {
      monthList.push(i);
    }
    for (let i = 1; i < 32; i++) {
      dayList.push(i);
    }
    setYearList([...yearList]);
    setMonthList([...monthList]);
    setDayList([...dayList]);

  }, []);

  useEffect(() => {
    if (values.year !== '') {
      // debugger;
      const birthdayCorrectData = correctValue(values);
      setBirthdayIndex(birthdayCorrectData);
    }
    console.log(birthdayIndex);
  }, [values])

  useEffect(() => {
    lastday();
  }, [birthdayIndex.year, birthdayIndex.month]);

  return (
    <Modal
      className={Style["Modal"]}
      overlayClassName={Style["Overlay"]}
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => onRequestClose(false)}
      closeTimeoutMS={200}
    >
      {/* <!-- BirthdayPop --> */}
      <div className="site-container">
        <div className={Style["BirthdayPopHeader"]}>
          <div className={Style["BirthdayPopHeader-title"]}>생년월일</div>
          <button type="button" className={Style["BirthdayPopHeader-close"]} onClick={() => onRequestClose(false)}><span className={"ab-text"}>close</span></button>
        </div>
        <div className={Style["BirthdayPopBody"]}>
          <div className={Style["BirthdaySelectList"]}>
            <div className={Style["BirthdaySelectList-inner"]}>
              {/* <!-- 년 --> */}
              <div className={Style["BirthdaySelectList-item"]}>
                <SignUpBirthdayCarousel
                  items={yearList}
                  setValue={(selectedYear) => setBirthdayIndex({ ...birthdayIndex, year: selectedYear })}
                  indexState={birthdayIndex.year}
                />
              </div>
              {/* <!-- .년 --> */}
              {/* <!-- 월 --> */}
              <div className={Style["BirthdaySelectList-item"]}>
                <SignUpBirthdayCarousel
                  items={monthList}
                  setValue={(selectedMonth) => setBirthdayIndex({ ...birthdayIndex, month: selectedMonth })}
                  indexState={birthdayIndex.month}
                />
              </div>
              {/* <!-- .월 --> */}
              {/* <!-- 일 --> */}
              <div className={Style["BirthdaySelectList-item"]}>
                <SignUpBirthdayCarousel
                  items={dayList}
                  setValue={(selectedDay) => setBirthdayIndex({ ...birthdayIndex, day: selectedDay })}
                  indexState={birthdayIndex.day}
                />
              </div>
              {/* <!-- .일 --> */}
            </div>
          </div>
        </div>
        <div className={Style["BirthdayPopFooter"]}>
          <button type="button" className={Style["BirthdayPopFooter-button"]} onClick={handleConfirm}>입력하기</button>
        </div>
      </div>
      {/* <!-- .BirthdayPop --> */}
    </Modal>
  );
};

export default BirthdayModal;
