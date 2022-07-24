import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Style from "../../../styles/Component.module.css";
import * as searchType from "../../../redux/store/modules/searchType";

const RoomOrderby = ({ onRequestClose, callback }) => {
  const [searchTypeValue, setSearchTypeValue] = useState("RANKING");
  const dispatch = useDispatch();

  const getSearchTypeValue = useSelector(({ searchType }) => searchType.value);

  const handleSaveClick = (e) => {
    console.log(" e.target.value: " + e.target.value);
    callback();
    dispatch(searchType.setSearchType(searchTypeValue ));
    onRequestClose(false);
  };

  const onChangeValue = (e) => {
    setSearchTypeValue(e.target.value);
  };

  useEffect(() => {
    // debugger;
    setSearchTypeValue(
      getSearchTypeValue === null
        ? "RANKING"
        : getSearchTypeValue
    );
  }, [getSearchTypeValue]);

  return (
    <>
      <div className={Style["FilterPopBody"]}>
        <ul className={Style["FilterPopList"]}>
          <li className={Style["FilterPopList-item"]}>
            <label className={Style["FilterRadio"]}>
              <input
                className={Style["FilterRadio-input"]}
                type="radio"
                name="filter"
                value="RANKING"
                checked={searchTypeValue == "RANKING"}
                onChange={onChangeValue}
                
              />
              <span className={Style["FilterRadio-text"]}>인기순</span>
            </label>
          </li>
          {/* <li className={Style.FilterPopList_item}>
            <label className={Style.FilterRadio}>
              <input
                className={Style.FilterRadio_input}
                type="radio"
                name="filter"
                value="RECENT"
                checked={searchTypeValue === "GEO_DISTANCE"}
                onChange={onChangeValue}
              />
              <span className={Style.FilterRadio_text}>최신순</span>
            </label>
          </li> */}
          <li className={Style["FilterPopList-item"]}>
            <label className={Style["FilterRadio"]}>
              <input
                className={Style["FilterRadio-input"]}
                type="radio"
                name="filter"
                value="GEO_DISTANCE"
                checked={searchTypeValue === "GEO_DISTANCE"}
                onChange={onChangeValue}
              />
              <span className={Style["FilterRadio-text"]}>거리순</span>
            </label>
          </li>
          {/* 평점순 추가 예정 */}
          <li className={Style["FilterPopList-item"]}>
            <label className={Style["FilterRadio"]}>
              <input
                className={Style["FilterRadio-input"]}
                type="radio"
                name="filter"
                value="PRICE_ASC"
                checked={searchTypeValue === "PRICE_ASC"}
                onChange={onChangeValue}
              />
              <span className={Style["FilterRadio-text"]}>낮은 가격순</span>
            </label>
          </li>
          <li className={Style["FilterPopList-item"]}>
            <label className={Style["FilterRadio"]}>
              <input
                className={Style["FilterRadio-input"]}
                type="radio"
                name="filter"
                value="PRICE_DESC"
                checked={searchTypeValue === "PRICE_DESC"}
                onChange={onChangeValue}
              />
              <span className={Style["FilterRadio-text"]}>높은 가격순</span>
            </label>
          </li>
        </ul>
      </div>

      <div className={Style["FilterPopFooter"]}>
        <button
          className={Style["FilterPopFooter-button"]}
          onClick={handleSaveClick}
        >
          선택하기
        </button>
      </div>
    </>
  );
};

export default RoomOrderby;
