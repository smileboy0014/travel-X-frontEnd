import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Style from "../../../styles/Component.module.css";
import * as reviewSearchType from "../../../redux/store/modules/reviewSearchType";
import { min } from "moment";

const ReviewOrderby = ({ onRequestClose }) => {
  const [searchTypeValue, setSearchTypeValue] = useState("DATE");
  const dispatch = useDispatch();

  const getSearchTypeValue = useSelector(({ reviewSearchType }) => reviewSearchType.value);

  const handleSaveClick = (e) => {
    console.log(" e.target.value: " + e.target.value);

    dispatch(reviewSearchType.setReviewSearchType(searchTypeValue));
    onRequestClose(false);
  };

  const onChangeValue = (e) => {
    setSearchTypeValue(e.target.value);
  };

  useEffect(() => {
    // debugger;
    if (getSearchTypeValue === null || getSearchTypeValue === '') {
      setSearchTypeValue("DATE");
    } else {
      setSearchTypeValue(getSearchTypeValue);
    }
  }, []);

  useEffect(() => {
    setSearchTypeValue(
      (getSearchTypeValue === null || getSearchTypeValue === '')
        ? "DATE"
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
                value="DATE"
                checked={searchTypeValue === "DATE"}
                onChange={onChangeValue}
              />
              <span className={Style["FilterRadio-text"]}>최신순</span>
            </label>
          </li>

          <li className={Style["FilterPopList-item"]}>
            <label className={Style["FilterRadio"]}>
              <input
                className={Style["FilterRadio-input"]}
                type="radio"
                name="filter"
                value="DESC"
                checked={searchTypeValue === "DESC"}
                onChange={onChangeValue}
              />
              <span className={Style["FilterRadio-text"]}>평점높은순</span>
            </label>
          </li>
          <li className={Style["FilterPopList-item"]}>
            <label className={Style["FilterRadio"]}>
              <input
                className={Style["FilterRadio-input"]}
                type="radio"
                name="filter"
                value="ASC"
                checked={searchTypeValue === "ASC"}
                onChange={onChangeValue}
              />
              <span className={Style["FilterRadio-text"]}>평점낮은순</span>
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

export default ReviewOrderby;
