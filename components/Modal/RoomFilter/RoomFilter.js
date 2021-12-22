import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as roomFilterActions from "../../../store/modules/roomFilter";

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
      <div>
        숙박 유형
        <div>
          <label>{"대실"}</label>
          <input
            // className={styles.checkbox}
            type="checkbox"
            id="hDay"
            name="hDay"
            onChange={(e) => {
              changeCheckHandler(e.currentTarget.checked, "hDay");
            }}
            checked={checkedInputs.includes("hDay") ? true : false}
          />
          <label>{"숙박"}</label>
          <input
            // className={styles.checkbox}
            type="checkbox"
            id="fDay"
            name="fDay"
            onChange={(e) => {
              changeCheckHandler(e.currentTarget.checked, "fDay");
            }}
            checked={checkedInputs.includes("fDay") ? true : false}
          />
        </div>
      </div>
      <p></p>
      <div>
        숙소 타입
        <div>
          <label>{"호텔"}</label>
          <input
            // className={styles.checkbox}
            type="checkbox"
            id="hotel"
            name="hotel"
            onChange={(e) => {
              changeCheckHandler(e.currentTarget.checked, "hotel");
            }}
            checked={checkedInputs.includes("hotel") ? true : false}
          />

          <label>{"모델"}</label>
          <input
            // className={styles.checkbox}
            type="checkbox"
            id="motel"
            name="motel"
            onChange={(e) => {
              changeCheckHandler(e.currentTarget.checked, "motel");
            }}
            checked={checkedInputs.includes("motel") ? true : false}
          />

          <label>{"펜션"}</label>
          <input
            // className={styles.checkbox}
            type="checkbox"
            id="pension"
            name="pension"
            onChange={(e) => {
              changeCheckHandler(e.currentTarget.checked, "pension");
            }}
            checked={checkedInputs.includes("pension") ? true : false}
          />
        </div>
        <div>
          <label>{"게스트하우스"}</label>
          <input
            // className={styles.checkbox}
            type="checkbox"
            id="guestHose"
            name="guestHose"
            onChange={(e) => {
              changeCheckHandler(e.currentTarget.checked, "guestHose");
            }}
            checked={checkedInputs.includes("guestHose") ? true : false}
          />

          <label>{"리조트"}</label>
          <input
            // className={styles.checkbox}
            type="checkbox"
            id="resort"
            name="resort"
            onChange={(e) => {
              changeCheckHandler(e.currentTarget.checked, "resort");
            }}
            checked={checkedInputs.includes("resort") ? true : false}
          />

          <label>{"캠핑장"}</label>
          <input
            // className={styles.checkbox}
            type="checkbox"
            id="camping"
            name="camping"
            onChange={(e) => {
              changeCheckHandler(e.currentTarget.checked, "camping");
            }}
            checked={checkedInputs.includes("camping") ? true : false}
          />
        </div>
      </div>
      <p></p>

      <div>
        <input
          id="popularity"
          value="popularity"
          name="popularity"
          type="radio"
          checked={radioInputs === "popularity"}
          onChange={() => handleClickRadioButton("popularity")}
        />
        인기순
        <input
          id="recent"
          value="recent"
          name="recent"
          type="radio"
          checked={radioInputs === "recent"}
          onChange={() => handleClickRadioButton("recent")}
        />
        최신순
        <input
          id="distance"
          value="distance"
          name="distance"
          type="radio"
          checked={radioInputs === "distance"}
          onChange={() => handleClickRadioButton("distance")}
        />
        거리순
        <input
          id="rating"
          value="rating"
          name="rating"
          type="radio"
          checked={radioInputs === "rating"}
          onChange={() => handleClickRadioButton("rating")}
        />
        평점순
        <input
          id="low_price"
          value="low_price"
          name="low_price"
          type="radio"
          checked={radioInputs === "low_price"}
          onChange={() => handleClickRadioButton("low_price")}
        />
        낮은 가격순
        <input
          id="high_price"
          value="high_price"
          name="high_price"
          type="radio"
          checked={radioInputs === "high_price"}
          onChange={() => handleClickRadioButton("high_price")}
        />
        높은 가격순
      </div>
      <p></p>
      <button onClick={onClearClick}>초기화</button>
      <button onClick={sendConfirm}>적용</button>
    </div>
  );
};

export default RoomFilter;
