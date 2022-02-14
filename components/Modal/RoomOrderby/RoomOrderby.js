import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Style from "../../../styles/OrderByButton.module.css";

const RoomOrderby = ({ onRequestClear, onSetClear }) => {
  return (
    <div>
      <div className={Style.FilterPopBody}>
        <ul className={Style.FilterPopList}>
          <li className={Style.FilterPopList_item}>
            <label className={Style.FilterRadio}>
              <input
                className={Style.FilterCheck_input}
                type="radio"
                name="FilterRadio"
              />
              <span className={Style.FilterRadio_text}>인기순</span>
            </label>
          </li>
          <li className={Style.FilterPopList_item}>
            <label className={Style.FilterRadio}>
              <input
                className={Style.FilterCheck_input}
                type="radio"
                name="FilterRadio"
              />
              <span className={Style.FilterRadio_text}>최신순</span>
            </label>
          </li>
          <li className={Style.FilterPopList_item}>
            <label className={Style.FilterRadio}>
              <input
                className={Style.FilterCheck_input}
                type="radio"
                name="FilterRadio"
              />
              <span className={Style.FilterRadio_text}>거리순</span>
            </label>
          </li>
          <li className={Style.FilterPopList_item}>
            <label className={Style.FilterRadio}>
              <input
                className={Style.FilterCheck_input}
                type="radio"
                name="FilterRadio"
              />
              <span className={Style.FilterRadio_text}>평점순</span>
            </label>
          </li>
          <li className={Style.FilterPopList_item}>
            <label className={Style.FilterRadio}>
              <input
                className={Style.FilterCheck_input}
                type="radio"
                name="FilterRadio"
              />
              <span className={Style.FilterRadio_text}>낮은 가격순</span>
            </label>
          </li>
          <li className={Style.FilterPopList_item}>
            <label className={Style.FilterRadio}>
              <input
                className={Style.FilterCheck_input}
                type="radio"
                name="FilterRadio"
              />
              <span className={Style.FilterRadio_text}>높은 가격순</span>
            </label>
          </li>
        </ul>
      </div>
      <div className={Style.FilterPopFooter}>
        <button className={Style.FilterPopFooter_button}>선택하기</button>
      </div>
    </div>
  );
};

export default RoomOrderby;
