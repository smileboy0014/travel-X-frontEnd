import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import Style from "../../../styles/Component.module.css";
import Calendar from "./ReactCalendar/Calendar";
import { useDispatch, useSelector } from "react-redux";
import * as dateActions from "../../../redux/store/modules/date";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const CalendarModal = ({ isOpen, onRequestClose }) => {
  const { searchDate } = useSelector((state) => state.date);
  const now = new Date();
  const week = new Array("일", "월", "화", "수", "목", "금", "토");
  const defaultDateList = new Array(
    new Date(now.getFullYear(), now.getMonth(), 1),
    new Date(now.getFullYear(), now.getMonth() + 1, 1),
    new Date(now.getFullYear(), now.getMonth() + 2, 1),
    new Date(now.getFullYear(), now.getMonth() + 3, 1)
  );
  const dispatch = useDispatch();

  const [value, onChange] = useState([
    new Date(searchDate.start),
    new Date(searchDate.end),
  ]);

  return (
    <div>
      <Modal
        className={Style["CalenderPop"]}
        overlayClassName={Style["Overlay"]}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => onRequestClose(false)}
        closeTimeoutMS={200}
      >
        <div className={Style["CalenderPopHeader"]}>
          <div className="site-container">
            <div className={Style["CalenderPopHeaderTitle"]}>
              <div className={Style["CalenderPopHeaderTitle-title"]}>
                날짜 선택
              </div>
              <button
                type="button"
                className={Style["CalenderPopHeaderTitle-close"]}
                onClick={() => onRequestClose(false)}
              >
                <span className="ab-text">Close</span>
              </button>
            </div>
            <div className={Style["CalenderHeader"]}>
              <div className={Style["CalenderHeader-day"]}>일</div>
              <div className={Style["CalenderHeader-day"]}>월</div>
              <div className={Style["CalenderHeader-day"]}>화</div>
              <div className={Style["CalenderHeader-day"]}>수</div>
              <div className={Style["CalenderHeader-day"]}>목</div>
              <div className={Style["CalenderHeader-day"]}>금</div>
              <div className={Style["CalenderHeader-day"]}>토</div>
            </div>
          </div>
        </div>
        <div className={Style["CalenderPopBody"]}>
          <div className="site-container">
            <div className={Style["CheckCalender"]}>
              <Calendar
                selectRange
                onChange={onChange}
                value={value}
                calendarType="US"
                showNeighboringMonth={false}
                showStartDateList={defaultDateList}
              />
            </div>
          </div>
        </div>
        <div className={Style["CalenderPopFooter"]}>
          <div className="site-container">
            <div className={Style["CalenderPopFooterCheck"]}>
              <dl className={cx('CalenderPopFooterCheck-item', 'Start')}>
                <dt
                  className={
                    value[0]
                      ? Style["CalenderPopFooterCheck-title"]
                      : Style["CalenderPopFooter-title"]
                  }
                >
                  체크인
                </dt>
                {value[0] && (
                  <dd className={Style["CalenderPopFooterCheck-day"]}>
                    <span className={Style["CalenderPopFooterCheck-text"]}>
                      {value[0].getMonth() + 1}.{value[0].getDate()}
                    </span>
                    ({week[value[0].getDay()]})
                  </dd>
                )}
              </dl>
              <dl className={cx('CalenderPopFooterCheck-item', 'End')}>
                <dt
                  className={
                    value[1]
                      ? Style["CalenderPopFooterCheck-title"]
                      : Style["CalenderPopFooter-title"]
                  }
                >
                  체크아웃
                </dt>
                {value[1] && (
                  <dd className={Style["CalenderPopFooterCheck-day"]}>
                    <span className={Style["CalenderPopFooterCheck-text"]}>
                      {value[1].getMonth() + 1}.{value[1].getDate()}
                    </span>
                    ({week[value[1].getDay()]})
                  </dd>
                )}
              </dl>
            </div>
            <div className={Style["CalenderPopFooterBtn"]}>
              {value[0] ? (
                <button
                  type="button"
                  className={Style["CalenderPopFooterBtn-button"]}
                  onClick={() => {
                    dispatch(
                      dateActions.setSearchDate({
                        start: value[0].toJSON(),
                        end: value[1].toJSON(),
                      })
                    );
                    dispatch(
                      dateActions.setDetailDate({
                        start: value[0].toJSON(),
                        end: value[1].toJSON(),
                      })
                    );
                    onRequestClose(false);
                  }}
                >
                  {Math.ceil(
                    (value[1].getTime() - value[0].getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                  박 선택 완료
                </button>
              ) : (
                <div className={Style["CalenderPopFooterinfo"]}>
                  날짜를 선택해 주세요
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarModal;
