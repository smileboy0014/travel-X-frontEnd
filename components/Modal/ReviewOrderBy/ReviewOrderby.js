import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Style from "../../../styles/Component.module.css";
import * as searchType from "../../../redux/store/modules/searchType";

const ReviewOrderby = ({ onRequestClose }) => {
  const [searchTypeValue, setSearchTypeValue] = useState("SCORE_DESC");
  const dispatch = useDispatch();

  const getSearchTypeValue = useSelector(({ searchType }) => searchType.value);

  const handleSaveClick = (e) => {
    console.log(" e.target.value: " + e.target.value);

    dispatch(searchType.setSearchType({ searchTypeValue }));
    onRequestClose(false);
  };

  const onChangeValue = (e) => {
    setSearchTypeValue(e.target.value);
  };

  useEffect(() => {
    setSearchTypeValue(
      getSearchTypeValue.searchTypeValue === null
        ? "LATEST"
        : getSearchTypeValue.searchTypeValue
    );
  }, [getSearchTypeValue]);

  useEffect(() =>{
    setSearchTypeValue("LATEST");
  }, [])

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
                value="LATEST"
                checked={searchTypeValue === "LATEST"}
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
                value="SCORE_DESC"
                checked={searchTypeValue === "SCORE_DESC"}
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
                value="SCORE_ASC"
                checked={searchTypeValue === "SCORE_ASC"}
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
