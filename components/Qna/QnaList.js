import { React, useEffect, useState } from 'react';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const QnaList = ({ data, handleClick, setPage }) => {
  const handleApplyClick = () => {
    setPage('apply');
  };

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

    return `${year}.${month}.${day}`;
  }

  useEffect(() => {

  }, []);

  return (
    <>
      <div className={Style["ContactList"]}>
        {data.length > 0 ? (
          <ul className={Style["ContactList-list"]}>
            {data.map((item, index) => {
              return (
                <li className={item.isActive ? cx("ContactList-item", "is-Active") : Style["ContactList-item"]} key={index}>
                  <div className={Style["ContactListItem"]}>
                    <dl className={Style["ContactListItem-inner"]}>
                      <dt className={Style["ContactListItemTitle"]}>
                        <a href="#" className={Style["ContactListItemTitle-link"]} onClick={(e) => handleClick(e, item, index)}>
                          <div className={item.hasReply ? cx("ContactListItemTitle-state", "is-End") : cx("ContactListItemTitle-state", "is-Waiting")}>
                            {item.hasReply ? "답변완료" : "답변대기"}
                          </div>
                          <div className={Style["ContactListItemTitle-title"]}>{item.title}</div>
                          <div className={Style["ContactListItemTitle-date"]}>작성일 {FormattingDate(new Date(item.date))}</div>
                        </a>
                      </dt>
                      <dd className={Style["ContactListItemCont"]}> 
                        {item.contents}
                        {item.hasReply ? (
                          <div className={Style["ContactListItemAnswer"]}>
                            <div className={Style["ContactListItemAnswer-title"]}>야어때 상담원</div>
                            <div className={Style["ContactListItemAnswer-text"]}>{item.reply}</div>
                          </div>
                        ) : null}
                      </dd>
                    </dl>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className={Style["TotalSearch-noTag"]}>1:1 문의 내역이 없습니다.</div>
        )}
      </div>
      <div className={Style["BttonFixButton"]}>
        <div className={"site-container"}>
          <button type="button" className={Style["BttonFixButton-button"]} onClick={handleApplyClick}>1:1 문의하기</button>
        </div>
      </div>
    </>
  )
}

export default QnaList;