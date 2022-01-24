import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as roomFilterActions from "../../../redux/store/modules/roomFilter";
import Style from "../../../styles/FilterButton.module.css";

const RoomFilter = () => {
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [radioInputs, setRadioInputs] = useState("");
  const dispatch = useDispatch();

  const handleClickRadioButton = (radioBtnName) => {
    setRadioInputs(radioBtnName);
  };

  const changeCheckHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };

  const onClearClick = () => {
    setCheckedInputs([]);
    setRadioInputs("popularity");
  };

  const sendConfirm = () => {
    console.log(checkedInputs);
    dispatch(roomFilterActions.sendConfirm(checkedInputs));
  };

  return (
    <div>
      <div className={Style.FilterPopBody}>
        <div className={Style.FilterPopItem}>
          <div className={Style.FilterPopItem_title}>숙박 유형</div>
          <ul className={Style.FilterPopList}>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck1"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>대실</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck1"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>숙박</span>
              </label>
            </li>
          </ul>
        </div>

        <div className={Style.FilterPopItem}>
          <div className={Style.FilterPopItem_title}>숙박 유형</div>
          <ul className={Style.FilterPopList}>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>호텔</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>모텔</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>펜션</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>게스트하우스</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>리조트</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>캠핑장</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>호텔</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>모텔</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>펜션</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>게스트하우스</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>리조트</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  type="checkbox"
                  name="FilterCheck2"
                  className={Style.FilterCheck_input}
                />
                <span className={Style.FilterCheck_text}>캠핑장</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomFilter;
