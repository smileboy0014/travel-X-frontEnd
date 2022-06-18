import { React, useEffect, useState } from 'react';
import Style from "../../styles/Component.module.css";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const QnaList = ({ data, handleClick, setPage }) => {
  const handleApplyClick = () => {
    setPage('apply');
  };

  useEffect(() => {

  }, []);

  return (
    <>
      <div className={Style["ContactList"]}>
        <ul className={Style["ContactList-list"]}>
          {data.map((item, index) => {
            return (
              <li className={item.isActive ? cx("ContactList-item", "is-Active") : Style["ContactList-item"]} key={index}>
                <div className={Style["ContactListItem"]}>
                  <dl className={Style["ContactListItem-inner"]}>
                    <dt className={Style["ContactListItemTitle"]}>
                      <a href="#" className={Style["ContactListItemTitle-link"]} onClick={(e) => handleClick(e, item, index)}>
                        <div className={item.isEnd ? cx("ContactListItemTitle-state", "is-End") : cx("ContactListItemTitle-state", "is-Waiting")}>
                          {item.isEnd ? "답변완료" : "답변대기"}
                        </div>
                        <div className={Style["ContactListItemTitle-title"]}>{item.title}</div>
                        <div className={Style["ContactListItemTitle-date"]}>작성일 {item.date}</div>
                      </a>
                    </dt>
                    <dd className={Style["ContactListItemCont"]}> 
                      {item.content}
                      {item.isEnd ? (
                        <div className={Style["ContactListItemAnswer"]}>
                          <div className={Style["ContactListItemAnswer-title"]}>야어때 상담원</div>
                          <div className={Style["ContactListItemAnswer-text"]}>{item.answer}</div>
                        </div>
                      ) : null}
                    </dd>
                  </dl>
                </div>
              </li>
            )
          })}
        </ul>
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