import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as roomFilterActions from "../../../redux/store/modules/roomFilter";
import Style from "../../../styles/FilterButton.module.css";

const RoomFilter = ({ onRequestClear, onSetClear }) => {
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

  useEffect(() => {
    if (onRequestClear) {
      onClearClick();
    }
  }, [onRequestClear]);

  const onClearClick = () => {
    setCheckedInputs([]);
    if (onSetClear !== undefined) {
      onSetClear(false);
    }
  };

  const sendConfirm = () => {
    console.log(checkedInputs);
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
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="hDay"
                  name="hDay"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "hDay");
                  }}
                  checked={checkedInputs.includes("hDay") ? true : false}
                />
                <span className={Style.FilterCheck_text}>대실</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="fDay"
                  name="fDay"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "fDay");
                  }}
                  checked={checkedInputs.includes("fDay") ? true : false}
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
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="hotel"
                  name="hotel"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "hotel");
                  }}
                  checked={checkedInputs.includes("hotel") ? true : false}
                />
                <span className={Style.FilterCheck_text}>호텔</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="motel"
                  name="motel"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "motel");
                  }}
                  checked={checkedInputs.includes("motel") ? true : false}
                />
                <span className={Style.FilterCheck_text}>모텔</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="pension"
                  name="pension"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "pension");
                  }}
                  checked={checkedInputs.includes("pension") ? true : false}
                />
                <span className={Style.FilterCheck_text}>펜션</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="guestHose"
                  name="guestHose"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "guestHose");
                  }}
                  checked={checkedInputs.includes("guestHose") ? true : false}
                />
                <span className={Style.FilterCheck_text}>게스트하우스</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="resort"
                  name="resort"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "resort");
                  }}
                  checked={checkedInputs.includes("resort") ? true : false}
                />
                <span className={Style.FilterCheck_text}>리조트</span>
              </label>
            </li>
            <li className={Style.FilterPopList_item}>
              <label className={Style.FilterCheck}>
                <input
                  className={Style.FilterCheck_input}
                  type="checkbox"
                  id="camping"
                  name="camping"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "camping");
                  }}
                  checked={checkedInputs.includes("camping") ? true : false}
                />
                <span className={Style.FilterCheck_text}>캠핑장</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div className={Style.FilterPopFooter}>
        <button className={Style.FilterPopFooter_button} onClick={sendConfirm}>
          선택하기
        </button>
      </div>
    </div>
  );
};

export default RoomFilter;
